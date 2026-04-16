import { z } from "zod";

export const TransactionTypeSchema = z.enum(["EARNING", "PAYMENT", "TRANSFER"]);

export const TransactionSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: TransactionTypeSchema,
  timestamp: z.string(),
  amount: z.number(),
  currency: z.string().default("ZMW"),
  expandable: z.boolean().default(false),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionType = z.infer<typeof TransactionTypeSchema>;
