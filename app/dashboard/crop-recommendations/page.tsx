"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, CloudSun, Droplet, MapPin, ThermometerSun } from "lucide-react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default function CropRecommendationsPage() {
  const [soilType, setSoilType] = useState("")
  const [location, setLocation] = useState("")
  const [area, setArea] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowResults(true)
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Crop Recommendations</h1>

        {!showResults ? (
          <Card>
            <CardHeader>
              <CardTitle>Get Personalized Crop Recommendations</CardTitle>
              <CardDescription>
                Enter your farm details to receive crop recommendations based on soil type, location, and current
                weather conditions
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soil-type">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType} required>
                      <SelectTrigger id="soil-type">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay Soil</SelectItem>
                        <SelectItem value="sandy">Sandy Soil</SelectItem>
                        <SelectItem value="loamy">Loamy Soil</SelectItem>
                        <SelectItem value="silty">Silty Soil</SelectItem>
                        <SelectItem value="peaty">Peaty Soil</SelectItem>
                        <SelectItem value="chalky">Chalky Soil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={location} onValueChange={setLocation} required>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select your location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hyderabad">Hyderabad, Telangana</SelectItem>
                        <SelectItem value="vijayawada">Vijayawada, Andhra Pradesh</SelectItem>
                        <SelectItem value="bangalore">Bangalore, Karnataka</SelectItem>
                        <SelectItem value="chennai">Chennai, Tamil Nadu</SelectItem>
                        <SelectItem value="mumbai">Mumbai, Maharashtra</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Farm Area (in acres)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Enter farm area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      min="0.1"
                      step="0.1"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="water-source">Water Source</Label>
                    <Select>
                      <SelectTrigger id="water-source">
                        <SelectValue placeholder="Select water source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="well">Well</SelectItem>
                        <SelectItem value="borewell">Borewell</SelectItem>
                        <SelectItem value="canal">Canal</SelectItem>
                        <SelectItem value="rain">Rainwater</SelectItem>
                        <SelectItem value="river">River</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Get Recommendations
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <WeatherCard />
              <SoilInfoCard soilType={soilType} />
              <WaterRequirementCard />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Crops</CardTitle>
                <CardDescription>Based on your soil type, location, and current weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="primary">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="primary">Primary Crops</TabsTrigger>
                    <TabsTrigger value="alternative">Alternative Crops</TabsTrigger>
                    <TabsTrigger value="intercrop">Intercropping Options</TabsTrigger>
                  </TabsList>

                  <TabsContent value="primary" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <CropCard
                        name="Rice (Paddy)"
                        confidence={95}
                        description="Ideal for your clay soil and current rainfall patterns"
                        waterNeeds="High"
                        growthPeriod="120-150 days"
                        expectedYield="25-30 quintals/acre"
                      />
                      <CropCard
                        name="Cotton"
                        confidence={88}
                        description="Well-suited for your soil type and climate conditions"
                        waterNeeds="Medium"
                        growthPeriod="160-180 days"
                        expectedYield="8-10 quintals/acre"
                      />
                      <CropCard
                        name="Sugarcane"
                        confidence={82}
                        description="Good option with current temperature and water availability"
                        waterNeeds="High"
                        growthPeriod="12-18 months"
                        expectedYield="350-400 quintals/acre"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="alternative" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <CropCard
                        name="Maize"
                        confidence={78}
                        description="Good alternative with moderate water requirements"
                        waterNeeds="Medium"
                        growthPeriod="90-120 days"
                        expectedYield="20-25 quintals/acre"
                      />
                      <CropCard
                        name="Groundnut"
                        confidence={75}
                        description="Suitable for your soil type with less water requirement"
                        waterNeeds="Low-Medium"
                        growthPeriod="120-140 days"
                        expectedYield="8-12 quintals/acre"
                      />
                      <CropCard
                        name="Soybean"
                        confidence={72}
                        description="Good for soil health and moderate returns"
                        waterNeeds="Medium"
                        growthPeriod="90-120 days"
                        expectedYield="10-15 quintals/acre"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="intercrop" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <CropCard
                        name="Rice + Pulses"
                        confidence={85}
                        description="Pulses can be grown on bunds of rice fields"
                        waterNeeds="Varies"
                        growthPeriod="90-120 days"
                        expectedYield="Combined higher returns"
                      />
                      <CropCard
                        name="Cotton + Moong"
                        confidence={80}
                        description="Moong can be grown between cotton rows"
                        waterNeeds="Medium"
                        growthPeriod="Cotton: 160-180 days, Moong: 60-70 days"
                        expectedYield="Additional income from moong"
                      />
                      <CropCard
                        name="Sugarcane + Vegetables"
                        confidence={75}
                        description="Short-duration vegetables between sugarcane rows"
                        waterNeeds="High"
                        growthPeriod="Varies by vegetable"
                        expectedYield="Additional income from vegetables"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  Back to Form
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">View Detailed Analysis</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function WeatherCard() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Current Weather</h3>
          <CloudSun className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold">32°C</p>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 text-gray-500 mr-1" />
              <p className="text-xs text-gray-500">Hyderabad, Telangana</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">Partly Cloudy</p>
            <p className="text-xs text-gray-500">Feels like 34°C</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-500">Humidity</p>
            <p className="font-medium">65%</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-500">Wind</p>
            <p className="font-medium">12 km/h</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-500">Rain</p>
            <p className="font-medium">20%</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-xs font-medium mb-1">5-Day Forecast</h4>
          <div className="flex justify-between text-xs">
            <div className="text-center">
              <p>Mon</p>
              <ThermometerSun className="h-3 w-3 mx-auto my-1" />
              <p>33°C</p>
            </div>
            <div className="text-center">
              <p>Tue</p>
              <CloudSun className="h-3 w-3 mx-auto my-1" />
              <p>31°C</p>
            </div>
            <div className="text-center">
              <p>Wed</p>
              <Droplet className="h-3 w-3 mx-auto my-1" />
              <p>29°C</p>
            </div>
            <div className="text-center">
              <p>Thu</p>
              <CloudSun className="h-3 w-3 mx-auto my-1" />
              <p>30°C</p>
            </div>
            <div className="text-center">
              <p>Fri</p>
              <ThermometerSun className="h-3 w-3 mx-auto my-1" />
              <p>32°C</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SoilInfoCard({ soilType }) {
  const getSoilInfo = (type) => {
    const soilTypes = {
      clay: {
        description: "Clay soil has small particles that stick together. It holds water well but drains slowly.",
        suitable: "Rice, Cotton, Sugarcane",
        ph: "6.5 - 7.5",
      },
      sandy: {
        description: "Sandy soil has large particles with lots of air spaces. It drains quickly and warms up fast.",
        suitable: "Groundnut, Potato, Carrot",
        ph: "5.5 - 6.5",
      },
      loamy: {
        description: "Loamy soil is a mixture of sand, silt, and clay. It's fertile and drains well.",
        suitable: "Most crops",
        ph: "6.0 - 7.0",
      },
      silty: {
        description: "Silty soil has medium-sized particles. It's fertile and holds moisture well.",
        suitable: "Vegetables, Berries, Fruit trees",
        ph: "6.0 - 7.0",
      },
      peaty: {
        description: "Peaty soil is high in organic matter. It holds water well but can be acidic.",
        suitable: "Vegetables, Fruit crops",
        ph: "5.0 - 6.0",
      },
      chalky: {
        description: "Chalky soil is alkaline and often stony. It drains freely and warms up quickly.",
        suitable: "Spinach, Beets, Cabbage",
        ph: "7.0 - 8.0",
      },
    }

    return (
      soilTypes[type] || {
        description: "Information not available for the selected soil type.",
        suitable: "N/A",
        ph: "N/A",
      }
    )
  }

  const info = getSoilInfo(soilType)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Soil Information</h3>
          <Leaf className="h-5 w-5 text-green-500" />
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Soil Type:</p>
            <p className="text-sm capitalize">{soilType || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Description:</p>
            <p className="text-xs text-gray-600">{info.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium">pH Level:</p>
            <p className="text-sm">{info.ph}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Suitable Crops:</p>
            <p className="text-sm">{info.suitable}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WaterRequirementCard() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Water Availability</h3>
          <Droplet className="h-5 w-5 text-blue-500" />
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Current Status:</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Low</span>
              <span className="text-blue-600 font-medium">Adequate</span>
              <span>High</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Rainfall Forecast:</p>
            <p className="text-sm">Moderate rainfall expected in the next 15 days</p>
          </div>
          <div>
            <p className="text-sm font-medium">Irrigation Requirement:</p>
            <p className="text-sm">Medium - Supplemental irrigation recommended</p>
          </div>
          <div>
            <p className="text-sm font-medium">Water Conservation Tips:</p>
            <ul className="text-xs text-gray-600 list-disc list-inside">
              <li>Use drip irrigation where possible</li>
              <li>Mulch around plants to reduce evaporation</li>
              <li>Water during early morning or evening</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CropCard({ name, confidence, description, waterNeeds, growthPeriod, expectedYield }) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-green-50 p-3 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{name}</h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">{confidence}% match</span>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <p className="text-sm text-gray-600">{description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="font-medium">Water Needs:</p>
            <p>{waterNeeds}</p>
          </div>
          <div>
            <p className="font-medium">Growth Period:</p>
            <p>{growthPeriod}</p>
          </div>
          <div>
            <p className="font-medium">Expected Yield:</p>
            <p>{expectedYield}</p>
          </div>
          <div>
            <p className="font-medium">Best Planting Time:</p>
            <p>June-July</p>
          </div>
        </div>

        <Button variant="outline" className="w-full text-xs h-8 mt-2">
          View Detailed Guide
        </Button>
      </CardContent>
    </Card>
  )
}
