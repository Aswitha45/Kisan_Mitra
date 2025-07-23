"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Leaf,
  Menu,
  Home,
  SproutIcon as SeedlingIcon,
  Calendar,
  PiggyBank,
  ShoppingCart,
  FileText,
  Recycle,
  CloudSun,
  LogOut,
  X,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import ChatbotButton from "@/components/chatbot/chatbot-button"

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    {
      name: "Crop Recommendations",
      href: "/dashboard/crop-recommendations",
      icon: <SeedlingIcon className="h-5 w-5" />,
    },
    { name: "Smart Cropping", href: "/dashboard/smart-cropping", icon: <Calendar className="h-5 w-5" /> },
    { name: "Budget Planning", href: "/dashboard/budget-planning", icon: <PiggyBank className="h-5 w-5" /> },
    { name: "Marketplace", href: "/dashboard/marketplace", icon: <ShoppingCart className="h-5 w-5" /> },
    { name: "Loans", href: "/dashboard/loans", icon: <FileText className="h-5 w-5" /> },
    { name: "Byproducts", href: "/dashboard/byproducts", icon: <Recycle className="h-5 w-5" /> },
    { name: "Weather", href: "/dashboard/weather", icon: <CloudSun className="h-5 w-5" /> },
    { name: "Government Schemes", href: "/dashboard/government-schemes", icon: <FileText className="h-5 w-5" /> },
  ]

  const NavLink = ({ item, onClick }) => {
    const isActive = pathname === item.href

    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          isActive ? "bg-green-100 text-green-800" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {item.icon}
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            {isMobile && (
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center">
                        <Leaf className="h-6 w-6 text-green-600 mr-2" />
                        <h1 className="text-xl font-bold text-green-800">KISAN MITRA</h1>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-4 px-3 space-y-1">
                      {navItems.map((item) => (
                        <NavLink key={item.name} item={item} onClick={() => setIsSheetOpen(false)} />
                      ))}
                    </div>
                    <div className="p-4 border-t">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}

            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-green-600 mr-2" />
              <h1 className="text-xl font-bold text-green-800">KISAN MITRA</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-green-200 text-green-800">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline">{user.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        {!isMobile && (
          <aside className="w-64 bg-white border-r h-[calc(100vh-57px)] sticky top-[57px] overflow-y-auto">
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}

              <div className="pt-4 mt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>

      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
  )
}
