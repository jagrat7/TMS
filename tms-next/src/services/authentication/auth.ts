import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "../database/db";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { generateCodeVerifier, generateState, Google } from "arctic";
import type { Session, User } from "lucia";
import { UserId } from "@/repo/types";
import { env } from "@/env";
import "server-only";
import { AuthenticationError } from "../../useCases/errors";
import { IAuthService } from "./auth.interface";
import { hash, verify } from "@node-rs/argon2";
import { URL } from "url";
import { Url } from "next/dist/shared/lib/router/router";
import { createGoogleUserUseCase, getAccountByGoogleIdUseCase } from "@/useCases/authUseCase";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export class AuthService implements IAuthService {
  lucia: Lucia;
  private googleAuth: Google;

  constructor() {
    this.lucia = new Lucia(adapter, {
      sessionCookie: {
        expires: false,
        attributes: {
          secure: process.env.NODE_ENV === "production",
        },
      },
      getUserAttributes: (attributes) => {
        return {
          id: attributes.id,
        };
      },
    });

    this.googleAuth = new Google(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      `${env.HOST_NAME}/api/signin/google/callback`
    );
  }

  async validateRequest(): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > {
    const sessionId =
      cookies().get(this.lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await this.lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = this.lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = this.lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch { }
    return result;
  }

  async getCurrentUser(): Promise<User | undefined> {
    const session = await this.validateRequest();
    if (!session.user) {
      return undefined;
    }
    return session.user;
  }

  async assertAuthenticated(): Promise<User> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new AuthenticationError();
    }
    return user;
  }

  async setSession(userId: UserId): Promise<void> {
    const session = await this.lucia.createSession(userId, {});
    const sessionCookie = this.lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  async invalidateSession(session: Session): Promise<boolean> {
    try {
      await this.lucia.invalidateSession(session.id);
      const sessionCookie = this.lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return true; // Session successfully invalidated
    } catch (error) {
      console.error("Failed to invalidate session:", error);
      return false; // Session invalidation failed
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
  }
  async verifyPassword(userPassword: string, password: string): Promise<boolean> {

    return await verify(userPassword, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });

  }
  async createGoogleAuthorizationURL(): Promise<{ url: string; state: string; codeVerifier: string }> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await this.googleAuth.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"],
    });

    return { url: url.toString(), state, codeVerifier };
  }


  async handleGoogleCallback(code: string, state: string, storedState: string | null, codeVerifier: string | null): Promise<{ userId: string; isNewUser: boolean }> {
    // Validate parameters
    if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
      throw new Error("Invalid callback parameters");
    }

    const tokens = await this.googleAuth.validateAuthorizationCode(code, codeVerifier);
    const googleUser = await this.fetchGoogleUserInfo(tokens.accessToken);

    const existingAccount = await getAccountByGoogleIdUseCase(googleUser.sub);

    if (existingAccount) {
      return { userId: existingAccount.id, isNewUser: false };
    }

    const userId = await createGoogleUserUseCase(googleUser);
    return { userId, isNewUser: true };
  }

  private async fetchGoogleUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.json();
  }
}
// Type declarations
declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: {
      id: UserId;
    };
    UserId: string;
  }
}
export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
export const authService = new AuthService();

// import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
// import prisma from "../database/db";
// import { Lucia } from "lucia";
// import { cookies } from "next/headers";
// import { cache } from "react";
// import {  Google } from "arctic";
// import type { Session, User } from "lucia";
// import { UserId as CustomUserId } from "../../types";
// import { env } from "@/env";
// import "server-only";
// import { AuthenticationError } from "../../useCases/errors";
// import { UserId } from "@/types";
// import { IAuthService } from "./auth.interface";

// const adapter = new PrismaAdapter(prisma.session, prisma.user);
// class authService implements IAuthService{

// }

// export const lucia = new Lucia(adapter, {
// 	sessionCookie: {
// 		expires: false,
// 		attributes: {
// 			secure: process.env.NODE_ENV === "production"
// 		}
// 	},
// 	getUserAttributes: (attributes) => {
// 		return {
// 			// attributes has the type of DatabaseUserAttributes
// 			id: attributes.id
// 		};
// 	}
// });

// export const validateRequest = cache(
// 	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
// 		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
// 		if (!sessionId) {
// 			return {
// 				user: null,
// 				session: null
// 			};
// 		}

// 		const result = await lucia.validateSession(sessionId);
// 		// next.js throws when you attempt to set cookie when rendering page
// 		try {
// 			if (result.session && result.session.fresh) {
// 				const sessionCookie = lucia.createSessionCookie(result.session.id);
// 				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 			}
// 			if (!result.session) {
// 				const sessionCookie = lucia.createBlankSessionCookie();
// 				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 			}
// 		} catch {}
// 		return result;
// 	}
// );

// declare module "lucia" {
// 	interface Register {
// 	  Lucia: typeof lucia;
// 	  DatabaseUserAttributes: {
// 		id: CustomUserId;
// 	  };
// 	  UserId: CustomUserId;
// 	}
//   }
// export const googleAuth = new Google(
// 	env.GOOGLE_CLIENT_ID,
// 	env.GOOGLE_CLIENT_SECRET,
// 	`${env.HOST_NAME}/api/login/google/callback`,
//   );

//   export const getCurrentUser = cache(async () => {
// 	const session = await validateRequest();
// 	if (!session.user) {
// 	  return undefined;
// 	}
// 	return session.user;
//   });

//   export const assertAuthenticated = async () => {
// 	const user = await getCurrentUser();
// 	if (!user) {
// 	  throw new AuthenticationError();
// 	}
// 	return user;
//   };

//   export async function setSession(userId: UserId) {
// 	const session = await lucia.createSession(userId, {});
// 	const sessionCookie = lucia.createSessionCookie(session.id);
// 	cookies().set(
// 	  sessionCookie.name,
// 	  sessionCookie.value,
// 	  sessionCookie.attributes,
// 	);
//   }
