import { CURRENCIES, type CurrencyCode } from "@/constants/currencies";

export const getCurrencySymbol = (code: CurrencyCode) => {
  const currency = CURRENCIES.find(
    (currency) => currency.code === code,
  )?.symbol;

  return currency!;
};
