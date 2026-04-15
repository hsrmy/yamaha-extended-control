import type { ZoneId, PowerAction, VolumeAction } from "./yxc";

export type PowerActionParams = {
  zone: ZoneId;
  action: PowerAction;
};

export type VolumeActionParams = {
  zone: ZoneId;
  action: VolumeAction;
};

export type MuteActionParams = {
  zone: ZoneId;
  action: boolean;
};

export type InputActionParams = {
  zone: ZoneId;
  input: string;
};
