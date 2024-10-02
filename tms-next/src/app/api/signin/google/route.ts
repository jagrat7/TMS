import { authService } from "@/services/authentication/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {

  const { url, state, codeVerifier } = await authService.createGoogleAuthorizationURL();

  cookies().set("google_oauth_state", state, {
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  cookies().set("google_code_verifier", codeVerifier, {
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return Response.redirect(url);
}
