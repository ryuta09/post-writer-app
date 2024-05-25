"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import TextareaAutosizse from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postPatchSchema, postPatchSchemaType } from "@/lib/validations/post";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
interface EditroProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}
export default function Editor({ post }: EditroProps) {
  const ref = useRef<EditorJS>();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const initializeEditor = useCallback(async () => {
    const editor = new EditorJS({
      holder: "editor",
      onReady() {
        ref.current = editor;
      },
      placeholder: "ここに記事を書く",
      inlineToolbar: true,
      data: post.content as any,
      tools: {
        header: Header,
        linktool: LinkTool,
        list: List,
        code: Code,
      },
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }

    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
  }, [isMounted, initializeEditor]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postPatchSchemaType>({
    resolver: zodResolver(postPatchSchema),
  });

  const onSubmit = async (data: postPatchSchemaType) => {
    const blocks = await ref.current?.save();
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "applicaton/json",
      },
      body: JSON.stringify({ title: data.title, content: blocks }),
    });
    if (!response.ok) {
      return toast({
        title: "問題が発生しました",
        description:
          "あなたの記事は保存されませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    }
    router.refresh();
    return toast({
      description: "正常に保存されました。",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href={"/dashboard"}
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                戻る
              </Link>
              <p className="text-sm text-muted-foreground">公開</p>
            </div>
            <button className={cn(buttonVariants())} type="submit">
              保存
            </button>
          </div>
          <div className="w-[800px] mx-auto">
            <TextareaAutosizse
              id="title"
              autoFocus
              defaultValue={post?.title}
              placeholder="Post Title"
              className="w-full resize-none overflow-hidden bg-transparent text-5xl focus:outline-none font-bold"
              {...register("title")}
            />
          </div>
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border px-1 text-xs uppercase">Tab</kbd>
            to open the command menu
          </p>
        </div>
      </form>
    </>
  );
}
