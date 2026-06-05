import streamDeck, {
  action,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";

import { getYxcEndpoint } from "./client";
import type { BaseResponse, PowerAction } from "../../types/yxc";
import { JsonValue } from "@elgato/utils";
import {
  PowerActionResult,
  PowerActionPayload,
} from "../../types/sdpi";
import { toPascalCase, isEvent } from "../../libs/common";
import { handleGetZones } from "../../libs/yxc";
import { PowerActionParams } from "../../types/actions";

@action({ UUID: "xyz.emradc.yamaha-extended-control.power" })
export class SetPowerAction extends SingletonAction<PowerActionParams> {
  override onWillAppear(ev: WillAppearEvent<PowerActionParams>): void {}

  override async onKeyDown(ev: KeyDownEvent<PowerActionParams>): Promise<void> {
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
    ev: SendToPluginEvent<JsonValue, PowerActionParams>,
  ): Promise<void> {
    await handleGetZones(ev.payload);

    if (isEvent(ev.payload, "getActions")) {
      streamDeck.ui.sendToPropertyInspector({
        event: "getActions",
        items: getActions(),
      } satisfies PowerActionPayload);
    }
  }
}

const getActions = (): PowerActionResult => {
  streamDeck.logger.info("getActions called");
  const actions: PowerAction[] = ["on", "standby", "toggle"];

  return actions.map((action) => {
    return {
      label: toPascalCase(action),
      value: action,
    };
  });
};
