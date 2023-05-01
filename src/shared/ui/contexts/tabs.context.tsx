import { normalizeProps, useMachine } from "@zag-js/solid";
import * as tabs from "@zag-js/tabs";
import {
  createContext,
  createEffect,
  createUniqueId,
  JSX,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

export type TabsApi = ReturnType<typeof tabs.connect>;

export const TabsContext = createContext<TabsApi>({} as TabsApi);

export type CreateTabsOptions = {
  initial?: string;
  id?: string;
};

export function createTabs({ initial, id }: CreateTabsOptions): TabsApi {
  const [state, send] = useMachine(
    tabs.machine({
      id: id ?? createUniqueId(),
      value: initial,
    })
  );

  const [api, setApi] = createStore<TabsApi>(
    tabs.connect(state, send, normalizeProps)
  );
  createEffect(() => setApi(tabs.connect(state, send, normalizeProps)));

  return api;
}

export function useTabsContext() {
  return useContext(TabsContext);
}

export interface TabsProviderProps {
  tabs?: TabsApi;
  id?: string;
  initial?: string;
  children: JSX.Element;
}

export function TabsProvider(props: TabsProviderProps) {
  const { initial, id } = props;
  const value = props.tabs ?? createTabs({ initial, id });

  return (
    <TabsContext.Provider value={value}>{props.children}</TabsContext.Provider>
  );
}
