import { Home, Search, Plus, Bell, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

interface MobileNavProps {
  userRole: "farmer" | "buyer";
}

export function MobileNav({ userRole }: MobileNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const farmerItems = [
    { icon: Home, label: "Home", path: "/farmer-dashboard" },
    { icon: Plus, label: "Add", path: "/farmer-dashboard?tab=add" },
    { icon: Bell, label: "Alerts", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  // ✅ FIXED HERE
  const buyerItems = [
    { icon: Home, label: "Home", path: "/buyer-dashboard" },
    { icon: Search, label: "Search", path: "/search" }, // ✅ changed
    { icon: Bell, label: "Alerts", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const items = userRole === "farmer" ? farmerItems : buyerItems;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {items.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path); // ✅ improved

          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-emerald-600"
                  : "text-gray-600 active:text-emerald-600"
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? "fill-emerald-600" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}