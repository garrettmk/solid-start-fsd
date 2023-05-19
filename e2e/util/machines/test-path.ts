import { AnyStateMachine } from "xstate";
import { EventMap } from "./event-map.js";
import { TestSegment } from "./test-segment.js";
import { group } from "radash";

export type DescribeFn = (description: string, callback: () => void) => void;

export type RunCallbackFn<TTestContext = any> = (path: TestPath<TTestContext>) => void;


export class TestPath<TTestContext = any> {
  public constructor(
    public readonly machine: AnyStateMachine,
    protected readonly events: EventMap<TTestContext> = new EventMap(),
    public readonly segments: TestSegment<TTestContext>[] = []
  ) {
    if (!segments.length) {
      const initialSegment = new TestSegment(machine, machine.initialState, events);
      this.segments.push(initialSegment);
    }
  }

  public static recursivelyDescribe<TTestContext = any>(
    paths: TestPath<TTestContext>[],
    describe: DescribeFn,
    each: RunCallbackFn<TTestContext>,
  ) {
    const groupedByTarget = group(paths, path => path.targetDescription);

    for (const [target, paths = []] of Object.entries(groupedByTarget)) {
      describe(`reaches ${target}`, () => {
        paths.forEach(path => {
          const events = path.segments.map(segment => segment.eventDescription);

          const run = ([head, ...tail]: string[]) => {
            if (!tail.length)
              describe(head, () => {
                each(path);
              });
            else if (head === 'xstate.init')
              run(tail);
            else
              describe(head, () => run(tail));
          };

          run(events);
        });
      });
    }
  }

  public static async makePaths<TTestContext = any, TEventMap extends EventMap = EventMap>(machine: AnyStateMachine, events: TEventMap) {
    const pathToInitialState = new TestPath<TTestContext>(machine, events);
    const nextPaths = await pathToInitialState.makeNextPaths()

    return [pathToInitialState, ...nextPaths];
  }

  public get description() {
    return this.segments
      .map(({ description }) => description)
      .join(' -> ');
  }

  public get target() {
    const lastSegment = this.segments[this.segments.length - 1];
    return lastSegment.target;
  }

  public get targetDescription() {
    return JSON.stringify(this.target);
  }

  public async run(context: TTestContext) {
    let currentState = this.machine.initialState;

    for (const segment of this.segments) {
      currentState = await segment.run(context, currentState);
    }
  }

  public async makeNextPaths(): Promise<TestPath<TTestContext>[]> {
    const lastSegment = this.segments[this.segments.length - 1];
    const nextSegments = await lastSegment.makeNextSegments();
    const nextPaths: TestPath<TTestContext>[] = [];

    for (const nextSegment of nextSegments) {
      if (this.alreadyHasSegment(nextSegment))
        continue;

      const nextPath = new TestPath(this.machine, this.events, this.segments.concat(nextSegment));
      nextPaths.push(nextPath);
      nextPaths.push(...await nextPath.makeNextPaths());
    }

    return nextPaths
  }

  public alreadyHasSegment(segment: TestSegment) {
    return this.segments.find(({ description }) => description === segment.description);
  }
}