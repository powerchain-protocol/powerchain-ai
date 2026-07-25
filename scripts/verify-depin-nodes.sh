#!/usr/bin/env bash
# PowerChain AI dePIN Node Diagnostics Verification Script

echo "================================================="
echo "  PowerChain AI dePIN Grid Telemetry Health Check"
echo "================================================="

echo "[1/4] Checking REST API v1 Health (/api/v1/health)..."
curl -s http://localhost:3000/api/v1/health | jq . || echo "Failed to ping health endpoint"

echo "[2/4] Checking Pyth Oracle Feed Prices (/api/v1/pyth)..."
curl -s http://localhost:3000/api/v1/pyth | jq . || echo "Failed to fetch Pyth price feeds"

echo "[3/4] Checking DePIN Telemetry Snapshot (/api/v1/telemetry)..."
curl -s http://localhost:3000/api/v1/telemetry | jq . || echo "Failed to fetch telemetry snapshot"

echo "[4/4] Verification complete."
