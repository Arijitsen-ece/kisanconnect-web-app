import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, SlidersHorizontal, X, TrendingUp, MapPin, Sparkles, Clock } from "lucide-react";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/LoadingStates";
import { MobileNav } from "../components/MobileNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Badge } from "../components/ui/badge";
import { products, getRecommendedProducts, getNearbyProducts, getUrgentProducts } from "../data/products";

export function BuyerDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [maxDistance, setMaxDistance] = useState([50]);
  const [productCategory, setProductCategory] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesDistance = product.distance <= maxDistance[0];
    const matchesCategory = productCategory === "all" || product.category === productCategory;
    return matchesSearch && matchesPrice && matchesDistance && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "distance") return a.distance - b.distance;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.farmerRating - a.farmerRating;
    return 0;
  });

  const recommendedProducts = getRecommendedProducts(6);
  const nearbyProducts = getNearbyProducts(5, 6);
  const urgentProducts = getUrgentProducts(4);

  const activeFiltersCount = 
    (priceRange[0] !== 0 || priceRange[1] !== 100 ? 1 : 0) +
    (maxDistance[0] !== 50 ? 1 : 0) +
    (productCategory !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100]);
    setMaxDistance([50]);
    setProductCategory("all");
    setSortBy("distance");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Header userRole="buyer" />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Dashboard Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Discover Fresh Produce
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Connect with local farmers and get the best deals
          </p>
        </div>

        {/* Search and Filters Bar */}
        <Card className="mb-6 md:mb-8 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 md:h-14 text-base md:text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Sort & Filter Buttons */}
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px] h-12 md:h-14">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Nearest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-12 md:h-14 px-4 md:px-6 relative">
                      <SlidersHorizontal className="mr-2 h-5 w-5" />
                      <span className="hidden sm:inline">Filters</span>
                      {activeFiltersCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-emerald-600 h-5 w-5 p-0 flex items-center justify-center">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription>
                        Refine your search to find the perfect produce
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      {/* Price Range Filter */}
                      <div className="space-y-4">
                        <Label className="text-base">Price Range (₹ per kg)</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 min-w-[40px]">₹{priceRange[0]}</span>
                          <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            min={0}
                            max={100}
                            step={5}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 min-w-[50px] text-right">₹{priceRange[1]}</span>
                        </div>
                      </div>

                      {/* Distance Filter */}
                      <div className="space-y-4">
                        <Label className="text-base">Maximum Distance</Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={maxDistance}
                            onValueChange={setMaxDistance}
                            min={5}
                            max={50}
                            step={5}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 min-w-[50px] text-right">{maxDistance[0]} km</span>
                        </div>
                      </div>

                      {/* Product Category Filter */}
                      <div className="space-y-2">
                        <Label className="text-base">Product Category</Label>
                        <Select value={productCategory} onValueChange={setProductCategory}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Products</SelectItem>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="grains">Grains</SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                            <SelectItem value="leafy-greens">Leafy Greens</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1 h-12"
                          onClick={clearFilters}
                        >
                          Clear All
                        </Button>
                        <Button
                          className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => setFilterOpen(false)}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {priceRange[0] !== 0 || priceRange[1] !== 100 ? (
                  <Badge variant="outline" className="gap-2">
                    Price: ₹{priceRange[0]}-₹{priceRange[1]}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-red-600" 
                      onClick={() => setPriceRange([0, 100])}
                    />
                  </Badge>
                ) : null}
                {maxDistance[0] !== 50 && (
                  <Badge variant="outline" className="gap-2">
                    Within {maxDistance[0]} km
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-red-600" 
                      onClick={() => setMaxDistance([50])}
                    />
                  </Badge>
                )}
                {productCategory !== "all" && (
                  <Badge variant="outline" className="gap-2">
                    {productCategory}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-red-600" 
                      onClick={() => setProductCategory("all")}
                    />
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Urgent Deals Section */}
        {!searchQuery && !loading && urgentProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-red-600" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Urgent Deals - Limited Time!
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {urgentProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product}
                  harvestDate={new Date(product.harvestDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recommended For You Section */}
        {!searchQuery && !loading && recommendedProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Recommended For You
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product}
                  harvestDate={new Date(product.harvestDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Nearby Products Section */}
        {!searchQuery && !loading && nearbyProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Nearest to You
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {nearbyProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product}
                  harvestDate={new Date(product.harvestDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Products / Search Results */}
        <div>
          <div className="mb-4 md:mb-6 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {searchQuery ? "Search Results" : "All Products"}
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Found <span className="font-bold text-emerald-600 text-lg">{loading ? "..." : filteredProducts.length}</span> products
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      {...product}
                      harvestDate={new Date(product.harvestDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-12 md:p-16 text-center">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6">
                      Try adjusting your filters or search term
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="h-11"
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>

      <MobileNav userRole="buyer" />
    </div>
  );
}
