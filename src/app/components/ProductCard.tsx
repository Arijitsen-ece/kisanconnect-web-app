import { useNavigate } from "react-router";
import { MapPin, Calendar, TrendingUp, Clock, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { DemandIndicator } from "./DemandIndicator";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  location: string;
  distance?: number;
  urgent?: boolean;
  highDemand?: boolean;
  demandLevel?: "high" | "medium" | "low";
  harvestDate?: string;
  farmerName?: string;
  farmerRating?: number;
  verified?: boolean;
}

export function ProductCard({
  id,
  name,
  image,
  price,
  quantity,
  location,
  distance,
  urgent,
  highDemand,
  demandLevel = "medium",
  harvestDate,
  farmerName,
  farmerRating = 4.5,
  verified = false,
}: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {distance && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-emerald-600" />
              <span className="text-xs font-bold text-gray-900">{distance} km</span>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {urgent && (
            <Badge variant="destructive" className="text-xs font-semibold">
              <Clock className="h-3 w-3 mr-1" />
              Urgent Sale
            </Badge>
          )}
          <DemandIndicator level={demandLevel} size="sm" />
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{name}</h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold text-emerald-600">
            ₹{price}
          </span>
          <span className="text-sm text-gray-600">/kg</span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-3">
          <p className="font-medium text-gray-900">Available: {quantity} kg</p>
          {farmerName && (
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-medium">{farmerName}</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-900">{farmerRating}</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs">{location}</span>
          </div>
          {harvestDate && (
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">Harvested: {harvestDate}</span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-gray-100">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
}