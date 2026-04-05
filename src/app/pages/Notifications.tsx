import { useState } from "react";
import { Bell, TrendingDown, Package, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface Notification {
  id: string;
  type: "price-drop" | "new-offer" | "high-demand" | "delivery" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: any;
  iconColor: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "price-drop",
    title: "Price Drop Alert!",
    message: "Fresh Tomatoes price dropped to ₹25/kg (was ₹28/kg) - Save 10%!",
    timestamp: "2 hours ago",
    read: false,
    icon: TrendingDown,
    iconColor: "text-green-600 bg-green-100",
  },
  {
    id: "2",
    type: "new-offer",
    title: "New Offer Received",
    message: "Restaurant 'Green Leaf' made an offer of ₹27/kg for your Red Onions (200 kg)",
    timestamp: "3 hours ago",
    read: false,
    icon: Package,
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    id: "3",
    type: "high-demand",
    title: "High Demand in Your Area",
    message: "Green Chilli demand increased by 40% near you.",
    timestamp: "5 hours ago",
    read: false,
    icon: TrendingDown,
    iconColor: "text-orange-600 bg-orange-100",
  },
  {
    id: "4",
    type: "delivery",
    title: "Order Delivered",
    message: "Your Fresh Spinach order has been delivered.",
    timestamp: "1 day ago",
    read: true,
    icon: CheckCircle,
    iconColor: "text-green-600 bg-green-100",
  },
];

export function Notifications() {
  const [notificationList, setNotificationList] = useState(initialNotifications);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => {
    const Icon = notification.icon;

    return (
      <Card className={`mb-3 rounded-xl shadow-sm hover:shadow-md transition-all ${!notification.read ? 'border-l-4 border-l-emerald-600 bg-emerald-50/30' : ''}`}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className={`h-10 w-10 rounded-full ${notification.iconColor} flex items-center justify-center`}>
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                {!notification.read && <div className="h-2 w-2 bg-emerald-600 rounded-full mt-2"></div>}
              </div>

              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400">{notification.timestamp}</span>

                {!notification.read && (
                  <Button
                    variant="link"
                    className="text-xs text-emerald-600 p-0"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header userRole="buyer" />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="text-emerald-600" />
              Notifications
            </h1>
            <p className="text-sm text-gray-500">Real-time updates & alerts</p>
          </div>

          {unreadCount > 0 && (
            <Badge className="bg-emerald-600">
              {unreadCount} New
            </Badge>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {notificationList.map(n => (
              <NotificationCard key={n.id} notification={n} />
            ))}
          </TabsContent>

          <TabsContent value="unread">
            {notificationList.filter(n => !n.read).map(n => (
              <NotificationCard key={n.id} notification={n} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1">
            Clear Read
          </Button>

          <Button
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </Button>
        </div>
      </div>

      <MobileNav userRole="buyer" />
    </div>
  );
}