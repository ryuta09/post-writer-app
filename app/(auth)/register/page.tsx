import UserAuthForm from "@/components/UserAuthForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <div className="conatiner grid flex-col lg:grid-cols-2 h-screen w-screen items-center justify-center lg:max-w-none lg:px-0">
        <Link
          href={"/login"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute let-4 md:left-8 top-4 md:top-8"
          )}
        >
          ログイン
        </Link>
        <div className="h-full bg-muted lg:block hidden" />
        <div className="mx-auto w-full sm:w-[350px] space-y-4 px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              アカウントの作成
            </h1>
            <p className="text-sm text-muted-foreground">
              メールアドレスを入力してアカウント作成してください。
            </p>
          </div>
          <UserAuthForm />

          <p className="text-muted-foreground px-8 text-center text-sm">
            続けてクリックすれば私たちの
            <Link href="/terms" className="underline underline-offset-4">
              利用規約
            </Link>
            と
            <Link href="/privacy" className="underline underline-offset-4">
              プライバシーポリシー
            </Link>
            に同意したことになります。
          </p>
        </div>
      </div>
    </>
  );
}
