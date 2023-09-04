import { HStack, NotificationData, Progress, createTimer, createToggle, useNotifications } from "@/shared/ui/";
import { Match, Show, Switch, createEffect, createRenderEffect, createSignal, splitProps } from "solid-js";
import { Button } from "../buttons";
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from "../icons";
import { Panel, PanelProps } from "../panels";
import { Spinner } from "../spinners";


export type NotificationProps = PanelProps & NotificationData;

export function Notification(props: NotificationData) {
  const { dismiss } = useNotifications();
  const [, panelProps] = splitProps(props, [
    'id',
    "dismissable", 
  ]);

  const timer = createTimer({
    duration: props.timeout ?? 0,
    start: Boolean(props.timeout),
    callback: () => dismiss(props.id),
  });

  const [progress, setProgress] = createSignal(100);

  createRenderEffect(() => {
    if (props.timeout)
      setTimeout(() => setProgress(0), 50);
  })
  
  const message = () => typeof props.message === 'function' 
    ? props.message()
    : props.message;

  const body = () => typeof props.body === 'function'
    ? props.body()
    : props.body;

  const expanded = createToggle(false);
  createEffect(() => {
    if (expanded.value) {
      setProgress(100);
      timer.cancel();
    }
  });

  return (
    <Panel class="drop-shadow-xl" {...panelProps}>
      <HStack class="m-4" justify="between" align="center" spacing="sm">
        <Switch>
          <Match when={props.type === 'info'}>
            <InformationCircleIcon class="text-blue-600 dark:text-blue-500" size="sm"/>
          </Match>
          <Match when={props.type === 'loading'}>
            <Spinner/>
          </Match>
          <Match when={props.type === 'success'}>
            <CheckCircleIcon class="text-green-600 dark:text-green-500" size="sm"/>
          </Match>
          <Match when={props.type === 'error'}>
            <XMarkIcon class="text-red-500" size="sm"/>
          </Match>
          <Match when={props.type === 'warning'}>
            <ExclamationTriangleIcon class="text-orange-500" size="sm"/>
          </Match>
        </Switch>

        <span class="flex-grow text-sm">
          {message()}
        </span>

        <HStack spacing="xs">
          <Show when={props.body && !expanded.value}>
            <Button icon class="p-0.5" size="none" color="none" onClick={expanded.toggle}>
              <Show when={expanded.value} fallback={<ChevronDownIcon size="xs"/>}>
                <ChevronUpIcon size="xs"/>
              </Show>
            </Button>
          </Show>
          <Show when={(props.dismissable || !props.timeout) || expanded.value}>
            <Button icon class="p-0.5" size="none" color="none" onClick={() => dismiss(props.id)}>
              <XMarkIcon size="xs"/>
            </Button>
          </Show>
        </HStack>
      </HStack>

      <Show when={expanded.value}>
        <div class="px-4 pb-4 text-sm">
          {body()}
        </div>
      </Show>

      <Show when={props.timeout && !expanded.value}>
        <Progress
          class="-mt-1"
          value={progress()}
          size='xs'
          easing='linear'
          duration={props.timeout}
          reverse
        />
      </Show>
    </Panel>
  );
}