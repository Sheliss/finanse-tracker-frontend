export const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];
