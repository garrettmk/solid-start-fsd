import { Container } from "tidi";
import { APIProviders } from "../providers";

export async function makeRouteRequestContainer(requestContainer: Container) {
  return new Container(requestContainer, APIProviders)
}