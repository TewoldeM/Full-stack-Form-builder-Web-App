"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import { redirect } from "next/navigation";
import { formSchema, formSchemaType } from "@/schema/form";
import { FormSubmissions } from "../lib/generated/prisma/index";

export async function GetFormsStats() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const stats = await prisma.form.aggregate({
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

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { name, description } = data;
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("something went wrong");
  }

  return form;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}
export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      share: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },

      formSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      share: formUrl,
      published: true,
    },
  });
}
export async function GetFormWithSubmission(id: number) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      formSubmissions: true,
    },
  });
}
