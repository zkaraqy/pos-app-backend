// Dashboard Types & Interfaces

export interface KPICard {
  value: number;
  label: string;
  percentageChange: number;
  isIncrease: boolean;
  comparisonPeriod: string;
}

export interface SalesTrendItem {
  time_period: string;
  total_sales: number;
  transaction_count: number;
}

export interface TopProductItem {
  product_name: string;
  quantity_sold: number;
  total_revenue: number;
  product_id: number;
}

export interface PaymentMethodItem {
  method: string;
  total_amount: number;
  transaction_count: number;
  percentage: number;
}

export interface RecentTransactionItem {
  id: number;
  ref: string;
  createdAt: string;
  total_amount: number;
  status: string;
  payment_method: string;
  customer_name: string | null;
}

export interface DashboardSummaryResponse {
  kpi_cards: {
    total_sales_today: KPICard;
    total_transactions_today: KPICard;
    average_transaction_value: KPICard;
  };
  sales_trend: SalesTrendItem[];
  top_products: TopProductItem[];
  payment_methods: PaymentMethodItem[];
  recent_transactions: RecentTransactionItem[];
}

export type TimeRangeType = 'today' | 'yesterday' | '7days' | '30days' | 'custom';
export type TrendPeriodType = 'hourly' | 'daily';
export type TransactionStatusFilter = 'all' | 'waiting_payment' | 'canceled' | 'completed';
