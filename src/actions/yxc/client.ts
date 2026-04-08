import { streamDeck } from "@elgato/streamdeck";

const getYxcBaseUrl = async (): Promise<string> => {
  const { ipAddress, port } = await streamDeck.settings.getGlobalSettings();

  if (Number(port) === 80) {
    return `http://${ipAddress}`;
  }

  return `http://${ipAddress}:${port}`;
};

export const getYxcEndpoint = async (): Promise<string> => {
  const baseUrl = await getYxcBaseUrl();
  return `${baseUrl}/YamahaExtendedControl`;
};
