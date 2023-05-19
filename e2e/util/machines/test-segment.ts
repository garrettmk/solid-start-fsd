import { get, isEmpty, isFunction, omit } from "radash";
import { AnyEventObject, AnyState, AnyStateMachine } from "xstate";
import { EventMap } from "./event-map.js";

/**
 * A segment of a test path. Applies a single event to a state and tests
 * the resulting state.
 */
export class TestSegment<TTestContext = any> {

  /**
   * 
   * @param machine The machine used to `transition` between states.
   * @param state The target state.
   * @param exec An event exec function that is called before the event 
   *             is applied to the state.
   */
  public constructor(
    protected readonly machine: AnyStateMachine,
    protected readonly state: AnyState = machine.initialState,
    protected readonly events: EventMap<TTestContext> = new EventMap(),
  ) { }

  /**
   * A description of the segment.
   */
  public get description() {
    const { eventDescription, stateDescription } = this;
    return `${eventDescription} -> ${stateDescription}`;
  }

  /**
   * A description of the segment's `event`.
   */
  public get eventDescription() {
    const { event } = this.state;
    const eventData = omit(event, ['type']);

    if (isEmpty(eventData))
      return event.type;

    return `${event.type} ${JSON.stringify(eventData)}`;
  }

  /**
   * A description of the segment's `state`.
   */
  public get stateDescription() {
    const stateStrings = this.state.toStrings();
    return stateStrings
      .filter(str => !stateStrings.find(s => s.startsWith(str + '.')))
      .join(', ');
  }

  /**
   * The target state's `StateValue`
   */
  public get target() {
    return this.state.value;
  }

  /**
   * The segment's `event`.
   */
  public get event() {
    return this.state.event;
  }

  /**
   * The segment's `tests`.
   */
  public get tests() {
    return Object.values(this.state.meta)
      .map(meta => get(meta, 'test'))
      .filter(isFunction);
  }

  /**
   * Runs the segment on the given state and returns the resulting state.
   * 
   * First, the `exec` function is called with the given context and event.
   * Then `machine` is used to apply the `event` to the `state`. The
   * resulting state is then tested against the `target` state. Finally,
   * the `tests` are run against the resulting state.
   * 
   * @param context The context to pass to the exec and test functions.
   * @param state The starting state.
   * @returns the resulting state.
   */
  public async run(context: TTestContext, state: AnyState) {
    await this.executeEvent(context);
    const nextState = await this.applyEvent(state);

    this.assertMatchesTarget(nextState);
    await this.runTests(context, nextState);

    return nextState;
  }

  /**
   * Applies the given events to the segment's `state` and returns an
   * array of `TestSegments` for each resulting state.
   * 
   * @returns an array of `TestSegments`
   */
  public async makeNextSegments() {
    const fromState = this.state;
    const nextEvents = this.events.getNextEvents(fromState);

    return nextEvents.map(event => {
      const nextState = this.machine.transition(fromState, event);
      return new TestSegment(this.machine, nextState, this.events);
    });
  }

  /**
   * Call's the event's `exec` function with the segments `event`
   * and the given context.
   * 
   * @param context The context to pass to the `exec` function.
   */
  protected async executeEvent(context: TTestContext) {
    if (this.event.type === 'xstate.init')
      return;

    const exec = this.events.getExec(this.event.type);
    await exec(context, this.event);
  }

  /**
   * Applies the segment's `event` to the given state and returns the
   * resulting state.
   * 
   * @param state 
   * @returns 
   */
  protected async applyEvent(state: AnyState): Promise<AnyState> {
    const nextState = this.machine.transition(state, this.event);
    await this.runActions(nextState);

    return nextState;
  }

  /**
   * Throws an error unless the given `state` matches the segment's
   * target state.
   * 
   * @param state 
   */
  protected assertMatchesTarget(state: AnyState) {
    if (!this.state.matches(state.value))
      throw new Error(`Expected state to be ${this.state.value}, but was ${state.value}`);
  }

  /**
   * Runs the state's `actions`.
   * 
   * @param state 
   */
  protected async runActions(state: AnyState) {
    const { actions, context, event, meta } = state;

    for (const action of actions) {
      if (typeof action.exec === 'function')
        await action.exec(context, event, meta);
    }
  }

  /**
   * Runs the segments tests against the given context and state.
   * 
   * @param context 
   * @param state 
   */
  protected async runTests(context: TTestContext, state: AnyState) {
    for (const test of this.tests)
      await test(context, state);
  }

  /**
   * Returns a list of events that can be applied to the given state.
   * 
   * @param fromState 
   * @param events 
   * @returns 
   */
  protected getNextEvents(fromState: AnyState, events: EventMap<TTestContext>): AnyEventObject[] {
    return fromState.nextEvents.flatMap(type => events.getEvents(type));
  }
}
