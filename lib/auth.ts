import { NextAuthOptions } from 'next-auth'
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    })
  ],
  // Prismaとの連携
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async session({ session, token}) {
      if(token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session;
    }
  },
}