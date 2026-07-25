# PowerChain AI (PWRC) Operating System

> Sovereign dePIN Renewable Energy Intelligence, Solana Pay Credit Settlement & Pyth Oracle Infrastructure

PowerChain AI operates as an enterprise-grade dePIN (Decentralized Physical Infrastructure Network) intelligence platform that coordinates clean energy grid telemetry, battery storage (BESS) dispatch, tokenized power credit clearing, and automated Google Workspace notification workflows.

---

## ⚡ Core Architecture & Version 1.2.0 Beta Upgrade Highlights

### 1. High-Visibility Notification & Telemetry Insight UI
- **Incoming Grid Email Notification**: High-contrast, dark red notification card styled with a crisp thin frame (`border border-red-500/60 shadow-2xl`) maintaining high legibility across both dark and light theme modes.
- **Dark Green Telemetry Insight Card**: Prominent thin-framed card summarizing live dePIN power output (420.5 MWh), sub-20ms Pyth latency (14.2ms), uptime (99.98%), and PWRC vault mint stats.
- **Dark AI & PWRC BETA Branding**: Sleek dark emblem branding with `PWRC BETA` status badges.

### 2. Grid & Solana/Sui RPCs (`/src/services/rpc.ts`)
- **Multi-Chain RPC Management**: Configurable cluster endpoints for Solana Mainnet-Beta, Pyth Hermes Oracle, Sui Network Mainnet, and Sovereign PowerChain RPCs.
- **Interactive Ping & Failover**: Real-time ping testing for latency benchmarking and primary cluster failover selection in `SettingsModal.tsx`.

### 3. System Logs & Clear Logs (`/src/services/logs.ts`)
- **Log Stream Engine**: Structured log entries across levels (`info`, `warn`, `error`, `telemetry`, `audit`).
- **Clear Logs Functionality**: Instant log reset capability in the Settings Modal audit log panel.

### 4. User Profiles & Role-Based Access Control (`/src/data/users.ts` & `/src/services/roles.ts`)
- **Demo Account Switcher**: Switch between *Sovereign Operator*, *Solana Treasury Vault Admin*, and *DePIN Protocol Architect*.
- **Role Permissions Engine**: Granular permission checks (`telemetry.read`, `bess.dispatch`, `pwrc.mint`, `workspace.gmail.digest`).

### 5. Multi-Model AI Providers & Brand Logos (`/src/components/information.tsx` & `/src/components/ai-provider-logos.tsx`)
- **Real Brand Logos**: High-fidelity SVG vector logos for Google Gemini, OpenAI, Anthropic Claude, DeepSeek-R1, Meta Llama 3.3, xAI Grok 3, and PowerChain AI.
- **Language Models Overview**: Specs for Gemini 3.5 Flash, Gemini 3.1 Pro Thinking, GPT-4o Omnimodal, Claude 3.5 Sonnet, DeepSeek-R1, Llama 3.3 70B, Grok 3, and PowerChain Domain-v2.

### 6. Telemetry Service (`/src/services/telemetry.ts`) & Global Search (`/src/services/search.ts`)
- **Telemetry Engine**: Query service for dePIN solar arrays, wind generation, hydro plants, and BESS storage banks.
- **Global Search Service**: Sub-millisecond keyword lookup across nodes, prompts, renewable assets, and AI models.

### 7. Search Icon Settings & Header Search Controls
- **Header Global Search Bar**: Search bar with `Search` icon and `⌘K` keyboard shortcut badge in `HeaderShell.tsx`.
- **Search & Shortcuts Modal Tab**: Customizable settings tab in `SettingsModal.tsx` for toggling search bar visibility, keyboard shortcuts, and default query scope filters.

### 8. REST API v1 Infrastructure (`/api/v1/`) & OpenAPI 3.0 (`swagger.yaml`)
- `GET /api/v1/health`: System health & service diagnostic status.
- `GET /api/v1/telemetry`: Granular dePIN node telemetry snapshot.
- `GET /api/v1/telemetry/nodes?id={nodeId}`: Hardware & sensor diagnostic for specific dePIN nodes.
- `GET /api/v1/search?q={query}`: Global search endpoint returning matching nodes, prompts, assets, and models.
- `GET /api/v1/credits`: User PWRC token balance, USD valuation, and MWh equivalent.
- `POST /api/v1/solana-pay/create`: Generates Solana Pay URL and reference key.
- `GET /api/v1/actions/settle-credit`: Solana Blinks / Actions specification.
- `GET /api/v1/pyth`: Real-time Pyth oracle price feeds (SOL/USD, PWRC/USD, ENERGY_MWH/USD).
- `swagger.yaml`: Complete OpenAPI 3.0 specification covering all REST endpoints.
- `ApiClient` (`/src/api/api.ts`): Type-safe frontend client SDK.

### 9. AI Agents & Skills Integration
- **Agents (`/src/utils/agents.ts`)**: Defines AI personas (Grid Telemetry Analyst, Treasury Manager).
- **Skills (`/src/utils/skills.ts`)**: Centralized skills registry covering telemetry integration, BESS dispatch, Solana settlement, and Gmail workspace digests.

### 10. Web Workers & Real-Time WebSockets (`/src/workers/ws.worker.ts`)
- **Off-Main-Thread WebSockets**: Real-time WebSocket connections and message parsing are handled via Web Workers to prevent main-thread UI blocking during high-frequency telemetry streaming.
- **Resilient Reconnection**: Built-in exponential backoff and keep-alive ping mechanisms running independently in the worker context.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server (Express + Vite on Port 3000)
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```
