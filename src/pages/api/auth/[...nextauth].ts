// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ account, profile }) {
      console.log('SignIn', { account, profile });
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token; // Garante que o accessToken seja adicionado ao token JWT
      }
      if (profile) {
        token.name = profile?.name;
        token.email = profile?.email;
        token.picture = (profile as any)?.picture;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Garante que o accessToken seja transferido do token JWT para a sessão
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      return session;
    },
  },
};

export default NextAuth(authOptions);