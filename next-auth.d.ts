import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      name?: string | unknown;
      email?: string | unknown;
      image?: string | unknown;
    } & DefaultSession['user'];
  }
}