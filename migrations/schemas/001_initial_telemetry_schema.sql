-- PowerChain Grid AI Operating System Database Schema
-- Version: 1.2.0-powerchain

CREATE TABLE IF NOT EXISTS depin_nodes (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    node_type VARCHAR(32) NOT NULL, -- 'solar', 'wind', 'hydro', 'bess'
    capacity_mw NUMERIC(10, 2) NOT NULL,
    location VARCHAR(128) NOT NULL,
    solana_wallet_address VARCHAR(64) UNIQUE NOT NULL,
    status VARCHAR(32) DEFAULT 'optimal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS node_telemetry (
    id BIGSERIAL PRIMARY KEY,
    node_id VARCHAR(64) REFERENCES depin_nodes(id) ON DELETE CASCADE,
    power_output_mw NUMERIC(10, 2) NOT NULL,
    grid_frequency_hz NUMERIC(5, 2) DEFAULT 60.00,
    uptime_percent NUMERIC(5, 2) NOT NULL,
    latency_ms NUMERIC(6, 2) NOT NULL,
    pyth_price_feed VARCHAR(128),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS power_credit_settlements (
    id VARCHAR(64) PRIMARY KEY,
    solana_signature VARCHAR(128) UNIQUE NOT NULL,
    recipient_wallet VARCHAR(64) NOT NULL,
    pwrc_amount NUMERIC(18, 9) NOT NULL,
    mwh_equivalent NUMERIC(10, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'confirmed',
    settled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_telemetry_recorded_at ON node_telemetry(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_settlements_wallet ON power_credit_settlements(recipient_wallet);
