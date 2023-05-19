import { NewAccountInput } from "@/features/account/sign-up/schemas/new-account-input-schema.js";

export const validAccountInfo: NewAccountInput[] = [
  { fullName: 'Luke Skywalker', email: 'luke@therebellion.com', password: 'FooFoo2020!', confirmPassword: 'FooFoo2020!', agreesToTerms: true },
  { fullName: 'Han Solo', email: 'han@smugglers.co', password: 'HanHan2020!', confirmPassword: 'HanHan2020!', agreesToTerms: false, wantsMarketing: true }
];

export const invalidAccountInfoFields: Record<string, string[]> = {
  fullName: [''],
  email: ['']
};

export function makeAccountInfoInputs() {
  const valids = validAccountInfo;
  const invalidsFor = invalidAccountInfoFields

  return valids.concat(valids.flatMap(valid => {
    return Object.keys(valid).flatMap(key => {
      return invalidsFor[key]?.map(invalid => {
        return { ...valid, [key]: invalid };
      }) ?? [];
    });
  }));
}