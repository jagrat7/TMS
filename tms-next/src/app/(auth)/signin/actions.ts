"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByKey } from "@/services/authentication/limiter";
import { unauthenticatedAction } from "@/services/authentication/safe-action";
import { authService } from "@/services/authentication/auth";	
import { signInUseCase } from "@/useCases/authUseCase";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
    const user = await signInUseCase(input.email, input.password);
    await authService.setSession(user.id);
    redirect(afterLoginUrl);
  });
