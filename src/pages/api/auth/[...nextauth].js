import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        expires: session.expires,
      };
    },
    async redirect({ url, baseUrl }) {
      console.log('url------------', url)
      console.log('baseUrl------------', baseUrl)
      // Verifica se o URL de redirecionamento é fornecido
      if (url === 'http://localhost:3000/presentes') {
        return url.startsWith(baseUrl) ? url : baseUrl; // Garante que o redirecionamento seja dentro da baseUrl
      }
  
      // Redireciona para /sections após login
      return `${baseUrl}/sections`;
    },
  },
};

export default NextAuth(authOptions);
