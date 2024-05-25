import Editor from "@/components/Editor";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Post, User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
interface EditorParams {
  params: { postId: string };
}
async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
  return post;
}
export default async function EditorPage({ params }: EditorParams) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const userId = user?.id;
  const postId = params.postId;
  const post = await getPostForUser(postId, userId);

  if(!post) {
    notFound();
  }
  return (
    <Editor
      post={{
        id: post?.id,
        title: post?.title,
        content: post?.content,
        published: post?.published,
      }}
    />
  );
}
