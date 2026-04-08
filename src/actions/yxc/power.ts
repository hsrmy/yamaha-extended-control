import streamDeck, {
  action,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import type { GlobalSettings } from "../../types/settings";
import { getYxcEndpoint } from "./client";
import type { PowerAction, ZoneId } from "../../types/yxc";

class SetPowerAction extends SingletonAction<GlobalSettings> {
  constructor(
    private readonly zone: ZoneId,
    private readonly power: PowerAction,
  ) {
    super();
  }

  override onWillAppear(_ev: WillAppearEvent<GlobalSettings>): void {}

  override async onKeyDown(_ev: KeyDownEvent<GlobalSettings>): Promise<void> {
    try {
      const endpoint = await getYxcEndpoint();
      const res = await fetch(
        `${endpoint}/v1/${this.zone}/setPower?power=${this.power}`,
      );
      const { response_code } = await res.json();
      streamDeck.logger.info(`setPower response`, {
        zone: this.zone,
        action: this.power,
        response_code,
      });
      if (response_code === 0) {
        _ev.action.showOk();
      } else {
        _ev.action.showAlert();
        streamDeck.logger.error(`setPower failed`, {
          zone: this.zone,
          action: this.power,
          response_code,
        });
      }
    } catch (error) {
      _ev.action.showAlert();
      streamDeck.logger.error("setPower error:", error);
    }
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-on-main" })
export class PowerOnMain extends SetPowerAction {
  constructor() {
    super("main", "on");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-on-zone2" })
export class PowerOnZone2 extends SetPowerAction {
  constructor() {
    super("zone2", "on");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-on-zone3" })
export class PowerOnZone3 extends SetPowerAction {
  constructor() {
    super("zone3", "on");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-on-zone4" })
export class PowerOnZone4 extends SetPowerAction {
  constructor() {
    super("zone4", "on");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-toggle-main" })
export class PowerToggleMain extends SetPowerAction {
  constructor() {
    super("main", "toggle");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-toggle-zone2" })
export class PowerToggleZone2 extends SetPowerAction {
  constructor() {
    super("zone2", "toggle");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-toggle-zone3" })
export class PowerToggleZone3 extends SetPowerAction {
  constructor() {
    super("zone3", "toggle");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-toggle-zone4" })
export class PowerToggleZone4 extends SetPowerAction {
  constructor() {
    super("zone4", "toggle");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-standby-main" })
export class PowerStandbyMain extends SetPowerAction {
  constructor() {
    super("main", "standby");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-standby-zone2" })
export class PowerStandbyZone2 extends SetPowerAction {
  constructor() {
    super("zone2", "standby");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-standby-zone3" })
export class PowerStandbyZone3 extends SetPowerAction {
  constructor() {
    super("zone3", "standby");
  }
}

@action({ UUID: "xyz.emradc.yamaha-extended-control.power-standby-zone4" })
export class PowerStandbyZone4 extends SetPowerAction {
  constructor() {
    super("zone4", "standby");
  }
}
