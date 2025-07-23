"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Leaf, CloudSun, Droplet, MapPin } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    setUser(JSON.parse(userData))
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name || "Farmer"}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <WeatherCard />
          <SoilMoistureCard />
          <MarketPriceCard />
        </div>

        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="recommendations">Crop Recommendations</TabsTrigger>
            <TabsTrigger value="schedule">Crop Schedule</TabsTrigger>
            <TabsTrigger value="market">Market Prices</TabsTrigger>
            <TabsTrigger value="schemes">Govt. Schemes</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Crops for Your Region</CardTitle>
                <CardDescription>Based on your soil type and local weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CropRecommendationCard
                    name="Rice"
                    confidence={95}
                    description="Ideal for your clay soil and current rainfall patterns"
                  />
                  <CropRecommendationCard
                    name="Wheat"
                    confidence={85}
                    description="Good option with moderate water requirements"
                  />
                  <CropRecommendationCard
                    name="Pulses"
                    confidence={80}
                    description="Low water requirement and good for soil health"
                  />
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Get Detailed Recommendations</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Crop Schedule</CardTitle>
                <CardDescription>Upcoming activities for your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ScheduleItem date="Today" task="Apply organic fertilizer to rice fields" priority="High" />
                  <ScheduleItem date="Tomorrow" task="Check for pest infestation in wheat crops" priority="Medium" />
                  <ScheduleItem date="May 15, 2023" task="Prepare land for next season planting" priority="Low" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market">
            <Card>
              <CardHeader>
                <CardTitle>Market Prices</CardTitle>
                <CardDescription>Current prices for major crops in your region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <MarketPriceItem crop="Rice" price="₹2,200/quintal" trend="up" change="+₹120" />
                  <MarketPriceItem crop="Wheat" price="₹2,015/quintal" trend="down" change="-₹45" />
                  <MarketPriceItem crop="Maize" price="₹1,850/quintal" trend="up" change="+₹75" />
                  <MarketPriceItem crop="Soybean" price="₹3,950/quintal" trend="stable" change="₹0" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schemes">
            <Card>
              <CardHeader>
                <CardTitle>Government Schemes</CardTitle>
                <CardDescription>Latest agricultural schemes and subsidies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <SchemeItem
                    name="PM-KISAN"
                    description="Direct income support of ₹6,000 per year to farmer families"
                    deadline="Ongoing"
                  />
                  <SchemeItem
                    name="Soil Health Card Scheme"
                    description="Free soil testing and recommendations for farmers"
                    deadline="Apply by June 30, 2023"
                  />
                  <SchemeItem
                    name="Pradhan Mantri Fasal Bima Yojana"
                    description="Crop insurance scheme with minimal premium"
                    deadline="Before crop sowing"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function WeatherCard() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Weather</p>
            <h3 className="text-2xl font-bold">32°C</h3>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 text-gray-500 mr-1" />
              <p className="text-xs text-gray-500">Hyderabad, Telangana</p>
            </div>
          </div>
          <CloudSun className="h-10 w-10 text-yellow-500" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <p className="text-gray-500">Humidity</p>
            <p className="font-medium">65%</p>
          </div>
          <div>
            <p className="text-gray-500">Wind</p>
            <p className="font-medium">12 km/h</p>
          </div>
          <div>
            <p className="text-gray-500">Rain</p>
            <p className="font-medium">20%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SoilMoistureCard() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Soil Moisture</p>
            <h3 className="text-2xl font-bold">42%</h3>
            <p className="text-xs text-green-600">Optimal Range</p>
          </div>
          <Droplet className="h-10 w-10 text-blue-500" />
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "42%" }}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Dry</span>
            <span>Optimal</span>
            <span>Wet</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MarketPriceCard() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Today's Market</p>
            <h3 className="text-2xl font-bold">Rice</h3>
            <p className="text-xs text-green-600">₹2,200/quintal</p>
          </div>
          <Leaf className="h-10 w-10 text-green-500" />
        </div>
        <div className="mt-4 text-xs">
          <p className="text-gray-500 mb-1">Other crops:</p>
          <div className="flex justify-between">
            <span>Wheat: ₹2,015</span>
            <span>Maize: ₹1,850</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CropRecommendationCard({ name, confidence, description }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-2">
        <Leaf className="h-5 w-5 text-green-500 mr-2" />
        <h3 className="font-semibold">{name}</h3>
      </div>
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${confidence}%` }}></div>
        </div>
        <p className="text-xs text-right mt-1">{confidence}% match</p>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  )
}

function ScheduleItem({ date, task, priority }) {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="flex items-start border-b pb-3">
      <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium mr-4 min-w-[100px] text-center">
        {date}
      </div>
      <div className="flex-1">
        <p className="text-sm">{task}</p>
        <p className={`text-xs font-medium ${getPriorityColor(priority)}`}>{priority} Priority</p>
      </div>
    </div>
  )
}

function MarketPriceItem({ crop, price, trend, change }) {
  const getTrendIcon = (trend) => {
    switch (trend.toLowerCase()) {
      case "up":
        return <span className="text-green-600">↑</span>
      case "down":
        return <span className="text-red-600">↓</span>
      default:
        return <span className="text-gray-600">→</span>
    }
  }

  const getTrendColor = (trend) => {
    switch (trend.toLowerCase()) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div className="flex items-center">
        <Leaf className="h-5 w-5 text-green-500 mr-2" />
        <span className="font-medium">{crop}</span>
      </div>
      <div className="text-right">
        <p className="font-medium">{price}</p>
        <p className={`text-xs ${getTrendColor(trend)}`}>
          {getTrendIcon(trend)} {change}
        </p>
      </div>
    </div>
  )
}

function SchemeItem({ name, description, deadline }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Deadline:</span>
        <span className="text-xs font-medium">{deadline}</span>
      </div>
    </div>
  )
}
