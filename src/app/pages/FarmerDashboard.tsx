import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Package, IndianRupee, Clock, CheckCircle, Eye, Sparkles } from "lucide-react";
import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { PriceSuggestion } from "../components/PriceSuggestion";
import { DemandIndicator } from "../components/DemandIndicator";
import { ListingSkeleton } from "../components/LoadingStates";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

// Mock data for farmer's listings


// Mock offers received
const mockOffers = [
  {
    id: "1",
    productId: "1",
    productName: "Fresh Tomatoes",
    buyerName: "Raj Restaurant",
    offerPrice: 27,
    quantity: 200,
    status: "pending",
  },
  {
    id: "2",
    productId: "1",
    productName: "Fresh Tomatoes",
    buyerName: "Green Mart",
    offerPrice: 26,
    quantity: 150,
    status: "pending",
  },
  {
    id: "3",
    productId: "2",
    productName: "Wheat",
    buyerName: "Flour Mill Co.",
    offerPrice: 23,
    quantity: 500,
    status: "pending",
  },
];

export function FarmerDashboard() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showPriceSuggestion, setShowPriceSuggestion] = useState(false);
  const [listings, setListings] = useState<any[]>([]);


  useEffect(() => {
    const saved = localStorage.getItem("products");

    if (saved) {
      setListings(JSON.parse(saved));
    } else {
      setListings([]);
    }

    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const fileInput = form["image"] as HTMLInputElement;
    const file = fileInput.files?.[0];

    let imageUrl = "https://via.placeholder.com/400x300";

    if (file) {
      imageUrl = URL.createObjectURL(file);
    }

    const newProduct = {
      id: Date.now().toString(),
      name: (form["product-name"] as HTMLInputElement).value,
      quantity: Number((form["quantity"] as HTMLInputElement).value),
      price: Number((form["price"] as HTMLInputElement).value),
      harvestDate: (form["harvest-date"] as HTMLInputElement).value,
      location: (form["location"] as HTMLInputElement).value,
      image: imageUrl,
      offers: 0,
      status: "active",
      urgent: false,
    };

    const updated = [...listings, newProduct];

    setListings(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    toast.success("✅ Product added successfully!");

    form.reset();
  };

  const handleViewOffers = (productId: string) => {
    navigate(`/offers/${productId}`);
  };

  const handleProductTypeChange = (value: string) => {
    setSelectedProduct(value);
    setShowPriceSuggestion(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Header userRole="farmer" />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Dashboard Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600">Manage your products and offers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <Package className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
              </div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Active Listings</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{listings.length}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <IndianRupee className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
              </div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Total Offers</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{mockOffers.length}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
              </div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl md:text-3xl font-bold text-orange-600">{mockOffers.filter(o => o.status === "pending").length}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Avg. Price</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">₹24</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="listings" className="text-sm md:text-base py-2.5 md:py-3">
              My Listings
            </TabsTrigger>
            <TabsTrigger value="offers" className="text-sm md:text-base py-2.5 md:py-3 relative">
              Offers
              {mockOffers.length > 0 && (
                <Badge className="ml-2 bg-orange-600 h-5 px-1.5">
                  {mockOffers.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="add" className="text-sm md:text-base py-2.5 md:py-3">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <ListingSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {listings.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-base md:text-lg text-gray-900">{product.name}</h3>
                        {product.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-bold text-emerald-600">₹{product.price}/kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-semibold">{product.quantity} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Offers:</span>
                          <span className="font-semibold text-orange-600">{product.offers} new</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Status:</span>
                          <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                            Active
                          </Badge>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-600"
                        onClick={() => handleViewOffers(product.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View {product.offers} Offers
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Offers Received Tab */}
          <TabsContent value="offers" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Recent Offers</h2>
              <Badge variant="outline" className="text-emerald-600">
                {mockOffers.filter(o => o.status === "pending").length} pending
              </Badge>
            </div>
            
            {mockOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-base md:text-lg text-gray-900">
                          {offer.productName}
                        </h3>
                        <DemandIndicator level="high" size="sm" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">From: <span className="font-semibold text-gray-900">{offer.buyerName}</span></p>
                      <div className="flex flex-wrap gap-3 md:gap-6 text-sm">
                        <div>
                          <span className="text-gray-600">Offer: </span>
                          <span className="font-bold text-emerald-600 text-base md:text-lg">
                            ₹{offer.offerPrice}/kg
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Quantity: </span>
                          <span className="font-semibold text-gray-900">{offer.quantity} kg</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Total: </span>
                          <span className="font-semibold text-gray-900">
                            ₹{(offer.offerPrice * offer.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 flex-1 md:flex-none"
                        onClick={() => toast.success("Offer accepted! Contact details shared.")}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 md:flex-none"
                        onClick={() => toast.info("Offer rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Add Product Tab */}
          <TabsContent value="add">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  Add New Product
                </CardTitle>
                <CardDescription>
                  List your fresh produce to connect with nearby buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="product-name" className="text-base">Product Name *</Label>
                      <Input
                        id="product-name"
                        placeholder="e.g., Fresh Tomatoes"
                        className="h-12 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-type" className="text-base">Product Type *</Label>
                      <Select onValueChange={handleProductTypeChange}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tomato">Tomato</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="potato">Potato</SelectItem>
                          <SelectItem value="onion">Onion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-base">Quantity (kg) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 500"
                        className="h-12 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-base">Price per kg (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="e.g., 25"
                        className="h-12 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="harvest-date" className="text-base">Harvest Date *</Label>
                      <Input
                        id="harvest-date"
                        type="date"
                        className="h-12 text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-base">Urgency Tag</Label>
                      <Select>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">🔴 Sell Today (Urgent)</SelectItem>
                          <SelectItem value="week">🟡 Within This Week</SelectItem>
                          <SelectItem value="wait">🟢 Can Wait</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* AI Price Suggestion */}
                  {showPriceSuggestion && selectedProduct && (
                    <PriceSuggestion
                      suggestedPrice={25}
                      minPrice={20}
                      maxPrice={30}
                      trend="up"
                      confidence={85}
                    />
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base">Location *</Label>
                    <Input
                      id="location"
                      placeholder="Village/Town"
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add details about your produce quality, organic certification, etc."
                      rows={3}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-base">Upload Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="h-12"
                    />
                    <p className="text-xs text-gray-500">
                      📸 Upload a clear photo of your produce for better visibility
                    </p>
                  </div>

                  <div className="flex gap-3 md:gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-12 md:h-14 text-base"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      List Product
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNav userRole="farmer" />
    </div>
  );
}