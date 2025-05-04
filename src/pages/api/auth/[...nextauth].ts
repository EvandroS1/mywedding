import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions, Session, User, Account, Profile } from 'next-auth';
import type { JWT } from 'next-auth/jwt';


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile;
      user: User;
      credentials?: Record<string, unknown>;
    }) {
      console.log('SignIn', { account, profile });
      return true;
    },

    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile;
    }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
        token.picture = (profile).picture ?? (profile).image;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }) {
      session.accessToken = token.accessToken as string;
      session.user = {
        name: token.name,
        email: token.email,
        image: token.picture,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
