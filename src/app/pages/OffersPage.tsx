import { useParams, useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, User, Phone, MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";

// Mock offers data
const mockOffersData: Record<string, any> = {
  "1": {
    productName: "Fresh Tomatoes",
    productImage: "https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBmcmVzaCUyMHJlZHxlbnwxfHx8fDE3NzUxNjExODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    yourPrice: 25,
    offers: [
      {
        id: "1",
        buyerName: "Raj Restaurant",
        buyerPhone: "+91 98765 11111",
        offerPrice: 27,
        quantity: 200,
        status: "pending",
        timestamp: "2026-04-02 10:30 AM",
      },
      {
        id: "2",
        buyerName: "Green Mart",
        buyerPhone: "+91 98765 22222",
        offerPrice: 26,
        quantity: 150,
        status: "pending",
        timestamp: "2026-04-02 09:15 AM",
      },
      {
        id: "3",
        buyerName: "Fresh Foods Store",
        buyerPhone: "+91 98765 33333",
        offerPrice: 25.5,
        quantity: 100,
        status: "pending",
        timestamp: "2026-04-01 05:45 PM",
      },
      {
        id: "4",
        buyerName: "City Cafe",
        buyerPhone: "+91 98765 44444",
        offerPrice: 24,
        quantity: 80,
        status: "rejected",
        timestamp: "2026-04-01 02:30 PM",
      },
    ],
  },
  "2": {
    productName: "Organic Wheat",
    productImage: "https://images.unsplash.com/photo-1713272195609-93ca51c20062?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWluJTIwZ29sZGVufGVufDF8fHx8MTc3NTA5ODMwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    yourPrice: 22,
    offers: [
      {
        id: "1",
        buyerName: "Flour Mill Co.",
        buyerPhone: "+91 98765 55555",
        offerPrice: 23,
        quantity: 500,
        status: "pending",
        timestamp: "2026-04-02 11:00 AM",
      },
    ],
  },
};

export function OffersPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const data = mockOffersData[productId || "1"] || mockOffersData["1"];
  const pendingOffers = data.offers.filter((o: any) => o.status === "pending");
  const bestOffer = pendingOffers.length > 0 
    ? pendingOffers.reduce((max: any, offer: any) => offer.offerPrice > max.offerPrice ? offer : max)
    : null;

  const handleAccept = (offerId: string, buyerName: string) => {
    toast.success(`Offer from ${buyerName} accepted! You can now contact them.`);
  };

  const handleReject = (offerId: string, buyerName: string) => {
    toast.info(`Offer from ${buyerName} rejected.`);
  };

  const handleCall = (phone: string) => {
    toast.info("Opening dialer...");
  };

  const handleWhatsApp = (phone: string, buyerName: string) => {
    const message = `Hi ${buyerName}, regarding your offer for ${data.productName}`;
    const url = `https://wa.me/${phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="farmer" />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={data.productImage}
                    alt={data.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{data.productName}</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Your Price:</span>
                    <span className="text-2xl font-bold text-gray-900">₹{data.yourPrice}/kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Offers:</span>
                    <span className="font-bold text-emerald-600">{data.offers.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-bold text-orange-600">{pendingOffers.length}</span>
                  </div>
                </div>

                {bestOffer && (
                  <>
                    <Separator className="my-4" />
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        <span className="font-semibold text-emerald-900">Best Offer</span>
                      </div>
                      <p className="text-3xl font-bold text-emerald-600">
                        ₹{bestOffer.offerPrice}/kg
                      </p>
                      <p className="text-sm text-emerald-700 mt-1">
                        {((bestOffer.offerPrice - data.yourPrice) / data.yourPrice * 100).toFixed(1)}% above your price
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Offers List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Offers Received</h1>
              <p className="text-gray-600">Review and respond to buyer offers</p>
            </div>

            <div className="space-y-4">
              {/* Pending Offers */}
              {pendingOffers.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900">Pending Offers</h2>
                  {pendingOffers.map((offer: any) => (
                    <Card key={offer.id} className={offer.id === bestOffer?.id ? "border-2 border-emerald-500" : ""}>
                      <CardContent className="p-6">
                        {offer.id === bestOffer?.id && (
                          <Badge className="mb-3 bg-emerald-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Highest Offer
                          </Badge>
                        )}
                        
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                <User className="h-6 w-6 text-emerald-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">{offer.buyerName}</h3>
                                <p className="text-sm text-gray-600">{offer.timestamp}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Offer Price</p>
                                <p className="text-3xl font-bold text-emerald-600">₹{offer.offerPrice}</p>
                                <p className="text-xs text-gray-600">per kg</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Quantity</p>
                                <p className="text-2xl font-bold text-gray-900">{offer.quantity} kg</p>
                                <p className="text-xs text-gray-600">
                                  Total: ₹{(offer.offerPrice * offer.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {offer.offerPrice > data.yourPrice && (
                              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full mb-4">
                                +₹{(offer.offerPrice - data.yourPrice).toFixed(2)} above your price
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 lg:w-48">
                            <Button
                              className="bg-emerald-600 hover:bg-emerald-700"
                              onClick={() => handleAccept(offer.id, offer.buyerName)}
                            >
                              Accept Offer
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleReject(offer.id, offer.buyerName)}
                            >
                              Reject
                            </Button>
                            <Separator className="my-2" />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCall(offer.buyerPhone)}
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleWhatsApp(offer.buyerPhone, offer.buyerName)}
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              WhatsApp
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}

              {/* Previous Offers */}
              {data.offers.filter((o: any) => o.status !== "pending").length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mt-8">Previous Offers</h2>
                  {data.offers
                    .filter((o: any) => o.status !== "pending")
                    .map((offer: any) => (
                      <Card key={offer.id} className="opacity-60">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900">{offer.buyerName}</h3>
                              <p className="text-sm text-gray-600 mb-2">{offer.timestamp}</p>
                              <div className="flex gap-4">
                                <span className="text-gray-600">₹{offer.offerPrice}/kg</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-600">{offer.quantity} kg</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-gray-600">
                              {offer.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </>
              )}

              {data.offers.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-gray-500 text-lg">No offers received yet</p>
                    <p className="text-gray-400 mt-2">Buyers will send offers when interested in your product</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
