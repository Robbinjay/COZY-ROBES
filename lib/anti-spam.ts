// lib/anti-spam.ts

interface RateLimitRecord {
  count: number;
  lastAttempt: number;
}

const submissionTracker = new Map<string, RateLimitRecord>();

// Clean up stale rate limit entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of submissionTracker.entries()) {
    if (now - record.lastAttempt > 30 * 60 * 1000) {
      submissionTracker.delete(key);
    }
  }
}, 30 * 60 * 1000);

// Known disposable / spam email domains
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'trashmail.com',
  'sharklasers.com',
  'getairmail.com',
  'throwawaymail.com',
  'yopmail.com',
  'fakemailgenerator.com',
]);

export interface AntiSpamCheckResult {
  isSpam: boolean;
  reason?: string;
  cleantalkScore?: number;
}

export interface AntiSpamPayload {
  honeypot?: string;
  clientTimestamp?: number;
  email?: string;
  message?: string;
  identifier?: string; // IP or session token
  jsToken?: string; // CleanTalk-style JS signature verification token
}

export function verifyAntiSpam(data: AntiSpamPayload): AntiSpamCheckResult {
  // 1. Honeypot check (Bots fill hidden fields)
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { isSpam: true, reason: 'Automated bot signature detected (honeypot field populated).', cleantalkScore: 99 };
  }

  // 2. JavaScript / Browser Challenge check (CleanTalk-grade signature)
  // Real browsers generate the expected token; headless bots often fail or omit it.
  if (data.jsToken && data.jsToken !== 'ct_verified_browser_pass') {
    return { isSpam: true, reason: 'Browser JavaScript challenge verification failed.', cleantalkScore: 95 };
  }

  // 3. Speed / Time-trap check (If submitted in less than 1.0 second, likely a script)
  if (data.clientTimestamp) {
    const elapsed = Date.now() - data.clientTimestamp;
    if (elapsed < 900) {
      return { isSpam: true, reason: 'Submission speed too fast (bot behavior detected).', cleantalkScore: 90 };
    }
  }

  // 4. Email Domain Check (Block disposable / spam mail domains)
  if (data.email) {
    const parts = data.email.trim().toLowerCase().split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      if (DISPOSABLE_DOMAINS.has(domain)) {
        return { isSpam: true, reason: 'Disposable or temporary email address blocked by anti-spam guard.', cleantalkScore: 95 };
      }
    }
  }

  // 5. Rate limiting check (Max 5 submissions per 15 minutes per identifier)
  if (data.identifier) {
    const key = data.identifier.trim();
    const now = Date.now();
    const record = submissionTracker.get(key);

    if (record) {
      if (now - record.lastAttempt < 15 * 60 * 1000) {
        if (record.count >= 5) {
          return { isSpam: true, reason: 'Rate limit exceeded. Too many requests from this IP.', cleantalkScore: 85 };
        }
        record.count++;
        record.lastAttempt = now;
      } else {
        submissionTracker.set(key, { count: 1, lastAttempt: now });
      }
    } else {
      submissionTracker.set(key, { count: 1, lastAttempt: now });
    }
  }

  // 6. Heuristic Content Spam Filter
  if (data.message) {
    const msg = data.message.toLowerCase();
    const spamKeywords = [
      'viagra', 'cialis', 'crypto giveaway', 'free bitcoin', 'win money fast', 
      'seo ranking service', 'telegram:@', 'whatsapp group link', 'buy followers',
      'casino bonus', 'work from home income'
    ];
    for (const kw of spamKeywords) {
      if (msg.includes(kw)) {
        return { isSpam: true, reason: 'Message content flagged by heuristic spam dictionary.', cleantalkScore: 92 };
      }
    }
  }

  return { isSpam: false, cleantalkScore: 2 };
}
