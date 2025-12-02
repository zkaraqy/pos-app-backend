export function generateTransactionRef(): string {
  const timestamp = Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(new Date())
    .replace(/[^0-9]/g, '');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TRX${timestamp}-${random}`;
}

export function calculateTransactionTotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
