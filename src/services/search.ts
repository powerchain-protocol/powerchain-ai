import { TelemetryService, TelemetryNodeMetric } from './telemetry';
import { SYSTEM_PROMPT_LIBRARY } from '../data/prompt-library';
import { RENEWABLE_ASSETS, RenewableAsset } from '../data/renewables';
import { AI_PROVIDERS_LIST, AIProviderInfo } from '../components/information';

export interface SearchResultItem {
  id: string;
  category: 'node' | 'prompt' | 'asset' | 'model' | 'action';
  title: string;
  subtitle: string;
  badge?: string;
  metadata?: Record<string, any>;
}

export class GlobalSearchService {
  public static queryAll(query: string): SearchResultItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // 1. Telemetry Nodes
    const nodes = TelemetryService.searchTelemetry(q);
    nodes.forEach((node: TelemetryNodeMetric) => {
      results.push({
        id: node.nodeId,
        category: 'node',
        title: node.nodeName,
        subtitle: `${node.powerMW} MW • ${node.region} • ${node.latencyMs}ms Latency`,
        badge: node.status.toUpperCase(),
        metadata: { nodeId: node.nodeId, powerMW: node.powerMW },
      });
    });

    // 2. Saved Prompts & AI Workflows
    SYSTEM_PROMPT_LIBRARY.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.promptText.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({
          id: p.id,
          category: 'prompt',
          title: p.title,
          subtitle: p.promptText,
          badge: p.category.toUpperCase(),
          metadata: { promptText: p.promptText },
        });
      }
    });

    // 3. Renewable Assets
    RENEWABLE_ASSETS.forEach((asset: RenewableAsset) => {
      if (
        asset.name.toLowerCase().includes(q) ||
        asset.type.toLowerCase().includes(q) ||
        asset.location.toLowerCase().includes(q)
      ) {
        results.push({
          id: asset.id,
          category: 'asset',
          title: asset.name,
          subtitle: `${asset.capacityMW} MW • ${asset.location} • Efficiency: ${asset.efficiencyPercent}%`,
          badge: asset.type.toUpperCase(),
          metadata: { assetId: asset.id },
        });
      }
    });

    // 4. AI Providers & Models
    AI_PROVIDERS_LIST.forEach((prov: AIProviderInfo) => {
      if (
        prov.primaryModel.toLowerCase().includes(q) ||
        prov.providerName.toLowerCase().includes(q) ||
        prov.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: prov.id,
          category: 'model',
          title: prov.primaryModel,
          subtitle: `${prov.providerName} • ${prov.contextWindow}`,
          badge: prov.badge,
          metadata: { modelName: prov.primaryModel },
        });
      }
    });

    return results.slice(0, 10);
  }
}
