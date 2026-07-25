import { GmailMessageSummary } from '../services/gmail';
import { ChatMessage, KPIMetric } from '../types';

export interface ParsedEmailSummary {
  message: ChatMessage;
  summaryText: string;
  keyPoints: string[];
  actionItems: string[];
  operationalImpact: string;
}

/**
 * Converts a raw Gmail message summary into a structured PowerAI ChatMessage object using LLM-based summarization.
 */
export async function summarizeEmailThreadWithLLM(
  email: GmailMessageSummary,
  agentId = 'analyst',
  settings?: any
): Promise<ChatMessage> {
  const prompt = `Analyze and summarize the following energy grid operations email thread. Convert the email into a structured enterprise grid briefing.
  
Subject: ${email.subject}
From: ${email.from}
Date: ${email.date}
Snippet/Body: ${email.snippet}

Provide:
1. Executive Summary
2. Key Grid & Performance Impacts
3. Recommended Action Items`;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        agentId,
        settings,
      }),
    });

    let aiText = '';
    let responseKpis: KPIMetric[] | undefined;

    if (response.ok) {
      const data = await response.json();
      aiText = data.text || '';
      if (data.kpis && data.kpis.length > 0) {
        responseKpis = data.kpis;
      }
    } else {
      aiText = `### 📧 Email Thread Briefing: ${email.subject}\n\n**Sender:** ${email.from}\n**Date:** ${email.date}\n\n**Summary:** ${email.snippet}\n\n**Grid Analysis:** Incoming communication processed via Gmail OAuth2 integration. Metric adjustments recommended based on reported settlement or telemetry update.`;
    }

    const defaultKpis: KPIMetric[] = responseKpis || [
      { label: 'Sender', value: email.from.split('<')[0].trim() || 'Grid System' },
      { label: 'Thread Status', value: 'Summarized via LLM' },
      { label: 'Source', value: 'Google Workspace Gmail' },
    ];

    const message: ChatMessage = {
      id: `email-summary-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender: 'assistant',
      text: aiText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calloutText: `📧 Gmail Thread Summarized: "${email.subject}"`,
      kpis: defaultKpis,
      actions: [
        `Draft Reply to ${email.from.split('<')[0].trim()}`,
        'Sync Telemetry to Digital Twin',
        'Download Settlement Log',
      ],
      sources: [`Gmail Message ID: ${email.id}`, `From: ${email.from}`],
      agentId,
      attachments: [
        {
          name: `${email.subject.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.eml`,
          size: '14.2 KB',
          type: 'message/rfc822',
        },
      ],
    };

    return message;
  } catch (error: any) {
    console.error('Failed to summarize email via LLM:', error);

    return {
      id: `email-summary-fallback-${Date.now()}`,
      sender: 'assistant',
      text: `### 📧 Email Summary: ${email.subject}\n\n**From:** ${email.from}\n**Date:** ${email.date}\n\n**Body Snippet:**\n> ${email.snippet}\n\n**Action Recommended:** Verify grid telemetry and confirm settlement credits on-chain.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calloutText: `📧 Email Notification Processed`,
      actions: [`Draft Reply to ${email.from}`, 'Dismiss'],
      sources: [`Gmail ID: ${email.id}`],
      agentId,
    };
  }
}

/**
 * Pure helper utility to construct a PowerAI message directly from raw email data.
 */
export function convertEmailToPowerAIMessage(
  email: GmailMessageSummary,
  summaryText: string
): ChatMessage {
  return {
    id: `email-msg-${email.id}`,
    sender: 'assistant',
    text: summaryText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    calloutText: `📧 Incoming Energy Email: ${email.subject}`,
    sources: [`Gmail: ${email.from}`],
    actions: ['Draft Reply in Gmail', 'Summarize with LLM'],
  };
}
