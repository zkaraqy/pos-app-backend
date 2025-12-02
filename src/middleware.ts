import type { Context, Next } from 'hono';
import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt'
import { secretKey } from './config/secretKey.js';
import type { JWTPayload } from 'hono/utils/jwt/types';

export async function bearerTokenAuthMiddleware(c: Context, next: Next) {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ message: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await verify(token, secretKey);
        c.set('user', decoded);
        return await next();
    } catch (error) {
        return c.json({ message: 'Invalid token' }, 401);
    }
}

export const verifyAuthentication = createMiddleware<{
    Variables: {
        user: JWTPayload;
    }
}>(bearerTokenAuthMiddleware);