import MainNav from "@/components/MainNav";
import SiteFooter from "@/components/SiteFooter";
import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MarketingLayout({children}: {children: React.ReactNode}) {
  return(
    <>
    <div>
      <header className="fixed container w-full z-40 bg-background mx-auto">
        <div className="h-20 py-6 flex items-center justify-between">
          <MainNav items={marketingConfig.mainNav}/>
          <nav>
            <Link href={'/login'} className={cn(buttonVariants({variant: "secondary", size: 'sm'}), 'px-4')}>ログイン</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
    </>
  )
}