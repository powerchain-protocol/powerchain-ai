# PowerChain AI Operating System (PowerChain OS)

> **Tokenized Grid Intelligence & Sovereign AI Infrastructure for Energy Networks**

PowerChain AI OS is an enterprise-grade, tokenized operations intelligence platform designed for smart grid operators, renewable energy assets, carbon offset registries, and battery energy storage systems (BESS).

---

## ⚡ Key Architecture & Features

### 1. Tokenized Chat Engine (PWRC)
- **Tokenized Billing**: Every AI prompt consumes **PowerChain Tokens (PWRC)** (e.g., 10 PWRC per standard telemetry query).
- **Bring Your Own AI API Key (BYOAI)**: Users can supply their own API keys (Google Gemini, OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, or Ollama Local) to bypass PWRC query deductions.
- **Credit Top-Up System**: Integrated PWRC refill modal with embedded wallet support.

### 2. Multi-Model AI Provider Suite (`/ai/providers.tsx`)
- **Google Gemini 1.5 Pro / Flash**: Multimodal SCADA and grid telemetry analysis.
- **Anthropic Claude 3.5 Sonnet**: Legal PPA contract compliance and settlement verification.
- **OpenAI GPT-4o**: Carbon credit auditing and structured vision extraction.
- **Ollama Local (Llama-3.3 70B)**: 100% air-gapped offline edge node execution.
- **LoRA Fine-Tune v1.4**: Custom Low-Rank Adaptation trained on 2M renewable power plant telemetry records.

### 3. Solana & Sui Multi-Chain Integration
- **Pyth Oracle (`/ai/solana/pyth.tsx`)**: Real-time KWH/USD & MWH/USD price feeds with confidence intervals.
- **Helius DAS Nodes (`/ai/solana/helius.tsx`)**: High-throughput sub-station RPC nodes.
- **Jupiter & Raydium (`/ai/solana/jupiter.tsx`, `raydium.tsx`)**: Automated liquidity swaps for tokenized energy assets.
- **Sui Cetus Protocol (`/sui/cetus.tsx`)**: Sui Network CLMM carbon credit pools.

### 4. MPC Embedded Wallet Framework
- **Seedless Security**: 2-of-3 threshold signature scheme.
- **Instant Transfers**: Transfer PWRC tokens across PowerChain L2, Solana, and Sui.

### 5. Enterprise Command Palette (`Cmd + K`)
- Keyboard-accessible global modal to trigger workflows, switch specialist agents, run forecasts, and toggle compact sidebar modes.

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Build for production CommonJS bundle
npm run build
```

---

## 🔒 Security & Privacy

All API keys supplied via BYOAI mode are encrypted in local storage memory and proxied via server-side endpoints to keep credentials completely private.
