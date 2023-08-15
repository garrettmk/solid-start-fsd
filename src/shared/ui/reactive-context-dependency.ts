import { dependency } from 'tidi';
import { Owner, runWithOwner as solidRunWithOwner } from 'solid-js';

export const ReactiveContextDependency = dependency<Owner | null>({
  name: 'REACTIVE_CONTEXT',
});


export function runWithOwner<T>(owner: Owner | null, fn: () => T): T {
  // @ts-expect-error solidRunWithOwner might return undefined
  return solidRunWithOwner(owner, fn);
}