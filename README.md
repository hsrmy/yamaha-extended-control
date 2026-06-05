# Yamaha Extended Control Plugin for Stream Deck

A [Stream Deck](https://www.elgato.com/stream-deck) plugin that controls Yamaha AV receivers via the [Yamaha Extended Control (YXC) API](https://developer.yamaha.com/api/).

---

## Features

| Action | Description |
|--------|-------------|
| **Power** | Turn the device on, off, or toggle standby |
| **Volume** | Increase or decrease volume |
| **Mute** | Enable or disable mute |
| **Input** | Switch the input source |

All actions support multi-zone devices (main, zone2, zone3, …).

## Requirements

- Elgato Stream Deck software **6.9** or later
- macOS **12** or later / Windows **10** or later
- A Yamaha AV receiver with YXC (Extended Control) support on the local network

## Installation

```bash
git clone https://github.com/hsrmy/yamaha-extended-control.git
cd yamaha-extended-control
npm install
npm run build
```

Then double-click the generated `.streamDeckPlugin` file — Stream Deck software will install it automatically.

## Configuration

Open the **Global Settings** panel (plugin icon in the Stream Deck category) and enter:

| Field | Description | Default |
|-------|-------------|---------|
| IP Address | Local IP address of your Yamaha receiver | — |
| Port | HTTP port of the YXC API | `80` |

Each action button has its own settings for **Zone** and **Action** type, which are populated automatically from the device.

## Development

### Prerequisites

- Node.js 20
- Elgato Stream Deck CLI (`@elgato/cli`)

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

### Build & watch (auto-reloads plugin)

```bash
npm run watch
```

Rollup compiles TypeScript sources under `src/` and outputs to `xyz.emradc.yamaha-extended-control.sdPlugin/bin/`.

## Project Structure

```
src/
├── plugin.ts              # Entry point, registers all actions
├── actions/yxc/
│   ├── client.ts          # YXC HTTP client (endpoint, features, zones, inputs)
│   ├── power.ts           # Power action
│   ├── volume.ts          # Volume & Mute actions
│   └── input.ts           # Input action
├── libs/
│   ├── yxc.ts             # Shared helpers (getZones, getInputs)
│   └── common.ts          # Utility functions
├── types/                 # TypeScript type definitions
└── ui/                    # Property Inspector HTML/TS
```

## License

MIT

---

# Yamaha Extended Control プラグイン（Stream Deck用）

Yamaha AVアンプを [Yamaha Extended Control (YXC) API](https://developer.yamaha.com/api/) 経由で操作する [Stream Deck](https://www.elgato.com/stream-deck) プラグインです。

---

## 機能

| アクション | 説明 |
|-----------|------|
| **Power** | 電源のオン・オフ・トグル |
| **Volume** | 音量の上げ下げ |
| **Mute** | ミュートのオン・オフ |
| **Input** | 入力ソースの切り替え |

マルチゾーン対応（main、zone2、zone3 など）。

## 動作要件

- Elgato Stream Deck ソフトウェア **6.9** 以降
- macOS **12** 以降 / Windows **10** 以降
- ローカルネットワーク上にYXC対応のYamaha AVアンプ

## インストール

```bash
git clone https://github.com/hsrmy/yamaha-extended-control.git
cd yamaha-extended-control
npm install
npm run build
```

生成された `.streamDeckPlugin` ファイルをダブルクリックすると、Stream Deck ソフトウェアが自動的にインストールします。

## 設定

Stream Deckカテゴリのプラグインアイコンから **グローバル設定** を開き、以下を入力してください：

| 項目 | 説明 | デフォルト |
|------|------|-----------|
| IPアドレス | Yamaha アンプのローカル IP アドレス | — |
| ポート | YXC API の HTTP ポート | `80` |

各アクションボタンには **ゾーン** と **アクション種別** の個別設定があり、デバイスから自動取得されます。

## 開発

### 前提条件

- Node.js 20
- Elgato Stream Deck CLI（`@elgato/cli`）

### セットアップ

```bash
npm install
```

### ビルド

```bash
npm run build
```

### ウォッチビルド（プラグイン自動リロード）

```bash
npm run watch
```

Rollup が `src/` 以下の TypeScript をコンパイルし、`xyz.emradc.yamaha-extended-control.sdPlugin/bin/` へ出力します。

## プロジェクト構成

```
src/
├── plugin.ts              # エントリポイント、全アクションを登録
├── actions/yxc/
│   ├── client.ts          # YXC HTTPクライアント（エンドポイント、ゾーン、入力取得）
│   ├── power.ts           # 電源アクション
│   ├── volume.ts          # 音量・ミュートアクション
│   └── input.ts           # 入力切替アクション
├── libs/
│   ├── yxc.ts             # 共通ヘルパー（getZones、getInputs）
│   └── common.ts          # ユーティリティ関数
├── types/                 # TypeScript 型定義
└── ui/                    # プロパティインスペクター HTML/TS
```

## ライセンス

MIT
