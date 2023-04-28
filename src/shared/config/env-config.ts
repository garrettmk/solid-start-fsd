import { isServer } from "solid-js/web";

export const IS_SERVER = isServer;
export const IS_CLIENT = !isServer;