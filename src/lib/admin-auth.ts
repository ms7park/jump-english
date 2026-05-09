// Web Crypto API — works in both Edge Runtime (proxy) and Node.js (server actions)
const encoder = new TextEncoder();
const SECRET = process.env.ADMIN_SESSION_SECRET ?? "fallback-secret-change-me";

export const SESSION_COOKIE = "admin_session";

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function sign(value: string): Promise<string> {
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(username: string): Promise<string> {
  const sig = await sign(username);
  return `${username}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<string | null> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const username = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await sign(username);
  if (sig.length !== expected.length) return null;
  // Constant-time comparison to prevent timing attacks
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0 ? username : null;
}

