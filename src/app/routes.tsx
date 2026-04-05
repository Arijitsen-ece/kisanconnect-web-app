import { createBrowserRouter } from "react-router";

import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { FarmerDashboard } from "./pages/FarmerDashboard";
import { BuyerDashboard } from "./pages/BuyerDashboard";
import { ProductDetail } from "./pages/ProductDetail";
import { OffersPage } from "./pages/OffersPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";

// ✅ ADD THIS
import SearchPage from "./pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/farmer-dashboard",
    Component: FarmerDashboard,
  },
  {
    path: "/buyer-dashboard",
    Component: BuyerDashboard,
  },

  // ✅ NEW SEARCH ROUTE
  {
    path: "/search",
    Component: SearchPage,
  },

  {
    path: "/product/:id",
    Component: ProductDetail,
  },
  {
    path: "/offers/:productId",
    Component: OffersPage,
  },
  {
    path: "/analytics",
    Component: AnalyticsPage,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);