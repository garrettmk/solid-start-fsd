/**
 * Uses a data attribute to execute a function
 * @param attribute
 * @param actions
 * @returns
 */
export function usingDataAttribute<TEvent extends Event = Event>(
  attribute: string,
  actions: Record<string, (dataset: DOMStringMap, event: TEvent) => void>
) {
  return (event: TEvent) => {
    const target = event.target as HTMLElement;
    const dataset = target.dataset;
    const action = target.dataset[attribute];
    const executor = action && actions[action];

    if (executor) executor(dataset, event);
  };
}
