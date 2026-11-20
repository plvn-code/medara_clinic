/** Tenge with grouping: 120 000 ₸ (server- and client-safe). */
export const tg = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₸`;
