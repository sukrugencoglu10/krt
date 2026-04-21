import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/admin')) {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader) {
      return new NextResponse('Korumalı Yönetim Paneli', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Karatay Medya Admin Area"',
        },
      });
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    const expectedPass = process.env.ADMIN_PASSWORD || 'admin';
    const expectedUser = 'admin';

    if (user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    } else {
      return new NextResponse('Yetkisiz Giriş', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Karatay Medya Admin Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
