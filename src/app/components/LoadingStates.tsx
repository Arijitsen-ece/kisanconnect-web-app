import { Card, CardContent } from "./ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-8 w-1/2 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ListingSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 bg-gray-200 rounded" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
