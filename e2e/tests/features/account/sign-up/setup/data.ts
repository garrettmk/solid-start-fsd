import type { NewAccountInput } from '@/features/account/sign-up';


export const signUpInfo: NewAccountInput = {
  "fullName": "Bob Smith",
  "email": "bob@smith.com",
  "password": "FooFoo2020!",
  "confirmPassword": "FooFoo2020!",
  "agreesToTerms": true,
  "wantsMarketing": true
};