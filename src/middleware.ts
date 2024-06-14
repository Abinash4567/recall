// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'


// export function middleware(request: NextRequest) {
//     // console.log(`Check Middleware`);
//     const path = request.nextUrl.pathname;

//     const isPublicPath = path === '/';

//     // const token = request.cookies.get('__Secure-next-auth.session-token')?.value || ''   //deployment
//     const token = request.cookies.get('next-auth.session-token')?.value || ''   //local run

//     if (isPublicPath && token) {
//         return NextResponse.redirect(new URL('/', request.nextUrl))
//     }

//     if (!isPublicPath && !token) {
//         return NextResponse.redirect(new URL('/login', request.nextUrl))
//     }
// }

// export const config = { matcher: ['/playground/'] };



export { default } from "next-auth/middleware"

export const config = { matcher: ["/playground"] }