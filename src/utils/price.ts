export const beautifyPrice = (price?: number | null | undefined | string): string => {
  if (price !== undefined && price !== null) {
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return formattedPrice + " ₸";
  } else {
    return "N/A";
  }
};