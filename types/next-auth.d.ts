declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
  }
}
