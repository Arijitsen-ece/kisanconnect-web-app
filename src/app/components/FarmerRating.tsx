import { Star, Shield } from "lucide-react";
import { Badge } from "./ui/badge";

interface FarmerRatingProps {
  rating: number;
  reviewCount: number;
  verified?: boolean;
  size?: "sm" | "md" | "lg";
}

export function FarmerRating({ rating, reviewCount, verified, size = "md" }: FarmerRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));
  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1">
        {stars.map((filled, i) => (
          <Star
            key={i}
            className={`${iconSize} ${filled ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      <span className={`${textSize} text-gray-600`}>
        {rating.toFixed(1)} ({reviewCount})
      </span>
      {verified && (
        <Badge className="bg-blue-600 text-xs gap-1 px-2 py-0">
          <Shield className="h-3 w-3" />
          Verified
        </Badge>
      )}
    </div>
  );
}
