export const toCurrency = (value: number) => {
  return value.toLocaleString("en", {
    style: "currency",
    currency: "AED",
  });
};
