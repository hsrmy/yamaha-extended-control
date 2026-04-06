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
