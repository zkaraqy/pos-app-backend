import { Hono } from 'hono';
import { sValidator } from '@hono/standard-validator';
import {
  getDashboardSummary,
  getKPIs,
  getSalesTrendData,
  getTopProductsData,
  getPaymentMethodsData,
  getRecentTransactionsData,
  getDashboardQuerySchema
} from '../controllers/dashboard.controller.js';

const dashboardRoutes = new Hono();

// Main endpoint - Dashboard Summary (Recommended)
// GET /api/dashboard/summary?time_range=today&trend_period=hourly&status_filter=all&top_products_limit=10
dashboardRoutes.get(
  '/summary',
  sValidator('query', getDashboardQuerySchema),
  getDashboardSummary
);

// Individual endpoints (optional - for more granular data fetching)
// GET /api/dashboard/kpis?time_range=today&status_filter=all
dashboardRoutes.get(
  '/kpis',
  getKPIs
);

// GET /api/dashboard/sales-trend?time_range=30days&trend_period=daily&status_filter=completed
dashboardRoutes.get(
  '/sales-trend',
  getSalesTrendData
);

// GET /api/dashboard/top-products?time_range=7days&top_products_limit=5&status_filter=completed
dashboardRoutes.get(
  '/top-products',
  getTopProductsData
);

// GET /api/dashboard/payment-methods?time_range=today&status_filter=all
dashboardRoutes.get(
  '/payment-methods',
  getPaymentMethodsData
);

// GET /api/dashboard/recent-transactions?status_filter=completed&limit=10
dashboardRoutes.get(
  '/recent-transactions',
  getRecentTransactionsData
);

export default dashboardRoutes;
