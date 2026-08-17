export const formatCurrencyValue = (value: number, currency: string) => {
  if (value < 0) {
    return "-" + currency + Math.abs(value);
  } else {
    return currency + value;
  }
};
