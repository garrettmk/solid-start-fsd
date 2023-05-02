import { helloWorldRouter } from "@/features/debug/hello-world/server";
import { signUpRouter } from "@/features/account/sign-up/server";
import { makeRouter } from "@/shared/server";
import { mergeRouters } from "@/shared/server";


export const apiRouter = makeRouter({
  debug: mergeRouters(helloWorldRouter),
  account: mergeRouters(signUpRouter)
});

export type APIRouter = typeof apiRouter;
export type APICaller = ReturnType<APIRouter["createCaller"]>;