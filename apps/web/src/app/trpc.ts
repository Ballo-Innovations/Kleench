import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../functions/src/trpc/routers";

export type { AppRouter };
export const trpc = createTRPCReact<AppRouter>();
