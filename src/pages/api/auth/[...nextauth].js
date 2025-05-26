import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // Certifique-se de ter instalado esta biblioteca

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // A label para o formulário de login
      name: "Email e Senha",
      async authorize(credentials) {
        const { email, password } = credentials;

        // 1. Buscar o usuário no seu banco de dados pelo email
        // Aqui você precisará integrar com o seu sistema de banco de dados
        const user = await fetchUserFromDatabase(email);

        if (!user) {
          console('não foi dessa vez')
          return null; // Usuário não encontrado
        }

        // 2. Comparar a senha fornecida com o hash armazenado
        const passwordMatch = await bcrypt.compare(
          password,
          user.senha
        );

        if (passwordMatch) {
          // 3. Retornar o objeto do usuário se a senha corresponder
          return { id: user.id, email: user.email, name: user.nome, tipeAuth: "trad" }; // Adapte os campos do seu usuário
        } else {
          return null; // Senha incorreta
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      console.log('user----', user)
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.userId = user.id; // Adiciona o ID do usuário ao token
        token.name = user.name;
        token.email = user.email;
        token.tipeAuth = user.tipeAuth; // Adiciona o tipo de autenticação ao token
      
      }
      return token;
    },
    async session({ session, token }) {
      if(token.tipeAuth === "trad") {
        session.user = {
          id: token.userId, // Disponibiliza o ID do usuário na sessão
          name: token.name,
          email: token.email,
        }
        session.accessToken = token.accessToken;
      return session;
    }
    return {
      ...session,
      accessToken: token.accessToken,
      userId: token.userId, // Disponibiliza o ID do usuário na sessão
      expires: session.expires,
    };
    },
    async redirect({ url, baseUrl }) {
      if (url === "http://localhost:3000/presentes") {
        return url.startsWith(baseUrl) ? url : baseUrl;
      }
      return `${baseUrl}/sections`;
    },
  },
  pages: {
    signIn: "/login", // Página personalizada de login
  },
};

// Função de exemplo para buscar o usuário no banco de dados
async function fetchUserFromDatabase(email) {
  try {
    const response = await fetch(
      "https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile"
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar convidados");
    }

    const users = await response.json(); // ✅ pegar o JSON da resposta

    const user = users.find((item) => item.email === email);
    // console.log('user--------------', user)
    return user;
  } catch (error) {
    console.error("Erro ao buscar convidados:", error);
    return null;
  }


}

export default NextAuth(authOptions);
