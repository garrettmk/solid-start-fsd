import { Path } from 'xstate-paths';
import { profilePageEvents, profilePageMachine, profilePageRunner } from './profile-e2e-machine.js';
import { test } from './profile-e2e-setup.js';

const paths = await Path.makePaths(profilePageMachine, {
  eventSource: profilePageEvents,
  deduplicate: true,

  // Select all paths that lead to a final state
  filterPath: (path) => path.isFinal() && path.length < 7,

  // Don't allow similar segments (no loops/repeats)
  filterSegment: (segment, path) => path.countSimilarSegments(segment) < 1
});


test.describe('profile', () => {
  paths.forEach((path) => {
    test(path.description, async ({ profilePage }) => {
      await profilePageRunner.run(path, profilePage);
    });
  });
})