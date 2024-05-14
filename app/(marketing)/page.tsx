import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <section className="pt-6 md:pt-10 lg:py-32 pb-8 md:pb-12">
        <div className="container text-center flex flex-col items-center gap-3 mx-w-[64rem]">
          <Link href={'/'}>Xをフォローする</Link>
          <h1>Post Writer</h1>
          <p>このアプリケーションはNext.js AppRouterで作成されたものです。ユーザーは自由に投稿をPostできます</p>
        </div>
      </section>
    </>
  )
}