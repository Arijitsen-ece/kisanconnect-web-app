import { Link, useNavigate, useLocation } from "react-router";
import { Bell, Menu, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

interface HeaderProps {
  userRole?: "farmer" | "buyer" | null;
}

export function Header({ userRole }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* 🔷 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
            KC
          </div>
          <span className="font-bold text-lg text-gray-900">
            KisanConnect
          </span>
        </Link>

        {userRole && (
          <div className="flex items-center gap-2">

            {/* 🔔 Notifications */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
              className="hover:bg-gray-100"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* 📊 Analytics */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/analytics")}
              className="hover:bg-gray-100"
            >
              <BarChart3 className="h-5 w-5" />
            </Button>

            {/* ☰ Sidebar Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-72 p-0 bg-white">

                {/* 🔹 Sidebar Header */}
                <div className="flex items-center gap-3 px-4 py-4 border-b">
                  <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    KC
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      KisanConnect
                    </p>
                    <p className="text-xs text-gray-500">
                      Smart Marketplace
                    </p>
                  </div>
                </div>

                {/* 🔹 Menu Items */}
                <div className="mt-4 flex flex-col gap-1 px-2">

                  {/* Dashboard */}
                  <div
                    onClick={() =>
                      navigate(
                        userRole === "farmer"
                          ? "/farmer-dashboard"
                          : "/buyer-dashboard"
                      )
                    }
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                      location.pathname.includes("dashboard")
                        ? "bg-emerald-100 text-emerald-700"
                        : "hover:bg-emerald-50"
                    }`}
                  >
                    🏠 <span className="font-medium">Dashboard</span>
                  </div>

                  {/* Analytics */}
                  <div
                    onClick={() => navigate("/analytics")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                      location.pathname === "/analytics"
                        ? "bg-emerald-100 text-emerald-700"
                        : "hover:bg-emerald-50"
                    }`}
                  >
                    📊 <span className="font-medium">Analytics</span>
                  </div>

                  {/* Notifications */}
                  <div
                    onClick={() => navigate("/notifications")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                      location.pathname === "/notifications"
                        ? "bg-emerald-100 text-emerald-700"
                        : "hover:bg-emerald-50"
                    }`}
                  >
                    🔔 <span className="font-medium">Notifications</span>
                  </div>

                  {/* Divider */}
                  <div className="my-3 border-t"></div>

                  {/* Logout */}
                  <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-red-50 text-red-500 transition"
                  >
                    🚪 <span className="font-medium">Logout</span>
                  </div>

                </div>
              </SheetContent>
            </Sheet>

          </div>
        )}
      </div>
    </header>
  );
}