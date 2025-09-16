"use server";
import { currentUser } from "@clerk/nextjs/server";
import Prisma from "@/lib/client"
class UserNotFoundError extends Error { }

export async function GetFormsStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  const stats = await Prisma.Form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum?.visits ?? 0;
  const submissions = stats._sum?.submissions ?? 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}
