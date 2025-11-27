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

dotenv.config();

initModels(sequelize);

const app = new Hono()

app.use(cors())
app.use(logger())

app.get('/', async (c) => {
  return c.text(`PoS App Backend is running.`)
})
app.route('/api/', authRoutes)
app.route('/api/products', productRoutes)
app.route('/api/transactions', transactionRoutes)


app.all('*', (c) => c.json({ message: 'Not Found' }, 404))

serve({
  fetch: app.fetch,
  port: Number(process.env.APP_PORT ?? 3000)
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
