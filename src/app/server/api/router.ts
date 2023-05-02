import { helloWorldRouter } from "@/features/debug/hello-world/server";
import { makeRouter } from "@/shared/server";


export const apiRouter = makeRouter({
  debug: helloWorldRouter
});

export type APIRouter = typeof apiRouter;
export type APICaller = ReturnType<APIRouter["createCaller"]>;