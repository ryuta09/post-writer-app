import { z } from "zod";

export const postPatchSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(128, { message: "記事のタイトルは128文字以内で入力してください。" }),
  content: z.any().optional(),
});

// 型だけを抽出
export type postPatchSchemaType = z.infer<typeof postPatchSchema>;
