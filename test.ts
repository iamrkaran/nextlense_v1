// import type { NextAuthConfig } from 'next-auth';
// import 'next-auth/jwt';
// import { JWT } from 'next-auth/jwt';
// export const authConfig = {
//   pages: {
//     signIn: '/auth/login',
//   },
//   providers: [
//     // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
//     // while this file is also used in non-Node.js environments
//   ],
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//     // async jwt({ token, user, trigger, session, account }) {
//     //   if (trigger === 'update' && session?.user) {
//     //     token.accessToken = session.accessToken;
//     //     token.name = session.user.name;
//     //     console.log('trigger', trigger);
//     //     console.log('sessionTT', account);
//     //   }
//     //   if (user) {
//     //     token.user = user;
//     //   }
//     //   return token;
//     // },

//     // async session({ session, token }: { session: any; token: any }) {
//     //   if (token) {
//     //     session.user = token.user;
//     //   }
//     //   return session;
//     // },

//     jwt({ token, trigger, session, account }) {
//       if (trigger === 'update' && session?.user) {
//         token.accessToken = session.accessToken;
//         token.name = session.user.name;
//         token.firstName = session.user.firstName;
//         console.log('trigger', trigger);
//         console.log('sessionTT', session?.user);
//       }
//       console.log('token', token);
//       return token;
//     },
//     async session({
//       session,
//       token,
//       user,
//     }: {
//       session: any;
//       token: JWT;
//       user: any;
//     }) {
//       // if (token && user) {
//       //   // session.user.firstName = token.firstName as string | undefined;

//       //   console.log('ss1', session);
//       // }
//       // session.user = token.user;
//       if (token?.accessToken) {
//         session.accessToken = token.accessToken
//       }
//       session.user.image = 'hello.jpg';
//       session.user.name = token.name; 
//       session.user.firstName = token.firstName;
//       // session.user.email = user.email;
//       // session.user.lastName = user.lastName;
//       console.log('ss0', user);
//       console.log('ss9', token);
//       if (token && user) {
//         // session.user = token.user;
//         // session.user.name = user.firstName;
//       }
//       console.log('session', session);
//       return session;
//     },
//   },
// } satisfies NextAuthConfig;


// jwt({ token, trigger, session, account, user }) {
     
    //   if (trigger === 'update' && session?.user) {
    //     token.accessToken = session.accessToken;
    //     token.name = session.user.name ?? '';
    //     token.firstName = session.user.firstName;
    //     token.username = 'admin';
    //   }
    //   if (user) {
    //     token.user = user as User;
    //   }
    //   console.log('token.user', token.user);
    //   return token;
    // },
    // async session({ session, token }: { session: any; token: JWT }) {
    //   if (token?.accessToken) {
    //     session.accessToken = token.accessToken;
    //   }
    //   session.user.name = token.name;
    //   session.user.firstName = token.firstName;
    //   session.user.username = token.username;
    //   console.log('token.user', token.user);
    //   return session;
    // },