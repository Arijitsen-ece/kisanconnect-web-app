import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "./ui/badge";

interface DemandIndicatorProps {
  level: "high" | "medium" | "low";
  percentage?: number;
  size?: "sm" | "md";
}

export function DemandIndicator({ level, percentage, size = "md" }: DemandIndicatorProps) {
  const config = {
    high: {
      icon: TrendingUp,
      color: "bg-green-100 text-green-700 border-green-300",
      label: "High Demand",
    },
    medium: {
      icon: Minus,
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      label: "Medium Demand",
    },
    low: {
      icon: TrendingDown,
      color: "bg-red-100 text-red-700 border-red-300",
      label: "Low Demand",
    },
  };

  const { icon: Icon, color, label } = config[level];
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <Badge variant="outline" className={`${color} ${textSize} gap-1 font-medium`}>
      <Icon className={iconSize} />
      {label}
      {percentage && ` (${percentage}%)`}
    </Badge>
  );
}
