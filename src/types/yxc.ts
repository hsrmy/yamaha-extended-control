// Yamaha Extended Control (YXC) API Type Definitions
// Based on YXC_API_Spec_Basic Rev. 2.00

// ─── Common ──────────────────────────────────────────────────────────────────

export type ResponseCode =
  | 0 // Successful
  | 1 // Initializing
  | 2 // Internal Error
  | 3 // Invalid Request
  | 4 // Invalid Parameter
  | 5 // Guarded
  | 6 // Time Out
  | 99 // Firmware Updating
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 200
  | 201;

export interface BaseResponse {
  response_code: ResponseCode;
}

export type ZoneId = "main" | "zone2" | "zone3" | "zone4";
export type TunerBand = "am" | "fm" | "dab";
export type TunerPresetBand = "common" | TunerBand;
export type PowerStatus = "on" | "standby";
export type NetworkStandby = "off" | "on" | "auto";

// ─── System ──────────────────────────────────────────────────────────────────

export interface GetDeviceInfoResponse extends BaseResponse {
  model_name?: string;
  destination?: string;
  device_id?: string;
  system_id?: string;
  system_version?: number;
  api_version?: number;
  netmodule_generation?: number;
  netmodule_version?: string;
  netmodule_checksum?: string;
  serial_number?: string;
  category_code?: number;
  operation_mode?: string;
  update_error_code?: string;
}

export type SystemFuncId =
  | "wired_lan"
  | "wireless_lan"
  | "wireless_direct"
  | "extend_1_band"
  | "dfs_option"
  | "network_standby"
  | "network_standby_auto"
  | "bluetooth_standby"
  | "bluetooth_tx_setting"
  | "auto_power_standby"
  | "ir_sensor"
  | "speaker_a"
  | "speaker_b"
  | "headphone"
  | "dimmer"
  | "zone_b_volume_sync"
  | "hdmi_out_1"
  | "hdmi_out_2"
  | "hdmi_out_3"
  | "airplay"
  | "stereo_pair"
  | "speaker_settings"
  | "disklavier_settings"
  | "background_download"
  | "remote_info"
  | "network_reboot"
  | "system_reboot"
  | "auto_play"
  | "speaker_pattern"
  | "party_mode";

export type ZoneFuncId =
  | "power"
  | "sleep"
  | "volume"
  | "mute"
  | "sound_program"
  | "surround_3d"
  | "direct"
  | "pure_direct"
  | "enhancer"
  | "tone_control"
  | "equalizer"
  | "balance"
  | "dialogue_level"
  | "dialogue_lift"
  | "clear_voice"
  | "subwoofer_volume"
  | "bass_extension"
  | "signal_info"
  | "prepare_input_change"
  | "link_control"
  | "link_audio_delay"
  | "link_audio_quality"
  | "scene"
  | "contents_display"
  | "cursor"
  | "menu"
  | "actual_volume"
  | "audio_select"
  | "surr_decoder_type";

export type TunerFuncId =
  | "am"
  | "fm"
  | "rds"
  | "dab"
  | "hd_radio"
  | "fm_auto_preset"
  | "dab_initial_scan"
  | "dab_tune_aid";

export type ClockFuncId = "date_and_time" | "alarm" | "snooze" | "format";

export interface RangeStep {
  id: string;
  min: number;
  max: number;
  step: number;
}

export interface InputInfo {
  id: string;
  distribution_enable: boolean;
  rename_enable: boolean;
  account_enable: boolean;
  play_info_type?: "none" | "tuner" | "netusb" | "cd";
}

export interface ZoneFeatures {
  id: ZoneId;
  zone_b?: boolean;
  func_list: ZoneFuncId[];
  input_list: string[];
  sound_program_list?: string[];
  surr_decoder_type_list?: string[];
  tone_control_mode_list?: string[];
  equalizer_mode_list?: string[];
  link_control_list?: string[];
  link_audio_delay_list?: string[];
  link_audio_quality_list?: string[];
  range_step: RangeStep[];
  scene_num?: number;
  cursor_list?: string[];
  menu_list?: string[];
  actual_volume_mode_list?: string[];
  audio_select_list?: string[];
}

export interface TunerPresetInfo {
  type: "common" | "separate";
  num: number;
}

export interface TunerFeatures {
  func_list: TunerFuncId[];
  range_step: RangeStep[];
  preset: TunerPresetInfo;
}

export interface NetusbFeatures {
  func_list?: string[];
  preset: { num: number };
  recent_info?: { num: number };
  net_radio_type?: "vtuner" | "airable";
  pandora?: { sort_option_list: string[] };
}

export interface DistributionFeatures {
  version?: number;
  compatible_client?: number[];
  client_max?: number;
  server_zone_list?: ZoneId[];
}

export interface ClockFeatures {
  func_list: ClockFuncId[];
  range_step: RangeStep[];
  alarm_fade_type_num?: number;
  alarm_mode_list?: string[];
  alarm_input_list?: string[];
  alarm_preset_list?: string[];
  supported?: boolean;
}

export interface GetFeaturesResponse extends BaseResponse {
  system?: {
    func_list: SystemFuncId[];
    zone_num: number;
    input_list: InputInfo[];
    range_step?: RangeStep[];
    bluetooth?: { update_cancelable: boolean };
    speaker_pattern_num?: number;
  };
  zone?: ZoneFeatures[];
  tuner?: TunerFeatures;
  netusb?: NetusbFeatures;
  distribution?: DistributionFeatures;
  clock?: ClockFeatures;
}

export interface WirelessLanInfo {
  ssid: string;
  type: "none" | "wep" | "wpa2-psk(aes)" | "mixed_mode";
  key?: string;
  ch?: number;
  strength?: number;
}

export interface MusiccastNetworkInfo {
  ready: boolean;
  device_type: "root" | "node" | "leaf" | "standard" | "unknown";
  child_num: number;
  ch: number;
  initial_join_running: boolean;
}

export interface MacAddress {
  wired_lan?: string;
  wireless_lan?: string;
  wireless_direct?: string;
}

export interface GetNetworkStatusResponse extends BaseResponse {
  network_name?: string;
  connection?:
    | "wired_lan"
    | "wireless_lan"
    | "wireless_direct"
    | "extend_1"
    | "extend_2"
    | "extend_3"
    | "unknown";
  dhcp?: boolean;
  ip_address?: string;
  subnet_mask?: string;
  default_gateway?: string;
  dns_server_1?: string;
  dns_server_2?: string;
  wireless_lan?: WirelessLanInfo;
  wireless_direct?: { ssid: string; type: string; key?: string };
  musiccast_network?: MusiccastNetworkInfo;
  mac_address?: MacAddress;
  airplay_pin?: string;
}

export interface GetFuncStatusResponse extends BaseResponse {
  auto_power_standby?: boolean;
  ir_sensor?: boolean;
  speaker_a?: boolean;
  speaker_b?: boolean;
  headphone?: boolean;
  dimmer?: number;
  zone_b_volume_sync?: boolean;
  hdmi_out_1?: boolean;
  hdmi_out_2?: boolean;
  hdmi_out_3?: boolean;
  auto_play?: boolean;
  speaker_pattern?: number;
  party_mode?: boolean;
}

export interface BluetoothDevice {
  connected?: boolean;
  name: string;
  type: "loudspeaker" | "headphone" | "handsfree_device" | "unknown";
  address: string;
}

export interface GetBluetoothInfoResponse extends BaseResponse {
  bluetooth_standby?: boolean;
  bluetooth_tx_setting?: boolean;
  bluetooth_device?: BluetoothDevice;
}

export interface GetBluetoothDeviceListResponse extends BaseResponse {
  updating: boolean;
  device_list: BluetoothDevice[];
}

export interface NameTextItem {
  id: string;
  text: string;
}

export interface GetNameTextResponse extends BaseResponse {
  zone_list?: NameTextItem[];
  input_list?: NameTextItem[];
  sound_program_list?: NameTextItem[];
  id?: string;
  text?: string;
}

export interface GetLocationInfoResponse extends BaseResponse {
  id?: string;
  name?: string;
  zone_list?: Partial<Record<ZoneId, boolean>>;
  stereo_pair_status?:
    | "none"
    | "master_left"
    | "master_right"
    | "slave_left"
    | "slave_right";
}

export interface GetStereoPairInfoResponse extends BaseResponse {
  status?:
    | "none"
    | "master_left"
    | "master_right"
    | "slave_left"
    | "slave_right";
  pair_info?: {
    alive: boolean;
    ip_address: string;
    mac_address: string;
  };
}

export interface GetMacAddressFilterResponse extends BaseResponse {
  filter: boolean;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  address_4?: string;
  address_5?: string;
  address_6?: string;
  address_7?: string;
  address_8?: string;
  address_9?: string;
  address_10?: string;
}

export interface AdvancedSettingsItem {
  id: "system_reboot" | "auto_play" | "ir_sensor";
  link_list: ("for_websettings" | "for_musiccast_app")[];
}

export interface GetAdvancedFeaturesResponse extends BaseResponse {
  web_settings_list?: string[];
  advanced_settings_list?: AdvancedSettingsItem[];
}

// ─── Zone ─────────────────────────────────────────────────────────────────────
export type PowerAction = "on" | "standby" | "toggle";

export interface ToneControl {
  mode?: string;
  bass?: number;
  treble?: number;
}

export interface Equalizer {
  mode?: string;
  low?: number;
  mid?: number;
  high?: number;
}

export interface ActualVolume {
  mode: string;
  value: number;
  unit: string;
}

export interface GetZoneStatusResponse extends BaseResponse {
  power?: PowerStatus;
  sleep?: number;
  volume?: number;
  mute?: boolean;
  max_volume?: number;
  input?: string;
  input_text?: string;
  distribution_enable?: boolean;
  sound_program?: string;
  surr_decoder_type?: string;
  surround_3d?: boolean;
  direct?: boolean;
  pure_direct?: boolean;
  enhancer?: boolean;
  tone_control?: ToneControl;
  equalizer?: Equalizer;
  balance?: number;
  dialogue_level?: number;
  dialogue_lift?: number;
  clear_voice?: boolean;
  subwoofer_volume?: number;
  bass_extension?: boolean;
  link_control?: string;
  link_audio_delay?: string;
  link_audio_quality?: string;
  disable_flags?: number;
  contents_display?: boolean;
  actual_volume?: ActualVolume;
  audio_select?: string;
  party_enable?: boolean;
}

export interface GetSignalInfoResponse extends BaseResponse {
  audio?: {
    error: number;
    format: string;
    fs: string;
  };
}

// ─── Tuner ────────────────────────────────────────────────────────────────────

export interface TunerPresetItem {
  band: TunerBand | "unknown";
  number: number;
  hd_program?: number;
  text?: string;
}

export interface GetTunerPresetInfoResponse extends BaseResponse {
  preset_info: TunerPresetItem[];
  func_list?: ("clear" | "move")[];
}

export interface RdsInfo {
  program_type?: string;
  program_service?: string;
  radio_text_a?: string;
  radio_text_b?: string;
}

export interface DabInfo {
  preset?: number;
  id?: number;
  status?: "not_ready" | "initial_scan" | "tune_aid" | "ready";
  freq?: number;
  category?: "primary" | "secondary";
  audio_mode?: "mono" | "stereo";
  bit_rate?: number;
  quality?: number;
  tune_aid?: number;
  off_air?: boolean;
  dab_plus?: boolean;
  program_type?: string;
  ch_label?: string;
  service_label?: string;
  dls?: string;
  ensemble_label?: string;
  initial_scan_progress?: number;
  total_station_num?: number;
}

export interface GetTunerPlayInfoResponse extends BaseResponse {
  band?: TunerBand;
  auto_scan?: boolean;
  auto_preset?: boolean;
  am?: { preset: number; freq: number; tuned: boolean };
  fm?: {
    preset: number;
    freq: number;
    tuned: boolean;
    audio_mode?: "mono" | "stereo";
  };
  rds?: RdsInfo;
  dab?: DabInfo;
}

// ─── NetUSB ───────────────────────────────────────────────────────────────────

export type PlaybackStatus =
  | "play"
  | "stop"
  | "pause"
  | "fast_reverse"
  | "fast_forward";
export type RepeatMode = "off" | "one" | "all";
export type ShuffleMode = "off" | "on" | "songs" | "albums";

export interface NetusbPresetItem {
  input: string;
  text: string;
  attribute?: number;
}

export interface GetNetusbPresetInfoResponse extends BaseResponse {
  preset_info: NetusbPresetItem[];
  func_list?: ("clear" | "move")[];
}

export interface GetNetusbPlayInfoResponse extends BaseResponse {
  input?: string;
  playback?: PlaybackStatus;
  repeat?: RepeatMode;
  shuffle?: ShuffleMode;
  repeat_available?: RepeatMode[];
  shuffle_available?: ShuffleMode[];
  play_time?: number;
  total_time?: number;
  artist?: string;
  album?: string;
  track?: string;
  albumart_url?: string;
  albumart_id?: number;
  usb_devicetype?: "msc" | "ipod" | "unknown";
  auto_stopped?: boolean;
  attribute?: number;
}

export interface ListItem {
  text: string;
  subtexts?: string[];
  thumbnail?: string;
  attribute: number;
  appearance?: string[];
}

export interface GetListInfoResponse extends BaseResponse {
  input?: string;
  menu_layer?: number;
  max_line?: number;
  index?: number;
  playing_index?: number;
  menu_name?: string;
  list_info?: ListItem[];
}

export interface RecentItem {
  input: string;
  text: string;
  albumart_url: string;
  play_count: number;
  attribute?: number;
}

export interface GetRecentInfoResponse extends BaseResponse {
  recent_info: RecentItem[];
}

export interface QobuzQualityItem {
  value: "hr_192_24" | "hr_96_24" | "cd_44_16" | "mp3_320";
  attribute: number;
}

export interface GetNetusbSettingsResponse extends BaseResponse {
  qobuz?: {
    quality: {
      value: string;
      value_list: QobuzQualityItem[];
    };
  };
}

export interface ServiceAccountItem {
  id: string;
  registered: boolean;
  login_status: string;
  username?: string;
  type?: "formal" | "trial" | "unpaid" | "expired";
  trial_time_left?: number;
}

export interface GetAccountStatusResponse extends BaseResponse {
  service_list: ServiceAccountItem[];
}

export interface GetPlayDescriptionResponse extends BaseResponse {
  description?: string;
}

// ─── CD ───────────────────────────────────────────────────────────────────────

export type CdRepeatMode = "off" | "one" | "all" | "folder" | "a-b";
export type CdShuffleMode = "off" | "on" | "folder" | "program";

export interface GetCdPlayInfoResponse extends BaseResponse {
  device_status?: "open" | "close" | "ready" | "not_ready";
  playback?: PlaybackStatus;
  repeat?: CdRepeatMode;
  shuffle?: CdShuffleMode;
  repeat_available?: CdRepeatMode[];
  shuffle_available?: CdShuffleMode[];
  play_time?: number;
  total_time?: number;
  disc_time?: number;
  track_number?: number;
  total_tracks?: number;
  artist?: string;
  album?: string;
  track?: string;
}

// ─── Clock ────────────────────────────────────────────────────────────────────

export interface AlarmPreset {
  type: string;
  num: number;
  netusb_info?: { input: string; text: string };
  tuner_info?: {
    band: TunerBand | "unknown";
    number: number;
    hd_program?: number;
  };
}

export interface AlarmDaySettings {
  enable: boolean;
  time: string;
  beep?: boolean;
  playback_type?: "resume" | "preset";
  resume?: { input: string };
  preset?: AlarmPreset;
  snooze?: boolean;
}

export interface GetClockSettingsResponse extends BaseResponse {
  auto_sync?: boolean;
  format?: "12h" | "24h";
  alarm?: {
    alarm_on: boolean;
    volume: number;
    fade_interval: number;
    fade_type: number;
    mode: string;
    repeat?: boolean;
    oneday?: AlarmDaySettings;
    sunday?: AlarmDaySettings;
    monday?: AlarmDaySettings;
    tuesday?: AlarmDaySettings;
    wednesday?: AlarmDaySettings;
    thursday?: AlarmDaySettings;
    friday?: AlarmDaySettings;
    saturday?: AlarmDaySettings;
  };
}

// ─── Events ───────────────────────────────────────────────────────────────────

export interface ZoneEventData {
  power?: PowerStatus;
  input?: string;
  volume?: number;
  mute?: boolean;
  status_updated?: boolean;
  signal_info_updated?: boolean;
}

export interface EventData {
  device_id?: string;
  system?: {
    bluetooth_info_updated?: boolean;
    bluetooth_device_list_updated?: boolean;
    func_status_updated?: boolean;
    name_text_updated?: boolean;
    location_info_updated?: boolean;
  };
  main?: ZoneEventData;
  zone2?: ZoneEventData;
  zone3?: ZoneEventData;
  zone4?: ZoneEventData;
  tuner?: {
    play_info_updated?: boolean;
    preset_info_updated?: boolean;
  };
  netusb?: {
    play_error?: number;
    multiple_play_errors?: number;
    play_message?: string;
    account_updated?: boolean;
    play_time?: number;
    preset_info_updated?: boolean;
    recent_info_updated?: boolean;
    preset_control?: {
      type: "store" | "clear" | "recall";
      num: number;
      result: "success" | "error" | "empty" | "not_found";
    };
    play_info_updated?: boolean;
    list_info_updated?: boolean;
  };
  cd?: {
    device_status?: "open" | "close" | "ready" | "not_ready";
    play_time?: number;
    play_info_updated?: boolean;
  };
  dist?: {
    dist_info_updated?: boolean;
  };
  clock?: {
    settings_updated?: boolean;
  };
}
