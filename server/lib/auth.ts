import 'dotenv/config';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";

const trustedOrigin = process.env.ORIGIN?.split(',') || [];
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    //github: { 
    //  clientId: process.env.GITHUB_CLIENT_ID as string, 
    //  clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    //}, 
  }, 
  trustedOrigin,
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  advanced:{
    cookies:{
        session_token:{
            name: 'auth_session', 
            attributes: {
                httpOnly: true,
                secure: process.env.NODE_ENV ==='production',
                sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'lax',
                path: '/'
            }
        }
    }
  }
});