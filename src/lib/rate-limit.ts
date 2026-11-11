import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

let upstash: Ratelimit | null | undefined;

function getUpstash(): Ratelimit | null {
  if (upstash !== undefined) return upstash;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  upstash =
    url && token
      ? new Ratelimit({
          redis: new Redis({ url, token }),
          limiter: Ratelimit.slidingWindow(LIMIT, "10 m"),
          prefix: "contact",
          analytics: false,
        })
      : null;
  return upstash;
}

// Repli en mémoire (par instance serverless) quand Upstash n'est pas configuré.
const memory = new Map<string, number[]>();

function memoryLimit(key: string): boolean {
  const now = Date.now();
  const hits = (memory.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= LIMIT) {
    memory.set(key, hits);
    return false;
  }
  hits.push(now);
  memory.set(key, hits);
  if (memory.size > 5000) {
    for (const [k, v] of memory) if (v.every((time) => now - time >= WINDOW_MS)) memory.delete(k);
  }
  return true;
}

/** true = autorisé, false = limite atteinte. */
export async function allowRequest(key: string): Promise<boolean> {
  const limiter = getUpstash();
  if (limiter) {
    try {
      const { success } = await limiter.limit(key);
      return success;
    } catch {
      return memoryLimit(key);
    }
  }
  return memoryLimit(key);
}
