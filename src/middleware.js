import { NextResponse } from 'next/server';

export function middleware(request) {
  // API rotaları için body size kontrolü
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Headers'a body size limit ekle
    const response = NextResponse.next();
    response.headers.set('content-length-limit', '26214400'); // 25MB
    return response;
  }
}

export const config = {
  matcher: '/api/:path*'
};
