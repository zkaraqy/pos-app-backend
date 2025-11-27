import { sign } from 'hono/jwt'
import { secretKey } from '../config/secretKey.js';
import z from 'zod';
import type { Context } from 'hono';
import { User } from '../database/models/User.js';
import bcrypt from 'bcryptjs';
import type { JWTPayload } from 'hono/utils/jwt/types';

export const loginSchema = z.object({
  email: z.string().email({ error: 'Email is invalid' }),
  password: z.string().min(1, { error: 'Password is required' })
});

export const loginController = async (c: Context) => {
  const payload = await c.req.json();
  const { email, password } = payload;

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return c.json({ message: 'Invalid email or password' }, 401);
  }

  const jwtPayload: JWTPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
  };
  const token = await sign(jwtPayload, secretKey, 'HS256');
  const { password: _, ...userDataWithoutPassword } = user.dataValues;
  return c.json({ userData: userDataWithoutPassword, token });
}

