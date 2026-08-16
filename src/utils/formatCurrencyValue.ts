export const formatCurrencyValue = (value: number) => {
  if (value < 0) {
    return "-$" + Math.abs(value);
  } else {
    return "$" + value;
  }
};
