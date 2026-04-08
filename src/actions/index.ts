export * from "./yxc/power";

import { SingletonAction } from "@elgato/streamdeck";
import {
  PowerOnMain,
  PowerOnZone2,
  PowerOnZone3,
  PowerOnZone4,
  PowerToggleMain,
  PowerToggleZone2,
  PowerToggleZone3,
  PowerToggleZone4,
  PowerStandbyMain,
  PowerStandbyZone2,
  PowerStandbyZone3,
  PowerStandbyZone4,
} from "./yxc/power";

const powerOnActions = [
  new PowerOnMain(),
  new PowerOnZone2(),
  new PowerOnZone3(),
  new PowerOnZone4(),
];
const powerToggleActions = [
  new PowerToggleMain(),
  new PowerToggleZone2(),
  new PowerToggleZone3(),
  new PowerToggleZone4(),
];
const powerStandbyActions = [
  new PowerStandbyMain(),
  new PowerStandbyZone2(),
  new PowerStandbyZone3(),
  new PowerStandbyZone4(),
];

const actions: SingletonAction[] = [
  ...powerOnActions,
  ...powerToggleActions,
  ...powerStandbyActions,
];

export { actions };
