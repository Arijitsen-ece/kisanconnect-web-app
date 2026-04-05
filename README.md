# KisanConnect - Hyperlocal Farmer-Buyer Marketplace

**KisanConnect** is India's first hyperlocal marketplace connecting farmers directly with nearby buyers (restaurants, shops, vendors) to eliminate middlemen and improve farmer profits.

## 🌾 Key Features

### Smart & Intelligent Features
- **AI Price Suggestions** - Real-time price recommendations based on local market trends with confidence levels
- **Demand Indicators** - Color-coded badges (High/Medium/Low) showing market demand
- **Distance Awareness** - Shows exact distance and estimated travel time
- **Urgency Labels** - Visual tags for "Urgent Sale" and "Sell Today" products
- **Trust System** - Farmer ratings (stars), verified badges, and review counts
- **Real-time Filtering** - Search and filter by price, distance, category, and demand

### Complete User Journeys

#### For Farmers
- Product listing with AI price suggestions
- Offer management system
- Dashboard with stats (active listings, total offers, avg price)
- Profile & rating system
- Notification center for new offers

#### For Buyers  
- Product discovery with multiple filters
- Recommended products section
- Nearby products (within 5km)
- Urgent deals section
- Make offers and negotiate prices
- Direct contact (Call/WhatsApp)
- Profile with order history

### Pages & Navigation

1. **Landing Page** (/): Hero section, features, benefits, stats, how it works
2. **Authentication** (/auth): Role selection (Farmer/Buyer)
3. **Farmer Dashboard** (/farmer-dashboard): 
   - My Listings tab
   - Offers Received tab
   - Add Product tab with price suggestions
4. **Buyer Dashboard** (/buyer-dashboard):
   - Recommended products
   - Nearby products
   - Urgent deals
   - Complete product grid (20+ products)
5. **Product Detail** (/product/:id): Full product info, farmer profile, make offer
6. **Notifications** (/notifications): Price drops, new offers, market alerts
7. **Profile** (/profile): User info, order history, saved products, settings
8. **Analytics** (/analytics): Market trends, price charts
9. **Offers** (/offers/:productId): Bidding interface

### Mobile Experience
- **Bottom Navigation Bar** with 4 tabs:
  - Home
  - Search / Add Product
  - Alerts
  - Profile
- Active tab highlighting
- Touch-friendly buttons (h-12 / h-14)
- Responsive grid layouts
- Mobile-optimized forms

## 📊 Product Data

**20+ Realistic Products** including:
- Fresh Tomatoes, Potatoes, Onions
- Organic Wheat
- Leafy Greens (Spinach, Coriander, Mint)
- Vegetables (Cauliflower, Capsicum, Carrots, Cabbage, Brinjal, etc.)
- Specialty items (Green Chilli, Sweet Corn, Cucumber)

Each product includes:
- Price (₹15-₹60/kg realistic range)
- Quantity available
- Farmer name, rating & reviews
- Location & distance (2-10 km)
- Harvest date
- Demand level (High/Medium/Low)
- Urgency tags
- Quality grades
- Packaging details

## 🎨 Design System

### Colors
- Primary: Emerald/Green (#10b981)
- Backgrounds: White, Gray-50, Emerald-50
- Text: Gray-900 (headings), Gray-600 (body)
- Accents: Blue (verified), Amber (ratings), Red (urgent)

### Components
- **Cards**: Hover effects, shadow transitions
- **Badges**: Color-coded for status
- **Buttons**: Large (h-12/h-14), clear CTAs
- **Icons**: Lucide React icons throughout
- **Loading States**: Skeleton screens
- **Empty States**: Friendly messages with icons

### Typography
- Headings: Bold, 2xl to 5xl
- Body: Base to lg, relaxed leading
- Accessible: Large text for rural users

## 🚀 Technologies

- **React 18** with TypeScript
- **React Router** (Data mode)
- **Tailwind CSS v4**
- **Lucide Icons**
- **Recharts** (for analytics)
- **Sonner** (toast notifications)
- **shadcn/ui** components

## 📱 Responsive Design

- **Mobile-first** approach
- Grid layouts: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- Breakpoints: sm, md, lg
- Bottom nav on mobile, header nav on desktop
- Touch-friendly: Large buttons, easy forms

## ✨ UX Highlights

- **Loading States**: Skeleton screens during data fetch
- **Empty States**: "No products found" with helpful CTAs
- **Micro-interactions**: Hover scale effects, smooth transitions
- **Toast Notifications**: Emoji-rich feedback messages
- **Active Filters**: Visual chips with remove buttons
- **Smart Sorting**: Distance, price (↑↓), rating
- **Real-time Search**: Instant filtering as you type

## 🎯 Production-Ready Features

- Clean, maintainable code structure
- Centralized data management (/src/app/data/)
- Reusable components
- Consistent spacing & styling
- Accessibility considerations
- Performance optimized
- SEO-friendly structure

## 🌟 Why It's Production-Ready

1. **Complete Feature Set**: All 8 screens implemented
2. **Realistic Data**: 20+ products with varied attributes
3. **Smart Features**: AI suggestions, demand indicators, distance aware
4. **Professional UI**: Polished, consistent, branded
5. **Mobile Optimized**: Bottom nav, responsive, touch-friendly
6. **User-Centric**: Loading states, empty states, clear feedback
7. **Scalable Architecture**: Clean code, reusable components

---

**Built for India's farmers and buyers to transform agriculture through direct connections.**
