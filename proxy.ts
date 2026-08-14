import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/adminAuth';

async function isAuthed(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const secret = process.env.SESSION_SECRET;
  if (!token || !secret) return false;
  return verifySessionToken(token, secret);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // ── Protect the admin dashboard page itself ──
  if (pathname.startsWith('/admin/dashboard')) {
    if (!(await isAuthed(req))) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  // ── Protect admin-only API operations ──
  // Reads (listing all donations/notifications) and admin mutations
  // (approve/reject/delete, mark-as-read) require a valid session.
  // POST /api/donations and POST /api/notifications stay public — they're
  // used by the public donation form to submit a new donation/notification.
  const isDonationsList = pathname === '/api/donations' && method === 'GET';
  const isDonationsMutate =
    pathname.startsWith('/api/donations/') && (method === 'PATCH' || method === 'DELETE');
  const isNotificationsList = pathname === '/api/notifications' && method === 'GET';
  const isNotificationsMutate =
    pathname.startsWith('/api/notifications/') && method === 'PATCH';

  if (isDonationsList || isDonationsMutate || isNotificationsList || isNotificationsMutate) {
    if (!(await isAuthed(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/api/donations',
    '/api/donations/:path*',
    '/api/notifications',
    '/api/notifications/:path*',
  ],
};