import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { queryOne } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

type AdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  role: "owner" | "developer";
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await queryOne<AdminUserRow>(
          `select id, email, password_hash, role from admin_users where email = $1`,
          [email]
        );
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return null;

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) token.role = (user as { role: string }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { role?: string }).role =
          token.role as string | undefined;
      }
      return session;
    },
  },
});