export const calculateAverage = (arr: number[]) => {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  return sum / arr.length;
};

export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};
