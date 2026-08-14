import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/adminAuth';

// POST /api/admin/login — verifies credentials server-side and issues
// a signed, httpOnly session cookie. The password never ships to the browser.
export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { username, password } = body;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.SESSION_SECRET;

  if (!validUsername || !validPassword || !secret) {
    console.error(
      '[admin/login] Missing ADMIN_USERNAME, ADMIN_PASSWORD, or SESSION_SECRET env vars'
    );
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  if (username !== validUsername || password !== validPassword) {
    // Generic message on purpose — don't reveal whether username or password was wrong
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const token = await createSessionToken(secret);

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true, // Not readable by client-side JS — closes the sessionStorage bypass
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}