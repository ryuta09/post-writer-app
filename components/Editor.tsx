'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import TextareaAutosizse from "react-textarea-autosize";
import EditorJS from '@editorjs/editorjs';
import { useCallback, useEffect, useRef, useState } from "react";
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import List from "@editorjs/list";
import Code from "@editorjs/code";
import { Post } from "@prisma/client";
interface EditroProps {
  post: Pick<Post, 'id' | 'title' | 'content' | 'published' >
}
export default function Editor({post}:EditroProps) {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const initializeEditor = useCallback(  async () => {
    const editor = new EditorJS({
      holder: 'editor',
      onReady() {
        ref.current = editor
      },
      placeholder: 'ここに記事を書く',
      inlineToolbar: true,
      tools: {
        header: Header,
        linktool: LinkTool,
        list: List,
        code: Code
      }
    })
  }, [])

  useEffect(()=> {
    if(typeof window !== "undefined" ) {
      setIsMounted(true)
    }
  },[])

  useEffect(() => {
    if(isMounted) {
      initializeEditor()
    }

    return () => {
      ref.current?.destroy()
      ref.current = undefined
    }
  },[isMounted, initializeEditor])
  return (
    <>
      <form>
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
            />
          </div>
          <div id='editor' className="min-h-[500px]"/>
          <p className="text-sm text-gray-500">Use <kbd className="rounded-md border px-1 text-xs uppercase">Tab</kbd>to open the command menu</p>
        </div>
      </form>
    </>
  );
}
