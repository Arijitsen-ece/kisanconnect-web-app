import { Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface PriceSuggestionProps {
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  trend: "up" | "down" | "stable";
  confidence: number;
}

export function PriceSuggestion({
  suggestedPrice,
  minPrice,
  maxPrice,
  trend,
  confidence,
}: PriceSuggestionProps) {
  const trendConfig = {
    up: { text: "Prices trending up", color: "text-green-600" },
    down: { text: "Prices trending down", color: "text-red-600" },
    stable: { text: "Prices stable", color: "text-gray-600" },
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Info className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-blue-900 mb-1">AI Price Suggestion</h4>
            <div className="mb-3">
              <p className="text-sm text-blue-800 mb-1">Based on local market trends</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-900">₹{suggestedPrice}</span>
                <span className="text-sm text-blue-700">per kg</span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Price Range:</span>
                <span className="font-semibold text-blue-900">₹{minPrice} - ₹{maxPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Market Trend:</span>
                <span className={`font-semibold ${trendConfig[trend].color}`}>
                  {trendConfig[trend].text}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Confidence:</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                  <span className="font-semibold text-blue-900">{confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
