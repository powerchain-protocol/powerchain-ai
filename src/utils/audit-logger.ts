export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  category: 'session' | 'transaction' | 'ai_interaction' | 'security';
  details: string;
  status: 'success' | 'failure' | 'pending';
}

class AuditLogger {
  private logs: AuditEvent[] = [];

  constructor() {
    try {
      const stored = localStorage.getItem('powerchain_audit_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load audit logs', e);
    }
  }

  log(event: Omit<AuditEvent, 'id' | 'timestamp'>) {
    const newEvent: AuditEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    this.logs.unshift(newEvent);
    
    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(0, 100);
    }

    try {
      localStorage.setItem('powerchain_audit_logs', JSON.stringify(this.logs));
    } catch (e) {
      console.error('Failed to save audit logs', e);
    }
  }

  getLogs(): AuditEvent[] {
    return this.logs;
  }
  
  clearLogs() {
    this.logs = [];
    localStorage.removeItem('powerchain_audit_logs');
  }
}

export const auditLogger = new AuditLogger();
