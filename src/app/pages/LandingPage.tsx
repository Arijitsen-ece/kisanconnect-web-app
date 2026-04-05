import { useNavigate } from "react-router";
import { Sprout, Users, TrendingUp, CheckCircle, ArrowRight, Phone, Shield, Zap, Target, Leaf, IndianRupee, Truck, Clock, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Header } from "../components/Header";
import { Badge } from "../components/ui/badge";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: "Better Prices for Farmers",
      description: "Earn 20-40% more by selling directly to buyers. No middlemen, no commission cuts. You set your prices.",
      color: "emerald"
    },
    {
      icon: Target,
      title: "Hyperlocal Marketplace",
      description: "Connect with verified buyers within 50km. Reduce transport costs and sell fresh produce faster.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Verified & Trusted",
      description: "All farmers and buyers are verified. Ratings and reviews ensure transparency and build trust.",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Real-time Price Discovery",
      description: "Get AI-powered price suggestions based on local market trends. Make informed pricing decisions.",
      color: "orange"
    },
    {
      icon: Truck,
      title: "Fast & Local Delivery",
      description: "Hyperlocal connections mean faster delivery, fresher produce, and lower transportation costs.",
      color: "green"
    },
    {
      icon: Clock,
      title: "Quick Payments",
      description: "Direct transactions mean faster payments. No waiting for middlemen to clear your dues.",
      color: "red"
    }
  ];

  const benefits = {
    farmers: [
      "Sell directly to restaurants, shops & vendors",
      "Set your own prices & negotiate deals",
      "Get paid faster with direct transactions",
      "Receive real-time market price insights",
      "List unlimited products for free",
      "Build your farmer profile & reputation"
    ],
    buyers: [
      "Access fresh produce directly from farmers",
      "Get wholesale prices without middlemen markup",
      "Filter by distance, price & product type",
      "View farmer ratings & verified badges",
      "Negotiate bulk orders directly",
      "Support local farmers in your area"
    ]
  };

  const stats = [
    { number: "1000+", label: "Active Farmers" },
    { number: "500+", label: "Verified Buyers" },
    { number: "₹50L+", label: "Total Transactions" },
    { number: "30%", label: "Average Savings" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header userRole={null} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="absolute inset-0 bg-grid-emerald-100 opacity-50"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 mb-6 text-sm font-semibold border-0 py-2 px-4">
                🌾 India's First Hyperlocal Farmer-Buyer Marketplace
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Connect Farmers<br />
                with Local Buyers.<br />
                <span className="text-emerald-600">Directly.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                No middlemen. Better prices. Transparent marketplace. 
                Join 1000+ farmers and buyers transforming agriculture in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-lg h-14 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => navigate("/auth?role=farmer")}
                >
                  <Sprout className="mr-2 h-5 w-5" />
                  I am a Farmer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                  onClick={() => navigate("/auth?role=buyer")}
                >
                  <Users className="mr-2 h-5 w-5" />
                  I am a Buyer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>100% Free to List</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>Verified Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800"
                alt="Indian farmer with fresh produce"
                className="rounded-2xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-emerald-100 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="bg-emerald-100 text-emerald-700 mb-4 border-0">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose KisanConnect?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A modern, intelligent marketplace built specifically for India's farmers and local businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-emerald-300 hover:shadow-xl transition-all group">
                  <CardContent className="p-6">
                    <div className={`h-14 w-14 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-7 w-7 text-${feature.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Built For Everyone
            </h2>
            <p className="text-lg text-gray-600">Empowering both farmers and buyers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* For Farmers */}
            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Farmers</h3>
                </div>
                <ul className="space-y-3">
                  {benefits.farmers.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 h-12"
                  onClick={() => navigate("/auth?role=farmer")}
                >
                  Start Selling Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* For Buyers */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Buyers</h3>
                </div>
                <ul className="space-y-3">
                  {benefits.buyers.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 h-12"
                  onClick={() => navigate("/auth?role=buyer")}
                >
                  Start Buying Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Simple, fast, and transparent</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up & Verify</h3>
              <p className="text-gray-600">
                Create your account as a farmer or buyer. Get verified with a simple process.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">List or Browse Products</h3>
              <p className="text-gray-600">
                Farmers list their produce. Buyers browse and filter products by location and price.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect & Trade</h3>
              <p className="text-gray-600">
                Make offers, negotiate prices, and complete transactions directly. No middlemen!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
            Join thousands of farmers and buyers who are already benefiting from direct connections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 text-lg h-14 shadow-lg"
              onClick={() => navigate("/auth")}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg h-14 border-2 border-white text-white hover:bg-white/10"
              onClick={() => navigate("/buyer-dashboard")}
            >
              Explore Marketplace
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">KisanConnect</h3>
            <p className="text-gray-400 mb-4">Empowering farmers, connecting communities</p>
            <p className="text-sm text-gray-500">
              © 2026 KisanConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}