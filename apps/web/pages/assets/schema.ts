import { z } from "zod";

export const BalanceMapSchema = z.object({
  BTCB: z.string(),
  ETH: z.string(),
  XRP: z.string(),
  BUSD: z.string(),
  USDT: z.string(),
  USDC: z.string(),
});
