import { TestPath } from "@/e2e/util/machines/test-path.js";
import { TestContext, eventMap, machine, test, expect } from "./setup/index.js";

const testPaths = await TestPath.makePaths<TestContext>(machine, eventMap, {
  maxLength: 10,
  filterSegment: (segment, path) =>
    path.countMatches(segment) < 3 &&
    path.lastSegment?.event.type !== segment.event.type &&
    path.segments.filter(s => s.event.type === segment.event.type).length < 3,


  // filterSegment: (segment, path) => !path.alreadyHasSimilarSegment(segment) && path.lastSegment?.event.type !== segment.event.type,
  filterPath: (path) => path.isFinal() || path.length >= 10,
});


test.describe('sign-up', () => {
  testPaths.forEach((path) => {
    test(path.description, async ({ signUpPage, supabase, signUpInfo }) => {
      await path.run({ signUpPage, supabase });
    });
  });
})

// const [successPaths, otherPaths] = fork(testPaths, path => path.target === 'success');


// test.describe('sign-up', () => {
//   test.describe.serial('success', () => {
//     successPaths.forEach((path) => {
//       test(path.description, async ({ signUpPage, supabase, signUpInfo }) => {
//         await path.run({ signUpPage, supabase });
//       });
//     });
//   });

//   test.describe('other', () => {
//     otherPaths.forEach((path) => {
//       test(path.description, async ({ signUpPage, supabase, signUpInfo }) => {
//         await path.run({ signUpPage, supabase });
//       });
//     });
//   });
// });


// test.describe('sign-up', () => {
//   TestPath.recursivelyDescribe(testPaths, test.describe, (path) => {
//     test(path.description, async ({ signUpPage, supabase }) => {
//       await path.run({ signUpPage, supabase });
//     });
//   });
// })