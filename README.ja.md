# Yamaha Extended Control プラグイン（Stream Deck用）

Yamaha AVアンプを [Yamaha Extended Control (YXC) API](https://developer.yamaha.com/api/) 経由で操作する [Stream Deck](https://www.elgato.com/stream-deck) プラグインです。

> English version: [README.md](README.md)

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
