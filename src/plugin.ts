import streamDeck from "@elgato/streamdeck";

import { actions } from "./actions";
import { GlobalSettings } from "./types/settings";

streamDeck.logger.setLevel("trace");

streamDeck.settings.onDidReceiveGlobalSettings((ev) => {
  const { ipAddress, port } = ev.settings as GlobalSettings;
  streamDeck.logger.info(`Received global settings: ${ipAddress}:${port}`);
});

actions.forEach((a) => streamDeck.actions.registerAction(a));
streamDeck.connect();
