import { db } from "@/lib/db";
import { postPatchSchema } from "@/lib/validations/post";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const routeContetSchema = z.object({
  params: z.object({
    postId: z.string()
  })
})
export async function PATCH(req: NextRequest, context: z.infer<typeof routeContetSchema>) {
  const {params} = routeContetSchema.parse(context);
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

  return NextResponse.json(null, {status: 200})
}