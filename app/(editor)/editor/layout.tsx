import DasboardNav from "@/components/DasboardNav";
import MainNav from "@/components/MainNav";
import SiteFooter from "@/components/SiteFooter";
import { buttonVariants } from "@/components/ui/button";
import { dashboardConfig } from "@/config/dashboard";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function EditorLayout({children}: {children: React.ReactNode}) {
  return(
    <>
    <div className="container mx-auto grid items-center gao-10 py-8">
      {children}
    </div>
    </>
  )
}