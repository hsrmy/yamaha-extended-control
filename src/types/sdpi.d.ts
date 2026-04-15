// Type definitions for Stream Deck Plugin Interface (SDPI)
export interface SDPITextFieldElement extends HTMLElement {
  value: string;
}

interface SDPIComponent {
  streamDeckClient: {
    setGlobalSettings: (payload: Record<string, unknown>) => Promise<void>;
    getGlobalSettings: () => Promise<Record<string, unknown>>;
    didReceiveGlobalSettings: {
      subscribe: (
        callback: (ev: {
          payload: { settings: Record<string, unknown> };
        }) => void,
      ) => void;
    };
    connect: () => Promise<void>;
  };
}

declare global {
  const SDPIComponents: SDPIComponent;

  interface Window {
    onSave: (event: Event) => Promise<void>;
  }
}

// Types for plugin-specific data structures
export type ZonePayload = {
  event: string;
  items: ZoneResult;
};

export type ZoneResult = Item[];

export type PowerActionPayload = {
  event: string;
  items: PowerActionResult;
};

export type PowerActionResult = Item[];

export type VolumeActionPayload = {
  event: string;
  items: VolumeActionResult;
};

export type VolumeActionResult = Item[];

export type MuteActionPayload = {
  event: string;
  items: MuteActionResult;
};

export type MuteActionResult = Item[];

export type InputPayload = {
  event: string;
  items: InputResult;
};

export type InputResult = Item[];

type Item = {
  disabled?: boolean;
  label: string;
  value: ZoneId;
};
