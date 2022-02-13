import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getEnv } from '@/utils/env';

// HMR 時にクライアントが無尽蔵に増えるのを防ぐ
global.prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: getEnv('GITHUB_ID'),
      clientSecret: getEnv('GITHUB_SECRET'),
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  adapter: PrismaAdapter(global.prisma),
  secret: getEnv('SECRET'),
});
