import { cn } from "@/lib/utils";

export function PageHeader({
  className,
  title,
  description,
  children,
}: {
  className?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
