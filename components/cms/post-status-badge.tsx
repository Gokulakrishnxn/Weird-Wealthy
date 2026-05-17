import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "draft" | "published" | "archived";

const statusConfig: Record<Status, { label: string; className: string }> = {
  published: {
    label: "Published",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  },
  draft: {
    label: "Draft",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  },
  archived: {
    label: "Archived",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function PostStatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={cn("capitalize font-medium text-xs", config.className)}
    >
      {config.label}
    </Badge>
  );
}
