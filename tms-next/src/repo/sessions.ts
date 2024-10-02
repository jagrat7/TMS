import prisma from "@/services/database/db";
import { UserId } from "@/repo/types";

export async function deleteSessionForUser(userId: UserId) {
  await prisma.session.deleteMany({
    where: {
      userId: userId,
    },
  });
}
