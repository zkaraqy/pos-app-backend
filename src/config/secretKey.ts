export const secretKey = process.env.NODE_ENV === 'production'
  ? process.env.PROD_SECRET_KEY!
  : process.env.SECRET_KEY!;