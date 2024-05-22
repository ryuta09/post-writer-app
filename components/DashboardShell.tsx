import { cn } from "@/lib/utils";
interface DasshboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function DashboardShell({children, className, ...props}:DasshboardShellProps) {
  return(
    <div className={cn('grid items-center gap-8', className)} {...props}>{children}</div>
  )

}