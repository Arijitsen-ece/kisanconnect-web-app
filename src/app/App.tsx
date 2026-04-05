/**
 * KisanConnect - Hyperlocal Farmer-Buyer Marketplace
 * 
 * A production-ready React application connecting farmers directly with nearby buyers.
 * 
 * KEY FEATURES:
 * ✅ 20+ realistic product listings with complete data
 * ✅ AI-powered price suggestions based on market trends
 * ✅ Smart demand indicators (High/Medium/Low)
 * ✅ Distance-aware product discovery
 * ✅ Farmer ratings & verified badges
 * ✅ Real-time search & filtering
 * ✅ Mobile-first responsive design with bottom navigation
 * ✅ Complete user flows (Farmer & Buyer)
 * ✅ Loading states, empty states, error handling
 * ✅ Toast notifications with feedback
 * ✅ Professional UI with smooth animations
 * 
 * PAGES:
 * - Landing Page (/) - Hero, features, benefits, stats
 * - Auth (/auth) - Role selection (Farmer/Buyer)
 * - Buyer Dashboard (/buyer-dashboard) - Product discovery with filters
 * - Farmer Dashboard (/farmer-dashboard) - Listings, offers, add products
 * - Product Detail (/product/:id) - Full product info, make offers
 * - Notifications (/notifications) - Price drops, offers, alerts
 * - Profile (/profile) - User info, orders, saved products
 * - Analytics (/analytics) - Market trends & price charts
 * - Offers (/offers/:productId) - Bidding interface
 * 
 * TECH STACK:
 * - React 18 + TypeScript
 * - React Router (Data mode)
 * - Tailwind CSS v4
 * - Lucide Icons
 * - Recharts (analytics)
 * - Sonner (toasts)
 * - shadcn/ui components
 */

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
