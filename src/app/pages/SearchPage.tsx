import { useNavigate } from "react-router";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50">

      {/* Icon */}
      <div className="bg-emerald-100 p-4 rounded-full mb-4">
        <Search className="h-8 w-8 text-emerald-600" />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">
        Search Coming Soon
      </h1>

      {/* Description */}
      <p className="text-gray-600 mt-2 max-w-md">
        We’re building a powerful search experience to help you find fresh
        products faster. Stay tuned!
      </p>

      {/* Suggestions */}
      <div className="mt-6 space-y-2 text-sm text-gray-500">
        <p>👉 Browse products from Home</p>
        <p>👉 Explore nearby farmers</p>
        <p>👉 Discover trending items</p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Button
          onClick={() => navigate("/buyer-dashboard")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Go to Home
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  );
}