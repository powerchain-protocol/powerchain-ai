// Rate limiting memory store for PowerChain API requests
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
}

export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetInMs: number } {
  const windowMs = options.windowMs || 60000; // 1 minute window
  const maxRequests = options.maxRequests || 120; // 120 reqs/min

  const now = Date.now();
  const userRecord = requestCounts.get(ip);

  if (!userRecord || now > userRecord.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetInMs: windowMs };
  }

  if (userRecord.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: Math.max(0, userRecord.resetTime - now),
    };
  }

  userRecord.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - userRecord.count,
    resetInMs: Math.max(0, userRecord.resetTime - now),
  };
}
