import { allPosts } from "@/.contentlayer/generated";
import Mdx from "@/components/MdxComponent";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getStaticPaths(slug: string) {
  const post = allPosts.find((post) => post.slugAsParams === slug);
  return post;
}

export async function generateMetadata({params}: {params: {slug: string}}):Promise<Metadata> {
  const page = await getStaticPaths(params.slug);
  if(!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      type: "article",
      locale: "ja",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${siteConfig.url}/og-image.png`],
      creator: 'ryuta'
    }
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const post = await getStaticPaths(slug);
  if (!post) {
    notFound();
  }
  return (
    <>
      <article className="container max-w-4xl pt-[80px] md:pt-[120px] pb-6 lg:pb-10">
        <div>
          {post.date && (
            <time>Published on {format(post.date, "yyyy/MM/dd")}</time>
          )}

          <h1 className="mt-2 font-extrabold text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={720}
              height={405}
              className="my-8 border rounded-md bg-muted w-full"
            />
          )}
        </div>
        <Mdx code={post.body.code} />
        <hr className="mt-12" />
        <div className="py-6 text-center lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            全ての記事を見る
          </Link>
        </div>
      </article>
    </>
  );
}
