"use server";
import { afterLoginUrl } from "@/app-config";
import { rateLimitByIp, rateLimitByKey } from "@/services/authentication/limiter";
import { unauthenticatedAction } from "@/services/authentication/safe-action";
import { registerUserUseCase } from "@/useCases/authUseCase";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authService } from "@/services/authentication/auth";
export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: "register", limit: 3, window: 30000 });

    const user = await registerUserUseCase(input.email, input.password);
    await authService.setSession(user.id);
    return redirect(afterLoginUrl);
  });
