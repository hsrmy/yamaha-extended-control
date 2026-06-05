import streamDeck, {
  action,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { BaseResponse, VolumeAction } from "../../types/yxc";
import { getYxcEndpoint } from "./client";
import { toPascalCase, isEvent } from "../../libs/common";
import { JsonValue } from "@elgato/utils";
import { handleGetZones } from "../../libs/yxc";
import {
  VolumeActionPayload,
  VolumeActionResult,
  MuteActionResult,
  MuteActionPayload,
} from "../../types/sdpi";
import type { MuteActionParams, VolumeActionParams } from "../../types/actions";

@action({ UUID: "xyz.emradc.yamaha-extended-control.volume" })
export class SetVolumeAction extends SingletonAction<VolumeActionParams> {
  override onWillAppear(ev: WillAppearEvent<VolumeActionParams>): void {}

  override async onKeyDown(
    ev: KeyDownEvent<VolumeActionParams>,
  ): Promise<void> {
    try {
      const endpoint = await getYxcEndpoint();
      const zone = ev.payload.settings?.zone ?? "main";
      const action = ev.payload.settings?.action ?? "up";
      const res = await fetch(
        `${endpoint}/v1/${zone}/setVolume?volume=${action}`,
      );
      const { response_code } = (await res.json()) as BaseResponse;
      streamDeck.logger.info(`setVolume response`, { zone, action, response_code });
      if (response_code === 0) {
        ev.action.showOk();
      } else {
        ev.action.showAlert();
        streamDeck.logger.error(`setVolume failed`, { zone, action, response_code });
      }
    } catch (error) {
      ev.action.showAlert();
      streamDeck.logger.error("setVolume error:", error);
    }
  }

  override async onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, VolumeActionParams>,
  ): Promise<void> {
    await handleGetZones(ev.payload);

    if (isEvent(ev.payload, "getVolumeActions")) {
      streamDeck.ui.sendToPropertyInspector({
        event: "getVolumeActions",
        items: getVolumeActions(),
      } satisfies VolumeActionPayload);
    }
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.mute" })
export class SetMuteAction extends SingletonAction<MuteActionParams> {
  override onWillAppear(ev: WillAppearEvent<MuteActionParams>): void {}

  override async onKeyDown(ev: KeyDownEvent<MuteActionParams>): Promise<void> {
    try {
      const endpoint = await getYxcEndpoint();
      const zone = ev.payload.settings?.zone ?? "main";
      const action = ev.payload.settings?.action ?? true;
      const res = await fetch(
        `${endpoint}/v1/${zone}/setMute?enable=${String(action)}`,
      );
      const { response_code } = (await res.json()) as BaseResponse;
      streamDeck.logger.info(`setMute response`, { zone, action, response_code });
      if (response_code === 0) {
        ev.action.showOk();
      } else {
        ev.action.showAlert();
        streamDeck.logger.error(`setMute failed`, { zone, action, response_code });
      }
    } catch (error) {
      ev.action.showAlert();
      streamDeck.logger.error("setMute error:", error);
    }
  }

  override async onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, MuteActionParams>,
  ): Promise<void> {
    await handleGetZones(ev.payload);

    if (isEvent(ev.payload, "getMuteActions")) {
      streamDeck.ui.sendToPropertyInspector({
        event: "getMuteActions",
        items: getMuteActions(),
      } satisfies MuteActionPayload);
    }
  }
}

const getVolumeActions = (): VolumeActionResult => {
  streamDeck.logger.info("getVolumeActions called");
  const actions: VolumeAction[] = ["up", "down"];

  return actions.map((action) => {
    return {
      label: toPascalCase(action),
      value: action,
    };
  });
};

const getMuteActions = (): MuteActionResult => {
  streamDeck.logger.info("getMuteActions called");
  const actions: boolean[] = [true, false];

  return actions.map((action) => {
    return {
      label: toPascalCase(action.toString()),
      value: action.toString(),
    };
  });
};
