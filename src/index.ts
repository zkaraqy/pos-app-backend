import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from "dotenv";
import { initModels } from './database/models/index.js';
import { sequelize } from './database/index.js';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import categoryRoutes from './routes/category.routes.js';
import variantRoutes from './routes/variant.routes.js';
import { serveStatic } from '@hono/node-server/serve-static';

dotenv.config();

initModels(sequelize);

const app = new Hono()

app.use(cors())
app.use(logger())

app.use('/public/*', serveStatic({
  root: './',
  rewriteRequestPath: (path) => path.replace(/^\/public/, '/public'),
}));
app.get('/', async (c) => {
  return c.text(`PoS App Backend is running.`)
})
app.route('/api/', authRoutes)
app.route('/api/products', productRoutes)
app.route('/api/transactions', transactionRoutes)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/categories', categoryRoutes)
app.route('/api/variants', variantRoutes)


app.all('*', (c) => c.json({ message: 'Not Found' }, 404))

serve({
  fetch: app.fetch,
  port: Number(process.env.APP_PORT ?? 3000)
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
