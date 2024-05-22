import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  // セッション情報を取得
  const session = await getServerSession();
  return session?.user;
}