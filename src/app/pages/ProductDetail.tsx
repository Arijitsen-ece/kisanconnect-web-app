import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Calendar, Phone, MessageCircle, TrendingUp, Clock, User, Shield } from "lucide-react";
import { Header } from "../components/Header";
import { FarmerRating } from "../components/FarmerRating";
import { DemandIndicator } from "../components/DemandIndicator";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";
import { getProductById } from "../data/products";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = getProductById(id || "1");

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Button onClick={() => navigate("/buyer-dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("✅ Offer sent successfully! The farmer will respond soon.", {
      duration: 4000,
    });
  };

  const handleCall = () => {
    toast.info("📞 Opening dialer...");
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in your ${product.name}`;
    const farmerPhone = "+91 98765 43210"; // Mock phone number
    const url = `https://wa.me/${farmerPhone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="buyer" />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 md:mb-6 hover:bg-emerald-50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Back to Listings</span>
          <span className="sm:hidden">Back</span>
        </Button>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.urgent && (
                <Badge variant="destructive" className="text-sm py-1.5 px-3">
                  <Clock className="h-4 w-4 mr-1" />
                  Urgent Sale
                </Badge>
              )}
              <DemandIndicator level={product.demandLevel} size="md" />
              <Badge variant="outline" className="text-sm py-1.5 px-3">
                {product.quality || "Grade A"}
              </Badge>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl md:text-5xl font-bold text-emerald-600">₹{product.price}</span>
              <span className="text-xl text-gray-600">/kg</span>
            </div>

            {/* Farmer Info with Rating */}
            <Card className="mb-6 border-emerald-100 bg-emerald-50/50">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {product.farmerName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{product.farmerName}</h3>
                      {product.verified && (
                        <Badge className="bg-blue-600 text-xs gap-1">
                          <Shield className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <FarmerRating 
                      rating={product.farmerRating}
                      reviewCount={product.farmerReviews}
                      size="md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-base">Location</p>
                  <p className="text-gray-600">{product.location}</p>
                  <p className="text-emerald-600 font-semibold">{product.distance} km away • ~{Math.ceil(product.distance * 2)} mins</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-base">Harvest Date</p>
                  <p className="text-gray-600">{new Date(product.harvestDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-green-600">Freshly harvested</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Product Info */}
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Available Quantity</h3>
                <p className="text-3xl font-bold text-gray-900">{product.quantity} kg</p>
              </div>

              {product.description && (
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {product.packaging && (
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Packaging</h3>
                  <p className="text-gray-700">{product.packaging}</p>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Make Offer Section */}
            <Card className="border-2 border-emerald-200 bg-emerald-50 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>Make an Offer</span>
                  <Badge className="bg-emerald-600">Best price guaranteed</Badge>
                </h3>
                <form onSubmit={handleSendOffer} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="offer-price" className="text-base">Your Offer Price (₹/kg) *</Label>
                      <Input
                        id="offer-price"
                        type="number"
                        placeholder={`e.g., ${product.price}`}
                        className="h-12 text-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offer-quantity" className="text-base">Quantity (kg) *</Label>
                      <Input
                        id="offer-quantity"
                        type="number"
                        placeholder="e.g., 100"
                        max={product.quantity}
                        className="h-12 text-lg"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 text-lg font-bold"
                  >
                    Send Offer
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="mt-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Contact Farmer Directly</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleCall}
                  className="bg-blue-600 hover:bg-blue-700 h-14 text-base"
                  size="lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="bg-green-600 hover:bg-green-700 h-14 text-base"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}