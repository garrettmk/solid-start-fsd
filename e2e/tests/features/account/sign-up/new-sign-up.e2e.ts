import { test } from "../../../../setup/setup.js";
import { TestPath } from "../../../../util/machines/test-path.js";
import { TestContext, makeTestContext } from "./context.js";
import { eventMap } from "./events.js";
import { machine } from "./machine.js";


const testPaths = await TestPath.makePaths<TestContext>(machine, eventMap);

test.describe('sign-up', () => {
  TestPath.recursivelyDescribe(testPaths, test.describe, (path) => {
    test(path.description, async ({ page }) => {
      await page.goto('/sign-up');
      await page.waitForLoadState('networkidle');

      const context = makeTestContext(page);
      await path.run(context);
    });
  });
})