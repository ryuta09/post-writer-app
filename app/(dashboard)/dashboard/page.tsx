import DashboardHeader from "@/components/DashboardHeader";
import DashboardShell from "@/components/DashboardShell";

export default function DashboardPage() {
  return (
    <>
      <DashboardShell>
        <DashboardHeader heading="記事作成" text="投稿の作成と管理">Create</DashboardHeader>
      </DashboardShell>
    </>
  );
}
