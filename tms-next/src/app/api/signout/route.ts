import { authService } from "@/services/authentication/auth";
import { redirect } from "next/navigation";

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session } = await authService.validateRequest();
  if (!session) {
    redirect("/signin");
  }

  await authService.invalidateSession(session);
  redirect("/signin");
}
