// types/next-auth.d.ts
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    expires: string; // <-- adicionado explicitamente
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
  }
}
