import streamDeck from "@elgato/streamdeck";
import {
  getInputsFromFeatures,
  getZonesFromFeatures,
} from "../actions/yxc/client";
import { InputResult, ZonePayload, ZoneResult } from "../types/sdpi";
import { toPascalCase, isEvent } from "./common";

export const getZones = async (): Promise<ZoneResult> => {
  const zones = await getZonesFromFeatures();

  return zones.map((zone) => {
    return {
      label: toPascalCase(zone),
      value: zone,
    };
  });
};

export const getInputs = async (): Promise<InputResult> => {
  const inputs = await getInputsFromFeatures();

  return inputs.map((input) => {
    return {
      label: toPascalCase(input),
      value: input,
    };
  });
};

export const handleGetZones = async (payload: unknown): Promise<void> => {
  if (!isEvent(payload, "getZones")) return;
  streamDeck.ui.sendToPropertyInspector({
    event: "getZones",
    items: await getZones(),
  } satisfies ZonePayload);
};
