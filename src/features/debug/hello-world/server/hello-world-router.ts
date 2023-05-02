import { makeRouter, publicProcedure } from "@/shared/server";
import { z } from "zod";

export const helloWorldRouter = makeRouter({
  helloWorld: publicProcedure
    .query(async ({ ctx }) => {
      const { user } = ctx;

      if (user)
        return `Hello, ${user.email}!`;
      else
        return "Hello, world!";
    })
})