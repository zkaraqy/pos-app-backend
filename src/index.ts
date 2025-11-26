import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from "dotenv";
import { User } from './database/models/index.js';

dotenv.config();

const app = new Hono()

app.get('/', async (c) => {
  return c.text(`Hello Hono!.`)
})

app.get('/users', async (c) => {
  const rows = await User.findAll();
  return c.json(rows);
})

serve({
  fetch: app.fetch,
  port: Number(process.env.APP_PORT ?? 3000)
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
