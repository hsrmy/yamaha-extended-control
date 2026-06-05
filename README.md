# Yamaha Extended Control Plugin for Stream Deck

A [Stream Deck](https://www.elgato.com/stream-deck) plugin that controls Yamaha AV receivers via the [Yamaha Extended Control (YXC) API](https://developer.yamaha.com/api/).

> 日本語版は [README.ja.md](README.ja.md) を参照してください。

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
