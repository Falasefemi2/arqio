import { ReactNode } from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface StateCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  badge?: string;
  badgeColor: "success" | "warning" | "pending" | "default";
}

export function StateCard({
  icon,
  label,
  value,
  badge,
  badgeColor = "default",
}: StateCardProps) {
  const badgeClasses = {
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-orange-100 text-orange-700",
    pending: "bg-amber-100 text-amber-700",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <Card className="bg-white border-slate-200">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-lg bg-slate-100">{icon}</div>
              {badge && (
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    badgeClasses[badgeColor],
                  )}
                >
                  {badge}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-slate-600">{label}</p>
              <p className="text-3xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
