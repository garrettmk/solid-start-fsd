// eslint-disable-next-line boundaries/element-types
import { AuthUserDependency } from "@/app/server";
import { delay } from "@/shared/lib";
import { Container } from "tidi";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

const t = initTRPC.context<{ container: Container }>().create({
  errorFormatter: ({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.container.get(AuthUserDependency))
    throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({ ctx });
});

const isDelayed = t.middleware(async ({ next, ctx }) => {
  await delay(2000);
  return next({ ctx });
});

export const makeRouter = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure.use(isDelayed);
export const protectedProcedure = t.procedure.use(isDelayed).use(isAuthed);
