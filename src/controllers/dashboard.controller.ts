import type { Context } from 'hono';
import { Transaction, TransactionDetail, Product, ProductVarian } from '../database/models/index.js';
import { successResponse, errorResponse } from '../utils/response.util.js';
import { z } from 'zod';
import { Op, fn, col, literal } from 'sequelize';
import { sequelize } from '../database/index.js';
import type {
  KPICard,
  SalesTrendItem,
  TopProductItem,
  PaymentMethodItem,
  RecentTransactionItem,
  DashboardSummaryResponse,
  TimeRangeType,
  TrendPeriodType,
  TransactionStatusFilter
} from '../types/dashboard.types.js';

// ==================== VALIDATION SCHEMAS ====================

export const getDashboardQuerySchema = z.object({
  time_range: z.enum(['today', 'yesterday', '7days', '30days', 'custom']).optional().default('today'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  trend_period: z.enum(['hourly', 'daily']).optional().default('hourly'),
  status_filter: z.enum(['all', 'waiting_payment', 'canceled', 'completed']).optional().default('all'),
  top_products_limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
});

// ==================== HELPER FUNCTIONS ====================

function getDateRange(timeRange: TimeRangeType, startDate?: string, endDate?: string): { start: Date; end: Date; comparison_start: Date; comparison_end: Date } {
  const now = new Date();
  let start: Date, end: Date, comparison_start: Date, comparison_end: Date;

  switch (timeRange) {
    case 'today':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      comparison_start = new Date(start);
      comparison_start.setDate(comparison_start.getDate() - 1);
      comparison_end = new Date(end);
      comparison_end.setDate(comparison_end.getDate() - 1);
      break;

    case 'yesterday':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
      comparison_start = new Date(start);
      comparison_start.setDate(comparison_start.getDate() - 1);
      comparison_end = new Date(end);
      comparison_end.setDate(comparison_end.getDate() - 1);
      break;

    case '7days':
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      start = new Date(end);
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      comparison_end = new Date(start);
      comparison_end.setHours(23, 59, 59, 999);
      comparison_start = new Date(comparison_end);
      comparison_start.setDate(comparison_start.getDate() - 6);
      comparison_start.setHours(0, 0, 0, 0);
      break;

    case '30days':
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      start = new Date(end);
      start.setDate(start.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      comparison_end = new Date(start);
      comparison_end.setHours(23, 59, 59, 999);
      comparison_start = new Date(comparison_end);
      comparison_start.setDate(comparison_start.getDate() - 29);
      comparison_start.setHours(0, 0, 0, 0);
      break;

    case 'custom':
      if (!startDate || !endDate) {
        throw new Error('start_date and end_date are required for custom range');
      }
      start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      comparison_end = new Date(start);
      comparison_end.setHours(23, 59, 59, 999);
      comparison_start = new Date(comparison_end);
      comparison_start.setDate(comparison_start.getDate() - daysDiff);
      comparison_start.setHours(0, 0, 0, 0);
      break;

    default:
      throw new Error('Invalid time range');
  }

  return { start, end, comparison_start, comparison_end };
}

function calculatePercentageChange(current: number, previous: number): { percentage: number; isIncrease: boolean } {
  if (previous === 0) {
    return { percentage: current > 0 ? 100 : 0, isIncrease: current > 0 };
  }
  const change = ((current - previous) / previous) * 100;
  return {
    percentage: Math.abs(Math.round(change * 10) / 10),
    isIncrease: change >= 0
  };
}

function buildStatusWhereClause(statusFilter: TransactionStatusFilter) {
  if (statusFilter === 'all') return {};
  return { status: statusFilter };
}

// ==================== KPI CALCULATIONS ====================

async function calculateKPIs(
  start: Date,
  end: Date,
  comparison_start: Date,
  comparison_end: Date,
  statusFilter: TransactionStatusFilter
): Promise<{
  total_sales_today: KPICard;
  total_transactions_today: KPICard;
  average_transaction_value: KPICard;
}> {
  const statusClause = buildStatusWhereClause(statusFilter);

  // Current period data
  const currentData: any = await Transaction.findAll({
    where: {
      createdAt: { [Op.between]: [start, end] },
      ...statusClause
    },
    attributes: [
      [fn('COUNT', col('id')), 'transaction_count'],
      [fn('SUM', literal('(SELECT SUM(price * quantity) FROM transaction_details WHERE transaction_details.id_transaction = Transaction.id)')), 'total_sales']
    ],
    raw: true
  });

  // Comparison period data
  const comparisonData: any = await Transaction.findAll({
    where: {
      createdAt: { [Op.between]: [comparison_start, comparison_end] },
      ...statusClause
    },
    attributes: [
      [fn('COUNT', col('id')), 'transaction_count'],
      [fn('SUM', literal('(SELECT SUM(price * quantity) FROM transaction_details WHERE transaction_details.id_transaction = Transaction.id)')), 'total_sales']
    ],
    raw: true
  });

  const currentSales = parseFloat(currentData[0]?.total_sales || '0');
  const currentCount = parseInt(currentData[0]?.transaction_count || '0');
  const previousSales = parseFloat(comparisonData[0]?.total_sales || '0');
  const previousCount = parseInt(comparisonData[0]?.transaction_count || '0');

  const currentAvg = currentCount > 0 ? currentSales / currentCount : 0;
  const previousAvg = previousCount > 0 ? previousSales / previousCount : 0;

  const salesChange = calculatePercentageChange(currentSales, previousSales);
  const transactionsChange = calculatePercentageChange(currentCount, previousCount);
  const avgChange = calculatePercentageChange(currentAvg, previousAvg);

  return {
    total_sales_today: {
      value: Math.round(currentSales),
      label: 'Total Sales',
      percentageChange: salesChange.percentage,
      isIncrease: salesChange.isIncrease,
      comparisonPeriod: 'vs previous period'
    },
    total_transactions_today: {
      value: currentCount,
      label: 'Total Transactions',
      percentageChange: transactionsChange.percentage,
      isIncrease: transactionsChange.isIncrease,
      comparisonPeriod: 'vs previous period'
    },
    average_transaction_value: {
      value: Math.round(currentAvg),
      label: 'Average Transaction',
      percentageChange: avgChange.percentage,
      isIncrease: avgChange.isIncrease,
      comparisonPeriod: 'vs previous period'
    }
  };
}

// ==================== SALES TREND ====================

async function getSalesTrend(
  start: Date,
  end: Date,
  trendPeriod: TrendPeriodType,
  statusFilter: TransactionStatusFilter
): Promise<SalesTrendItem[]> {
  const statusClause = buildStatusWhereClause(statusFilter);

  let dateFormat: string;
  let groupByClause: any;

  if (trendPeriod === 'hourly') {
    // Format: YYYY-MM-DD HH:00
    dateFormat = '%Y-%m-%d %H:00';
    groupByClause = fn('DATE_FORMAT', col('created_at'), dateFormat);
  } else {
    // Format: YYYY-MM-DD
    dateFormat = '%Y-%m-%d';
    groupByClause = fn('DATE_FORMAT', col('created_at'), dateFormat);
  }

  const results = await Transaction.findAll({
    where: {
      createdAt: { [Op.between]: [start, end] },
      ...statusClause
    },
    attributes: [
      [groupByClause, 'time_period'],
      [fn('COUNT', col('Transaction.id')), 'transaction_count'],
      [fn('SUM', literal('(SELECT SUM(price * quantity) FROM transaction_details WHERE transaction_details.id_transaction = Transaction.id)')), 'total_sales']
    ],
    group: [groupByClause],
    order: [[groupByClause, 'ASC']],
    raw: true
  });

  return results.map((item: any) => ({
    time_period: item.time_period,
    total_sales: Math.round(parseFloat(item.total_sales || '0')),
    transaction_count: parseInt(item.transaction_count || '0')
  }));
}

// ==================== TOP PRODUCTS ====================

async function getTopProducts(
  start: Date,
  end: Date,
  limit: number,
  statusFilter: TransactionStatusFilter
): Promise<TopProductItem[]> {
  const statusClause = buildStatusWhereClause(statusFilter);

  const results = await TransactionDetail.findAll({
    attributes: [
      [fn('SUM', col('TransactionDetail.quantity')), 'quantity_sold'],
      [fn('SUM', literal('TransactionDetail.price * TransactionDetail.quantity')), 'total_revenue']
    ],
    include: [
      {
        association: TransactionDetail.associations.transaction,
        where: {
          created_at: { [Op.between]: [start, end] },
          ...statusClause
        },
        attributes: []
      },
      {
        association: TransactionDetail.associations.product,
        attributes: ['id', 'name'],
        required: false
      },
      {
        association: TransactionDetail.associations.productVarian,
        attributes: ['id', 'name', 'id_product'],
        required: false
      }
    ],
    group: [
      'TransactionDetail.id_product',
      'TransactionDetail.id_product_varian',
      'product.id',
      'productVarian.id',
    //   'productVarian.product.id'
    ],
    order: [[fn('SUM', col('TransactionDetail.quantity')), 'DESC']],
    limit,
    raw: false
  });

  return results.map((item: any) => {
    let productName = '';
    let productId = 0;

    if (item.product) {
      productName = item.product.name;
      productId = item.product.id;
    } else if (item.productVarian) {
      productName = `${item.productVarian.name}`;
      productId = item.productVarian.idProduct;
    }

    return {
      product_name: productName || 'Unknown Product',
      quantity_sold: parseInt(item.get('quantity_sold') as any || '0'),
      total_revenue: Math.round(parseFloat(item.get('total_revenue') as any || '0')),
      product_id: productId
    };
  });
}

// ==================== PAYMENT METHODS ====================

async function getPaymentMethods(
  start: Date,
  end: Date,
  statusFilter: TransactionStatusFilter
): Promise<PaymentMethodItem[]> {
  const statusClause = buildStatusWhereClause(statusFilter);

  const results = await Transaction.findAll({
    where: {
      createdAt: { [Op.between]: [start, end] },
      ...statusClause
    },
    attributes: [
      'paymentMethod',
      [fn('COUNT', col('id')), 'transaction_count'],
      [fn('SUM', literal('(SELECT SUM(price * quantity) FROM transaction_details WHERE transaction_details.id_transaction = Transaction.id)')), 'total_amount']
    ],
    group: ['paymentMethod'],
    raw: true
  });

  const totalAmount = results.reduce((sum, item: any) => sum + parseFloat(item.total_amount || '0'), 0);

  return results.map((item: any) => {
    const amount = parseFloat(item.total_amount || '0');
    return {
      method: item.paymentMethod === 'qris' ? 'QRIS' : 'Cash',
      total_amount: Math.round(amount),
      transaction_count: parseInt(item.transaction_count || '0'),
      percentage: totalAmount > 0 ? Math.round((amount / totalAmount) * 1000) / 10 : 0
    };
  });
}

// ==================== RECENT TRANSACTIONS ====================

async function getRecentTransactions(
  limit: number = 5,
  statusFilter: TransactionStatusFilter
): Promise<RecentTransactionItem[]> {
  const statusClause = buildStatusWhereClause(statusFilter);

  const transactions = await Transaction.findAll({
    where: statusClause,
    include: [
      {
        association: Transaction.associations.transactionDetails,
        attributes: ['price', 'quantity']
      }
    ],
    order: [['created_at', 'DESC']],
    limit,
  });

  return transactions.map(transaction => {
    const details = transaction.transactionDetails || [];
    const totalAmount = details.reduce((sum, detail) => sum + (detail.price * detail.quantity), 0);

    return {
      id: transaction.id,
      ref: transaction.ref,
      createdAt: transaction.createdAt.toISOString(),
      total_amount: Math.round(totalAmount),
      status: transaction.status,
      payment_method: transaction.paymentMethod,
      customer_name: transaction.customerName
    };
  });
}

// ==================== MAIN CONTROLLER ====================

export const getDashboardSummary = async (c: Context) => {
  try {
    const query = c.req.query();
    
    const timeRange = (query.time_range as TimeRangeType) || 'today';
    const trendPeriod = (query.trend_period as TrendPeriodType) || 'hourly';
    const statusFilter = (query.status_filter as TransactionStatusFilter) || 'all';
    const topProductsLimit = query.top_products_limit ? parseInt(query.top_products_limit) : 10;
    const startDate = query.start_date;
    const endDate = query.end_date;

    // Get date ranges
    const { start, end, comparison_start, comparison_end } = getDateRange(timeRange, startDate, endDate);

    // Execute all queries in parallel for better performance
    const [kpiCards, salesTrend, topProducts, paymentMethods, recentTransactions] = await Promise.all([
      calculateKPIs(start, end, comparison_start, comparison_end, statusFilter),
      getSalesTrend(start, end, trendPeriod, statusFilter),
      getTopProducts(start, end, topProductsLimit, statusFilter),
      getPaymentMethods(start, end, statusFilter),
      getRecentTransactions(5, statusFilter)
    ]);

    const response: DashboardSummaryResponse = {
      kpi_cards: kpiCards,
      sales_trend: salesTrend,
      top_products: topProducts,
      payment_methods: paymentMethods,
      recent_transactions: recentTransactions
    };

    return successResponse(c, response, 'Dashboard data retrieved successfully');
  } catch (error) {
    console.error('Dashboard error:', error);
    return errorResponse(c, 'Failed to retrieve dashboard data', error);
  }
};

// ==================== INDIVIDUAL ENDPOINTS (Optional) ====================

export const getKPIs = async (c: Context) => {
  try {
    const query = c.req.query();
    const timeRange = (query.time_range as TimeRangeType) || 'today';
    const statusFilter = (query.status_filter as TransactionStatusFilter) || 'all';
    const { start, end, comparison_start, comparison_end } = getDateRange(timeRange, query.start_date, query.end_date);

    const kpiCards = await calculateKPIs(start, end, comparison_start, comparison_end, statusFilter);

    return successResponse(c, kpiCards, 'KPI data retrieved successfully');
  } catch (error) {
    return errorResponse(c, 'Failed to retrieve KPI data', error);
  }
};

export const getSalesTrendData = async (c: Context) => {
  try {
    const query = c.req.query();
    const timeRange = (query.time_range as TimeRangeType) || 'today';
    const trendPeriod = (query.trend_period as TrendPeriodType) || 'hourly';
    const statusFilter = (query.status_filter as TransactionStatusFilter) || 'all';
    const { start, end } = getDateRange(timeRange, query.start_date, query.end_date);

    const salesTrend = await getSalesTrend(start, end, trendPeriod, statusFilter);

    return successResponse(c, salesTrend, 'Sales trend data retrieved successfully');
  } catch (error) {
    return errorResponse(c, 'Failed to retrieve sales trend data', error);
  }
};

export const getTopProductsData = async (c: Context) => {
  try {
    const query = c.req.query();
    const timeRange = (query.time_range as TimeRangeType) || 'today';
    const statusFilter = (query.status_filter as TransactionStatusFilter) || 'all';
    const limit = query.top_products_limit ? parseInt(query.top_products_limit) : 10;
    const { start, end } = getDateRange(timeRange, query.start_date, query.end_date);

    const topProducts = await getTopProducts(start, end, limit, statusFilter);

    return successResponse(c, topProducts, 'Top products data retrieved successfully');
  } catch (error) {
    return errorResponse(c, 'Failed to retrieve top products data', error);
  }
};

export const getPaymentMethodsData = async (c: Context) => {
  try {
    const query = c.req.query();
    const timeRange = (query.time_range as TimeRangeType) || 'today';
    const statusFilter = (query.status_filter as TransactionStatusFilter) || 'all';
    const { start, end } = getDateRange(timeRange, query.start_date, query.end_date);

    const paymentMethods = await getPaymentMethods(start, end, statusFilter);

    return successResponse(c, paymentMethods, 'Payment methods data retrieved successfully');
  } catch (error) {
    return errorResponse(c, 'Failed to retrieve payment methods data', error);
  }
};

export const getRecentTransactionsData = async (c: Context) => {
  try {
    const query = c.req.query();
    const statusFilter = (query.status_filter as TransactionStatusFilter) || 'all';
    const limit = query.limit ? parseInt(query.limit) : 5;

    const recentTransactions = await getRecentTransactions(limit, statusFilter);

    return successResponse(c, recentTransactions, 'Recent transactions data retrieved successfully');
  } catch (error) {
    return errorResponse(c, 'Failed to retrieve recent transactions data', error);
  }
};
