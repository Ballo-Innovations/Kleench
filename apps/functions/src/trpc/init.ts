import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware for auth can be added here
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  // Authentication logic here (e.g. checking firebase token)
  // For now, let's keep it simple
  return next({ ctx });
});
