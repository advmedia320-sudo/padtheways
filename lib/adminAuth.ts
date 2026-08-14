// Server-only helpers for signing/verifying the admin session cookie.
// Uses Web Crypto (crypto.subtle) so it works in both the Edge middleware
// runtime and normal Node API routes without extra dependencies.

const encoder = new TextEncoder();

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export const ADMIN_SESSION_COOKIE = 'admin_session';

const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours
export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_MS / 1000;

/**
 * Creates a signed session token: `${timestamp}.${hmacSignature}`.
 * The signature proves the token was issued by our server (using SESSION_SECRET)
 * and wasn't just fabricated by a client (e.g. via sessionStorage/devtools).
 */
export async function createSessionToken(secret: string): Promise<string> {
  const timestamp = Date.now().toString();
  const key = await getKey(secret);
  const sigBuf = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp));
  const signature = bufToHex(sigBuf);
  return `${timestamp}.${signature}`;
}

/**
 * Verifies a session token's signature and checks it hasn't expired.
 */
export async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  const [timestamp, signature] = token.split('.');
  if (!timestamp || !signature) return false;

  const age = Date.now() - Number(timestamp);
  if (!Number.isFinite(age) || age < 0 || age > SESSION_MAX_AGE_MS) return false;

  const key = await getKey(secret);
  const sigBuf = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp));
  const expectedSignature = bufToHex(sigBuf);

  if (expectedSignature.length !== signature.length) return false;

  // Constant-time comparison to avoid leaking info via timing
  let mismatch = 0;
  for (let i = 0; i < expectedSignature.length; i++) {
    mismatch |= expectedSignature.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}