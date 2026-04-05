import { useState } from "react";
import { useNavigate } from "react-router";

import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { getUser, updateUser, logoutUser } from "../utils/auth";

export function Profile() {
  const navigate = useNavigate();

  const user = getUser() || {
    name: "Guest User",
    role: "buyer",
    location: "India",
    phone: "+91 XXXXXXXX",
    email: "guest@email.com",
    rating: 4.0,
    bio: "No bio added",
    business: "Not specified",
    joined: "Jan 2026",
  };

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location,
    phone: user.phone,
    email: user.email,
    bio: user.bio,
    business: user.business,
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header userRole={user.role} />

      <div className="container mx-auto px-4 py-6">

        {/* 🔹 MAIN PROFILE CARD */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">

            <div className="flex flex-col md:flex-row md:justify-between gap-6">

              {/* LEFT */}
              <div className="flex gap-5">

                {/* Avatar */}
                <div className="h-20 w-20 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0)}
                </div>

                {/* Info */}
                <div className="space-y-1">

                  {isEditing ? (
                    <>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />

                      <Input
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-gray-600 capitalize">{user.role}</p>
                      <p className="text-sm text-gray-500">{user.location}</p>
                    </>
                  )}

                  {/* Extra Info */}
                  <div className="flex gap-3 text-xs mt-2">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      ⭐ {user.rating}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      Joined {user.joined}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  </div>

                </div>
              </div>

              {/* EDIT BUTTON */}
              <div>
                {isEditing ? (
                  <Button onClick={handleSave} className="bg-emerald-600 text-white">
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>

            </div>

            {/* 🔹 CONTACT */}
            <div className="mt-6 border-t pt-4 space-y-3">

              <h3 className="font-semibold text-gray-700">Contact Info</h3>

              {isEditing ? (
                <>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />

                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <p>📞 {user.phone}</p>
                  <p>📧 {user.email}</p>
                </>
              )}
            </div>

            {/* 🔹 BUSINESS INFO */}
            <div className="mt-6 border-t pt-4 space-y-3">

              <h3 className="font-semibold text-gray-700">Business Info</h3>

              {isEditing ? (
                <>
                  <Input
                    value={formData.business}
                    onChange={(e) =>
                      setFormData({ ...formData, business: e.target.value })
                    }
                    placeholder="Business Type (Farmer / Shop / Restaurant)"
                  />

                  <Input
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Short Bio"
                  />
                </>
              ) : (
                <>
                  <p>🏢 {user.business}</p>
                  <p className="text-gray-600">{user.bio}</p>
                </>
              )}
            </div>

          </CardContent>
        </Card>

        {/* 🔹 STATS */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">

          <Card>
            <CardContent className="p-4">
              <p className="text-xl font-bold text-emerald-600">24</p>
              <p className="text-sm text-gray-500">Orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-xl font-bold text-emerald-600">8</p>
              <p className="text-sm text-gray-500">Saved</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-xl font-bold text-emerald-600">
                {user.rating}
              </p>
              <p className="text-sm text-gray-500">Rating</p>
            </CardContent>
          </Card>

        </div>

        {/* 🔹 LOGOUT */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => {
              logoutUser();
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>

      </div>

      <MobileNav userRole={user.role} />
    </div>
  );
}