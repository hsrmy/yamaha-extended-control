import streamDeck from "@elgato/streamdeck";

import { IncrementCounter } from "./actions/increment-counter";
import { GlobalSettings } from "./types/settings";

streamDeck.logger.setLevel("trace");

streamDeck.settings.onDidReceiveGlobalSettings((ev) => {
  const { ipAddress, port } = ev.settings as GlobalSettings;
  streamDeck.logger.info(`Received global settings: ${ipAddress}:${port}`);
});

// Register the increment action.
streamDeck.actions.registerAction(new IncrementCounter());

// Finally, connect to the Stream Deck.
streamDeck.connect();
