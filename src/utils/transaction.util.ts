export function generateTransactionRef(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TRX${timestamp}-${random}`;
}

export function calculateTransactionTotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
