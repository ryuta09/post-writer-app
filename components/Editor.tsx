'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import TextareaAutosizse from "react-textarea-autosize";
import EditorJS from '@editorjs/editorjs';
import { useEffect, useState } from "react";

export default function Editor() {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const initializeEditor = async () => {
    const editor = new EditorJS({
      holder: 'editor',
      placeholder: 'ここに記事を書く',
      inlineToolbar: true,
    })
  }

  useEffect(()=> {
    if(typeof window !== "undefined" ) {
      setIsMounted(true)
    }
  },[])

  useEffect(() => {
    if(isMounted) {
      initializeEditor()
    }
  },[isMounted])
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
          <div>
            <TextareaAutosizse
              id="title"
              autoFocus
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
