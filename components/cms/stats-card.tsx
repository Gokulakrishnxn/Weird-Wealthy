import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function StatsCard({ label, value, icon: Icon, description, className }: StatsCardProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-elevated">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
