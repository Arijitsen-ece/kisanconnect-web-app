import { useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, TrendingDown, Package, IndianRupee, Users, Eye } from "lucide-react";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock analytics data
const priceData = [
  { month: "Oct", price: 20 },
  { month: "Nov", price: 22 },
  { month: "Dec", price: 24 },
  { month: "Jan", price: 23 },
  { month: "Feb", price: 25 },
  { month: "Mar", price: 27 },
];

const demandData = [
  { product: "Tomatoes", demand: 85 },
  { product: "Wheat", demand: 72 },
  { product: "Potatoes", demand: 68 },
  { product: "Onions", demand: 90 },
  { product: "Spinach", demand: 55 },
];

const viewsData = [
  { date: "Mar 27", views: 45 },
  { date: "Mar 28", views: 52 },
  { date: "Mar 29", views: 38 },
  { date: "Mar 30", views: 65 },
  { date: "Mar 31", views: 58 },
  { date: "Apr 01", views: 72 },
  { date: "Apr 02", views: 68 },
];

export function AnalyticsPage() {
  const navigate = useNavigate();

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
          Back
        </Button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
          <p className="text-gray-600">Track your performance and market trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Package className="h-8 w-8 text-emerald-600" />
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+12%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Total Listings</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <IndianRupee className="h-8 w-8 text-emerald-600" />
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+8%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Avg. Price</p>
              <p className="text-3xl font-bold text-gray-900">₹27</p>
              <p className="text-xs text-gray-500 mt-1">Per kg this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-emerald-600" />
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+23%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Total Offers</p>
              <p className="text-3xl font-bold text-gray-900">47</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Eye className="h-8 w-8 text-emerald-600" />
                <div className="flex items-center gap-1 text-red-600">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm font-medium">-5%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Profile Views</p>
              <p className="text-3xl font-bold text-gray-900">398</p>
              <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Price Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Price Trend</CardTitle>
              <CardDescription>Average price per kg over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={{ fill: "#059669", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">+35% increase</span>
                </div>
                <span className="text-gray-600">since October</span>
              </div>
            </CardContent>
          </Card>

          {/* Demand Indicator */}
          <Card>
            <CardHeader>
              <CardTitle>Market Demand</CardTitle>
              <CardDescription>Current demand by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="product" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="demand" fill="#059669" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-gray-600">
                Onions show highest demand (90%) in your region
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Views */}
        <Card>
          <CardHeader>
            <CardTitle>Profile & Listing Views</CardTitle>
            <CardDescription>Daily views over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 mb-1">Growing Demand</h3>
                  <p className="text-sm text-emerald-800">
                    Tomato prices have increased by 35% in your area. Consider listing more produce to maximize profits.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-1">Peak Activity</h3>
                  <p className="text-sm text-blue-800">
                    Most buyers are active between 9 AM - 12 PM. List your products during these hours for better visibility.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
