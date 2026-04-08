// Yamaha Extended Control (YXC) API Type Definitions (Advanced)
// Based on YXC_API_Spec_Advanced Rev. 2.00
// Covers: Zone Link controls, Distribution (Link) APIs

import type { BaseResponse, ZoneId } from "./yxc";

// ─── Distribution (Link) ─────────────────────────────────────────────────────

export type DistributionRole = "server" | "client" | "none";
export type DistributionStatus = "building" | "working" | "deleting";
export type DistributionDataType = "base" | "ext";

export interface DistributionClientInfo {
  ip_address: string;
  data_type: DistributionDataType;
}

export interface BuildDisableInfo {
  role: "server" | "client";
  reasons: ("unknown" | "not_implemented")[];
}

export interface GetDistributionInfoResponse extends BaseResponse {
  group_id?: string;
  group_name?: string;
  role?: DistributionRole;
  status?: DistributionStatus;
  server_zone?: ZoneId;
  client_list?: DistributionClientInfo[];
  build_disable?: BuildDisableInfo[];
  audio_dropout?: boolean;
}

export interface SetServerInfoRequest {
  group_id: string;
  zone?: ZoneId;
  type?: "add" | "remove";
  client_list?: string[];
}

export interface SetClientInfoRequest {
  group_id: string;
  zone?: ZoneId[];
  server_ip_address?: string;
}
