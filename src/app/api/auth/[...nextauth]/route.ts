/* eslint-disable @typescript-eslint/naming-convention */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { UserResponse } from '@/types/api';

/**
 * Configuración de next-auth
 */
const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET, // Secreto para autentificación
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Función que se ejecuta al iniciar sesión
      async authorize(credentials) {
        try {
          // Llamada al backend para el login
          const res = await axios.post<UserResponse>(
            `${process.env.NEXT_PUBLIC_SERVER}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );

          const user = res.data;

          if (user && user.access_token) {
            return {
              id: user.id,
              email: user.email,
              access_token: user.access_token,
            };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user['access_token'];
      }
      return token;
    },
    session({ session, token }) {
      session['accessToken'] = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
