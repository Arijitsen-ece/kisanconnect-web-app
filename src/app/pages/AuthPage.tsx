import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { saveUser } from "../utils/auth";

export function AuthPage() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<"farmer" | "buyer">("buyer");
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  // 🔥 Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name: formData.name || "User",
      role: selectedRole,
      location: "India",
      phone: formData.phone,
      email: formData.phone + "@kisanconnect.com",
      rating: 4.5,
    };

    saveUser(userData);

    navigate(
      selectedRole === "farmer"
        ? "/farmer-dashboard"
        : "/buyer-dashboard"
    );
  };

  // 🔥 Handle Signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name: formData.name || "New User",
      role: selectedRole,
      location: "India",
      phone: formData.phone,
      email: formData.phone + "@kisanconnect.com",
      rating: 4.0,
    };

    saveUser(userData);

    navigate(
      selectedRole === "farmer"
        ? "/farmer-dashboard"
        : "/buyer-dashboard"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-100 px-4">

      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6">

          {/* Role Selection */}
          <div className="flex mb-4">
            <Button
              className={`flex-1 ${
                selectedRole === "farmer" ? "bg-emerald-600 text-white" : ""
              }`}
              variant="outline"
              onClick={() => setSelectedRole("farmer")}
            >
              Farmer
            </Button>

            <Button
              className={`flex-1 ${
                selectedRole === "buyer" ? "bg-emerald-600 text-white" : ""
              }`}
              variant="outline"
              onClick={() => setSelectedRole("buyer")}
            >
              Buyer
            </Button>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2">
            {selectedRole === "farmer"
              ? "Farmer Account"
              : "Buyer Account"}
          </h2>

          <p className="text-center text-gray-500 mb-4">
            {isLogin ? "Login to continue" : "Create your account"}
          </p>

          {/* Toggle Login / Signup */}
          <div className="flex mb-4">
            <Button
              className={`flex-1 ${
                isLogin ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>

            <Button
              className={`flex-1 ${
                !isLogin ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">

            {/* Name (Signup only) */}
            {!isLogin && (
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            )}

            {/* Phone */}
            <Input
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            {/* Password */}
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              {isLogin ? "Login" : "Create Account"}
            </Button>

          </form>

        </CardContent>
      </Card>
    </div>
  );
}