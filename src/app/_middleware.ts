// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function checkLoginMiddleware(request: NextRequest) {
//   // Get the `isLogin` field from localStorage.
//   const isLogin = localStorage.getItem('isLogin');

//   // If the user is logged in, redirect them to the home page.
//   if (isLogin && isLogin === 'true') {
//     return NextResponse.redirect('dashboard');
//   }

//   // If the user is not logged in, redirect them to the login page.
//   return NextResponse.redirect('login');
// }