import { streamDeck } from "@elgato/streamdeck";
import { GetFeaturesResponse, ZoneId } from "../../types/yxc";

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

const getYxcFeatures = async (): Promise<GetFeaturesResponse> => {
  try {
    const endpoint = await getYxcEndpoint();
    const res = await fetch(`${endpoint}/v1/system/getFeatures`);
    const data = (await res.json()) as GetFeaturesResponse;

    if (data.response_code !== 0) {
      throw new Error(
        `getFeatures failed with response_code ${data.response_code}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching YXC features:", error);
    throw error;
  }
};

export const getZonesFromFeatures = async (): Promise<ZoneId[]> => {
  const zones: ZoneId[] = ["main"];
  const features = await getYxcFeatures();
  const zone_num = features.system?.zone_num ?? 0;

  for (let i = 2; i <= zone_num; i++) {
    zones.push(`zone${i}` as ZoneId);
  }

  return zones;
};

export const getInputsFromFeatures = async (): Promise<string[]> => {
  const features = await getYxcFeatures();

  return features.system?.input_list.map((input) => input.id) ?? [];
};
