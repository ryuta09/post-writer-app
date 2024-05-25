import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { postPatchSchema } from "@/lib/validations/post";
import { PersonStanding } from "lucide-react";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const routeContetSchema = z.object({
  params: z.object({
    postId: z.string()
  })
})
export async function PATCH(req: NextRequest, context: z.infer<typeof routeContetSchema>) {
  try {
    const {params} = routeContetSchema.parse(context);
    if(!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return NextResponse.json(null, {status: 403})
    }
    const json = await req.json();
    const body = postPatchSchema.parse(json);
  
    await db.post.update({
      where: {
        id: params.postId
      },
      data: {
        title: body.title,
        content: body.content
      }
    })
  } catch (error) {
    if(error instanceof z.ZodError) {
      return NextResponse.json(error.issues, {status: 422})
    } else {
      return NextResponse.json(null,{status: 500})
    }
  }
  

  return NextResponse.json(null, {status: 200})
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user?.id
    }
  })
  return count > 0;
}