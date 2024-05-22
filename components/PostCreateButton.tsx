"use client";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./ui/button";
import { useState } from "react";
import { Icons as Icon } from "./Icon";
interface PostCreateButtonProps extends ButtonProps {}
export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {};
  return (
    <>
      <button
        className={cn(
          buttonVariants({ variant }),
          { "cursor-not-allowed opacity-60": isLoading },
          className
        )}
        onClick={onClick}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icon.spinner className="animate-spin mr-2 h-4 w-4" />
        ) : (
          <Icon.add className="mr-2 h-4 w-4" />
        )}
        新しい投稿
      </button>
    </>
  );
}
