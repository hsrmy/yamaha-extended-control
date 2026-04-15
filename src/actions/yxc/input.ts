import streamDeck, {
  action,
  KeyDownEvent,
  SendToPluginEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { InputActionParams } from "../../types/actions";
import { JsonValue } from "@elgato/utils";
import { getInputs, getZones } from "../../libs/yxc";
import { getYxcEndpoint } from "./client";
import { BaseResponse } from "../../types/yxc";

@action({ UUID: "xyz.emradc.yamaha-extended-control.input" })
export class SetInputAction extends SingletonAction<InputActionParams> {
  override onWillAppear(ev: WillAppearEvent<InputActionParams>): void {}

  override async onKeyDown(ev: KeyDownEvent<InputActionParams>): Promise<void> {
    try {
      const endpoint = await getYxcEndpoint();
      const zone = ev.payload.settings?.zone ?? "main";
      const input = ev.payload.settings?.input ?? "none";
      const res = await fetch(`${endpoint}/v1/${zone}/setInput?input=${input}`);
      const { response_code } = (await res.json()) as BaseResponse;
      streamDeck.logger.info(`setInput response`, {
        zone: zone,
        input: input,
        response_code,
      });
      if (response_code === 0) {
        ev.action.showOk();
      } else {
        ev.action.showAlert();
        streamDeck.logger.error(`setInput failed`, {
          zone: zone,
          input: input,
          response_code,
        });
      }
    } catch (error) {
      ev.action.showAlert();
      streamDeck.logger.error("setInput error:", error);
    }
  }

  override async onSendToPlugin(
    ev: SendToPluginEvent<JsonValue, InputActionParams>,
  ): Promise<void> {
    if (
      ev.payload instanceof Object &&
      "event" in ev.payload &&
      ev.payload.event === "getZones"
    ) {
      streamDeck.ui.sendToPropertyInspector({
        event: "getZones",
        items: await getZones(),
      });
    }

    if (
      ev.payload instanceof Object &&
      "event" in ev.payload &&
      ev.payload.event === "getInputs"
    ) {
      streamDeck.ui.sendToPropertyInspector({
        event: "getInputs",
        items: await getInputs(),
      });
    }
  }
}
