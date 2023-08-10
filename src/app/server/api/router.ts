import { helloWorldRouter } from "@/features/debug/hello-world/server";
import { userSignUpRouter } from "@/features/users/sign-up/server";
import { usersViewRouter } from "@/features/users/view/server";
import { userProfileViewRouter } from "@/features/user-profiles/view/server";
import { userProfileUpdateRouter } from "@/features/user-profiles/update/server";
import { makeRouter } from "@/shared/server";
import { mergeRouters } from "@/shared/server";


export const apiRouter = makeRouter({
  debug: mergeRouters(
    helloWorldRouter
  ),
  
  users: mergeRouters(
    userSignUpRouter,
    usersViewRouter
  ),

  userProfiles: mergeRouters(
    userProfileViewRouter, 
    userProfileUpdateRouter
  )
});

export type APIRouter = typeof apiRouter;
export type APICaller = ReturnType<APIRouter["createCaller"]>;