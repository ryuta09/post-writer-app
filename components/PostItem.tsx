import { Post } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"

interface PostItemProps {
  post: Pick<Post, 'id' | 'title' | 'published' | 'createdAt'>
}
export default function PostItem({post}: PostItemProps) {
  return(
    <>
    <div className="flex items-center justify-between p-4 ">
      <div className="grid gap-2">
        <Link href={`/editor/${post.id}`} className="font-semibold hover:underline">{post.title}</Link>
        <div>
          <p className="text-sm text-muted-foreground">{format(post.createdAt, 'yyyy-MM-dd')}</p>
        </div>
      </div>
    </div>
    </>
  )
}