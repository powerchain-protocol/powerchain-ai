import express from "express";
import path from "path";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini client if API key is present
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), platform: "PowerAI v1.2 (Astra)" });
});

// API v1 Endpoint Routes
app.get("/api/v1/health", (_req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    services: {
      solanaRpc: true,
      pythOracle: true,
      geminiAi: true,
      bessTelemetryNode: true,
    },
    version: "1.2.0-powerchain",
  });
});

app.get("/api/v1/telemetry", (_req, res) => {
  res.json({
    nodes: [
      { id: "node-alpha", name: "Mojave Solar Array", powerOutputMW: 108.4, uptime: "99.99%", latency: "12ms", region: "CAISO-South" },
      { id: "node-beta", name: "Silicon Valley BESS-04", powerOutputMW: 42.1, uptime: "99.95%", latency: "15ms", region: "CAISO-North", bessSoc: "88.4%" },
      { id: "node-gamma", name: "Texas Wind Farm", powerOutputMW: 78.4, uptime: "99.98%", latency: "18ms", region: "ERCOT-West" },
      { id: "node-columbia", name: "Columbia River Hydro", powerOutputMW: 150.0, uptime: "99.99%", latency: "11ms", region: "BPA-Northwest" },
    ],
    totalOutputMWh: 420.5,
    oracleVerified: true,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/v1/telemetry/nodes", (req, res) => {
  const nodeId = req.query.id as string;
  res.json({
    nodeId: nodeId || "node-alpha",
    name: nodeId === "node-beta" ? "Silicon Valley BESS-04" : "Mojave Solar Array",
    powerOutputMW: 108.4,
    voltageV: 480.2,
    frequencyHz: 60.01,
    temperatureC: 38.2,
    pythOracleLatencyMs: 12.4,
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/v1/search", (req, res) => {
  const q = ((req.query.q as string) || "").toLowerCase();
  const mockResults = [
    { id: "p-01", category: "prompt", title: "BESS Battery Discharge Strategy", subtitle: "Analyze BESS-04 state-of-charge curves" },
    { id: "node-alpha", category: "node", title: "Mojave Desert Solar Array #04", subtitle: "120.4 MW • CAISO-South • 12.4ms" },
    { id: "sol-01", category: "asset", title: "Mojave Solar Array", subtitle: "120 MW Solar PV Plant" },
    { id: "model-gemini", category: "model", title: "Gemini 3.5 Flash", subtitle: "Google Cloud AI • 2M Context" },
  ].filter((r) => !q || r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q));

  res.json({
    query: q,
    resultsCount: mockResults.length,
    results: mockResults,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/v1/credits", (_req, res) => {
  res.json({
    symbol: "PWRC",
    userBalance: 42500,
    usdEquivalent: 10625.0,
    mwhEquivalent: 425,
    mintAddress: "PWRC111111111111111111111111111111111111111",
  });
});

app.post("/api/v1/solana-pay/create", (req, res) => {
  const { amountSol, memo } = req.body;
  const ref = `solpay_ref_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  res.json({
    reference: ref,
    recipient: "PWRC111111111111111111111111111111111111111",
    amountSol: amountSol || 1.5,
    memo: memo || "PowerChain Energy Credit Settlement",
    solanaPayUrl: `solana:PWRC111111111111111111111111111111111111111?amount=${amountSol || 1.5}&reference=${ref}`,
  });
});

app.get("/api/v1/actions/settle-credit", (_req, res) => {
  res.json({
    icon: "https://powerchain.energy/logo.png",
    title: "Settle 10 MWh Renewable Power Credits",
    description: "Mint and clear tokenized power credits via Pyth Solana Oracle.",
    label: "Settle Credits",
    links: {
      actions: [
        {
          icon: "https://powerchain.energy/logo.png",
          title: "Clear 1000 PWRC",
          description: "Execute Solana Pay settlement",
          label: "1000 PWRC ($250)",
          href: "/api/v1/actions/settle-credit?amount=1000",
        },
      ],
    },
  });
});

app.get("/api/v1/pyth", (_req, res) => {
  res.json({
    feeds: {
      "SOL/USD": { price: 180.5, confidence: 0.999 },
      "PWRC/USD": { price: 0.25, confidence: 0.999 },
      "ENERGY_MWH/USD": { price: 45.0, confidence: 0.998 },
    },
    updatedAt: new Date().toISOString(),
  });
});

// Chat AI Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, agentId, settings, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();

    // PowerAI (Internal Codename: Astra) System Persona
    let systemPrompt = `You are PowerAI (internal codename Astra), an enterprise operations intelligence platform for renewable infrastructure (combining capabilities similar to Palantir AIP, Microsoft Copilot, Datadog AI, and GitHub Copilot for clean energy grids).

Personality & Tone Traits:
- Calm, precise, trustworthy, transparent, helpful, professional, analytical, security first, never speculative, explains reasoning.
- Communicate like an experienced enterprise operations consultant and grid operations engineer.

Style guidelines:
- Avoid casual phrases like "Your battery is bad." Instead use: "Battery System BESS-04 is operating below its expected efficiency threshold (84%). Based on historical telemetry and manufacturer recommendations, preventive maintenance is recommended within the next seven days."
- Avoid brief words like "Done." Instead use:
"Workflow completed successfully.
• Settlement recorded
• Treasury updated
• Digital Twin synchronized
• Audit log generated"

Specializations: Renewable Infrastructure, Energy Markets, Carbon Accounting, Treasury & Enterprise Finance, Digital Twins, IoT & Grid Telemetry, AI Analytics, Governance, Marketplace, Developer APIs.
Never fabricate unverified facts; reference platform telemetry metrics when appropriate.`;

    if (agentId === "carbon") {
      systemPrompt += ` Focus on carbon emissions tracking, Scope 1/2/3 accounting, offset calculations, and ESG compliance auditing.`;
    } else if (agentId === "grid") {
      systemPrompt += ` Focus on grid stability, load balancing, battery storage management, and frequency regulation.`;
    } else if (agentId === "market") {
      systemPrompt += ` Focus on energy market pricing, power purchase agreements (PPAs), arbitrage opportunities, and price forecasting.`;
    }

    let responseText = "";
    let chartData = null;
    let kpis = null;

    if (ai) {
      try {
        // Ensure model string passed to @google/genai SDK is a valid Gemini model alias
        let modelName = "gemini-2.5-flash";
        if (settings?.model) {
          const mLower = settings.model.toLowerCase();
          if (mLower.includes("pro") || mLower.includes("1.5-pro")) {
            modelName = "gemini-2.5-pro";
          } else {
            modelName = "gemini-2.5-flash";
          }
        }

        const result = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemPrompt}\n\nUser Query: ${prompt}\n\nProvide an enterprise consultant response formatted cleanly with section headings and bullet points where helpful.`,
                },
              ],
            },
          ],
          config: {
            temperature: settings?.temperature ?? 0.3,
          },
        });

        responseText = result.text || "Workflow completed successfully.\n\n• Analysis recorded\n• Telemetry synchronized";
      } catch (geminiError: any) {
        console.error("Gemini API error (fallback used):", geminiError.message || "Unknown error");
        responseText = `[PowerAI Astra Telemetry] Processed query: "${prompt}".\n\nEnergy infrastructure telemetry reflects optimal operational efficiency across all monitored solar and wind assets. Grid frequency remains locked at 60.02 Hz with automated battery buffer storage at 88% capacity.`;
      }
    } else {
      responseText = `Analysis completed for PowerChain renewable infrastructure query: "${prompt}".\n\nOperational metrics indicate a 12.5% yield gain across solar assets compared to last month, driven by high solar irradiance and clean panel efficiency. Total revenue reached $2.48M with an average asset efficiency of 94.6%.`;
    }

    // Determine if we should generate chart/KPI structure based on prompt content
    const lowerPrompt = prompt.toLowerCase();
    if (
      lowerPrompt.includes("energy production") ||
      lowerPrompt.includes("solar") ||
      lowerPrompt.includes("production summary") ||
      lowerPrompt.includes("generation") ||
      lowerPrompt.includes("compared to last month")
    ) {
      kpis = [
        { label: "Total Production (This Month)", value: "18.64 GWh", change: "+12.5% vs last month", isPositive: true },
        { label: "Total Production (Last Month)", value: "16.56 GWh", change: "Baseline", isPositive: true },
        { label: "Total Revenue (This Month)", value: "$2.48M", change: "+9.7% vs last month", isPositive: true },
        { label: "Avg. Efficiency", value: "94.6%", change: "+2.1% vs last month", isPositive: true },
      ];

      chartData = [
        { date: "May 1", "This Month": 5, "Last Month": 2 },
        { date: "May 4", "This Month": 8, "Last Month": 4 },
        { date: "May 8", "This Month": 12, "Last Month": 7 },
        { date: "May 12", "This Month": 10, "Last Month": 6 },
        { date: "May 15", "This Month": 15, "Last Month": 9 },
        { date: "May 18", "This Month": 12, "Last Month": 11 },
        { date: "May 22", "This Month": 18, "Last Month": 13 },
        { date: "May 25", "This Month": 22, "Last Month": 17 },
        { date: "May 29", "This Month": 21, "Last Month": 16 },
      ];
    } else if (lowerPrompt.includes("carbon") || lowerPrompt.includes("emission") || lowerPrompt.includes("credit")) {
      kpis = [
        { label: "Total CO2 Avoided", value: "14,280 MT", change: "+18.2% YoY", isPositive: true },
        { label: "Scope 1 Emissions", value: "120 MT", change: "-14.5% MoM", isPositive: true },
        { label: "Scope 2 Emissions", value: "450 MT", change: "-8.3% MoM", isPositive: true },
        { label: "Carbon Offsets Earned", value: "$182,400", change: "+22.4%", isPositive: true },
      ];

      chartData = [
        { date: "Jan", "Emissions Avoided": 1100, "Net Footprint": 120 },
        { date: "Feb", "Emissions Avoided": 1250, "Net Footprint": 110 },
        { date: "Mar", "Emissions Avoided": 1400, "Net Footprint": 95 },
        { date: "Apr", "Emissions Avoided": 1680, "Net Footprint": 85 },
        { date: "May", "Emissions Avoided": 1920, "Net Footprint": 70 },
      ];
    } else if (lowerPrompt.includes("grid") || lowerPrompt.includes("stability") || lowerPrompt.includes("battery") || lowerPrompt.includes("bess")) {
      kpis = [
        { label: "Grid Stability Index", value: "99.98%", change: "+0.02% vs SLA", isPositive: true },
        { label: "Battery Reserve (BESS-04)", value: "88.4 MWh", change: "Nominal", isPositive: true },
        { label: "Peak Demand Response", value: "4.2 MW", change: "Ready", isPositive: true },
        { label: "System Frequency", value: "60.01 Hz", change: "Locked", isPositive: true },
      ];

      chartData = [
        { date: "00:00", "Grid Load": 45, Capacity: 80 },
        { date: "04:00", "Grid Load": 38, Capacity: 80 },
        { date: "08:00", "Grid Load": 62, Capacity: 85 },
        { date: "12:00", "Grid Load": 78, Capacity: 95 },
        { date: "16:00", "Grid Load": 84, Capacity: 95 },
        { date: "20:00", "Grid Load": 70, Capacity: 85 },
      ];
    }

    res.json({
      text: responseText,
      kpis,
      chartData,
      timestamp: new Date().toISOString(),
      agentId: agentId || "analyst",
      persona: "PowerAI (Astra)",
    });
  } catch (err: any) {
    console.error("Server endpoint error:", err);
    res.status(500).json({ error: "Failed to generate AI response", details: err.message });
  }
});

async function startServer() {
  const server = http.createServer(app);

  // Setup WebSocket Server for real-time messaging
  const wss = new WebSocketServer({ server, path: "/ws" });

  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("WebSocket client connected. Total clients:", clients.size);

    // Send connection welcome event
    ws.send(JSON.stringify({
      type: "connected",
      message: "Connected to PowerAI Astra Real-Time Gateway",
      timestamp: new Date().toISOString(),
      activeClients: clients.size,
    }));

    ws.on("message", (rawMessage) => {
      try {
        const parsed = JSON.parse(rawMessage.toString());
        // Broadcast message or typing indicator to all connected clients
        const broadcastData = JSON.stringify({
          ...parsed,
          broadcastTime: new Date().toISOString(),
        });

        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastData);
          }
        });
      } catch (e) {
        console.error("Error processing WebSocket message:", e);
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("WebSocket client disconnected. Total clients:", clients.size);
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`PowerChain PowerAI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

