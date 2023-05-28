import { AuthUserDependency } from "@/app/server";
import { makeRouter, publicProcedure } from "@/shared/server";

export const helloWorldRouter = makeRouter({
  helloWorld: publicProcedure
    .query(async ({ ctx }) => {
      const user = ctx.scope.get(AuthUserDependency);

      if (user)
        return `Hello, ${user.email}!`;
      else
        return "Hello, world!";
    })
})