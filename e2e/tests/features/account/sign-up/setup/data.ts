import type { NewAccountInput } from '@/features/users/sign-up-user';


export const signUpInfo: NewAccountInput = {
  "fullName": "Bob Smith",
  "email": "bob@smith.com",
  "password": "FooFoo2020!",
  "confirmPassword": "FooFoo2020!",
  "agreesToTerms": true,
  "wantsMarketing": true
};