import streamDeck, {
  action,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { BaseResponse, VolumeAction } from "../../types/yxc";
import { getYxcEndpoint } from "./client";
import { toPascalCase } from "../../libs/common";
import { JsonValue } from "@elgato/utils";
import { getZones } from "../../libs/yxc";
import {
  ZonePayload,
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
      const action = ev.payload.settings?.action ?? "on";
      const res = await fetch(
        `${endpoint}/v1/${zone}/setPower?power=${action}`,
      );
      const { response_code } = (await res.json()) as BaseResponse;
      streamDeck.logger.info(`setPower response`, {
        zone: zone,
        action: action,
        response_code,
      });
      if (response_code === 0) {
        ev.action.showOk();
      } else {
        ev.action.showAlert();
        streamDeck.logger.error(`setPower failed`, {
          zone: zone,
          action: action,
          response_code,
        });
      }
    } catch (error) {
      ev.action.showAlert();
      streamDeck.logger.error("setPower error:", error);
    }
  }

  override async onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, VolumeActionParams>,
  ): Promise<void> {
    if (
      ev.payload instanceof Object &&
      "event" in ev.payload &&
      ev.payload.event === "getZones"
    ) {
      streamDeck.ui.sendToPropertyInspector({
        event: "getZones",
        items: await getZones(),
      } satisfies ZonePayload);
    }

    if (
      ev.payload instanceof Object &&
      "event" in ev.payload &&
      ev.payload.event === "getVolumeActions"
    ) {
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
      const action = ev.payload.settings?.action ?? "on";
      const res = await fetch(
        `${endpoint}/v1/${zone}/setPower?power=${action}`,
      );
      const { response_code } = (await res.json()) as BaseResponse;
      streamDeck.logger.info(`setPower response`, {
        zone: zone,
        action: action,
        response_code,
      });
      if (response_code === 0) {
        ev.action.showOk();
      } else {
        ev.action.showAlert();
        streamDeck.logger.error(`setPower failed`, {
          zone: zone,
          action: action,
          response_code,
        });
      }
    } catch (error) {
      ev.action.showAlert();
      streamDeck.logger.error("setPower error:", error);
    }
  }

  override async onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, MuteActionParams>,
  ): Promise<void> {
    if (
      ev.payload instanceof Object &&
      "event" in ev.payload &&
      ev.payload.event === "getZones"
    ) {
      streamDeck.ui.sendToPropertyInspector({
        event: "getZones",
        items: await getZones(),
      } satisfies ZonePayload);
    }

    if (
      ev.payload instanceof Object &&
      "event" in ev.payload &&
      ev.payload.event === "getMuteActions"
    ) {
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
      value: action,
    };
  });
};
