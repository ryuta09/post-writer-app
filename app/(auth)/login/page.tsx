import UserAuthForm from "@/components/UserAuthForm";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="container flex flex-col justify-center h-screen items-center w-screen">
        <div className="mx-auto w-full sm:w-[350px] space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              メールアドレスを入力してログインできます
            </p>
          </div>
          <UserAuthForm />

          <p className="text-muted-foreground px-8 text-center text-sm">
            <Link href="/register" className="underline underline-offset-4">アカウントを持っていませんか？</Link>
          </p>
        </div>
      </div>
    </>
  );
}
