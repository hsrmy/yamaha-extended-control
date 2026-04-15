import {
  getInputsFromFeatures,
  getZonesFromFeatures,
} from "../actions/yxc/client";
import { InputResult, ZoneResult } from "../types/sdpi";
import { toPascalCase } from "./common";

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
