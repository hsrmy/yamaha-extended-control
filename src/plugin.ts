import streamDeck from "@elgato/streamdeck";

import { GlobalSettings } from "./types/settings";
import { SetPowerAction } from "./actions/yxc/power";
import { SetMuteAction, SetVolumeAction } from "./actions/yxc/volume";
import { SetInputAction } from "./actions/yxc/input";

streamDeck.logger.setLevel("info");

streamDeck.settings.onDidReceiveGlobalSettings((ev) => {
  const { ipAddress, port } = ev.settings as GlobalSettings;
  streamDeck.logger.info(`Received global settings: ${ipAddress}:${port}`);
});

streamDeck.actions.registerAction(new SetPowerAction());
streamDeck.actions.registerAction(new SetVolumeAction());
streamDeck.actions.registerAction(new SetMuteAction());
streamDeck.actions.registerAction(new SetInputAction());

streamDeck.connect();
