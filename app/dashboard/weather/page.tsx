"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { CloudRain, Thermometer, Wind, Droplets, Leaf, Tractor, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function WeatherPage() {
  const { t } = useLanguage()
  const [selectedDay, setSelectedDay] = useState(0)

  // Mock weather data
  const currentWeather = {
    temperature: "32°C",
    condition: "Sunny",
    humidity: "65%",
    rainfall: "0 mm",
    windSpeed: "10 km/h",
    alerts: [],
  }

  const forecast = [
    {
      day: "Today",
      date: "Jul 23",
      temperature: "32°C",
      condition: "Sunny",
      humidity: "65%",
      rainfall: "0 mm",
      windSpeed: "10 km/h",
    },
    {
      day: "Tomorrow",
      date: "Jul 24",
      temperature: "30°C",
      condition: "Partly Cloudy",
      humidity: "70%",
      rainfall: "0 mm",
      windSpeed: "12 km/h",
    },
    {
      day: "Wednesday",
      date: "Jul 25",
      temperature: "29°C",
      condition: "Cloudy",
      humidity: "75%",
      rainfall: "30%",
      windSpeed: "15 km/h",
    },
    {
      day: "Thursday",
      date: "Jul 26",
      temperature: "28°C",
      condition: "Light Rain",
      humidity: "80%",
      rainfall: "5 mm",
      windSpeed: "18 km/h",
    },
    {
      day: "Friday",
      date: "Jul 27",
      temperature: "29°C",
      condition: "Sunny",
      humidity: "70%",
      rainfall: "0 mm",
      windSpeed: "8 km/h",
    },
  ]

  const weatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "☀️"
      case "partly cloudy":
        return "⛅"
      case "cloudy":
        return "☁️"
      case "light rain":
        return "🌧️"
      default:
        return "☀️"
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("weather.title")}</h1>
      <p className="text-gray-500 mb-6">{t("weather.description")}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("weather.currentWeather")}</CardTitle>
            <CardDescription>July 23, 2025 - Hyderabad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-6xl mb-4">{weatherIcon(currentWeather.condition)}</div>
              <div className="text-4xl font-bold mb-2">{currentWeather.temperature}</div>
              <div className="text-lg text-gray-600 mb-6">{currentWeather.condition}</div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">
                    {t("weather.temperature")}: {currentWeather.temperature}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">
                    {t("weather.humidity")}: {currentWeather.humidity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">
                    {t("weather.rainfall")}: {currentWeather.rainfall}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">
                    {t("weather.windSpeed")}: {currentWeather.windSpeed}
                  </span>
                </div>
              </div>

              {currentWeather.alerts.length > 0 && (
                <div className="mt-6 w-full">
                  <h3 className="font-medium mb-2">{t("weather.weatherAlerts")}</h3>
                  {currentWeather.alerts.map((alert, index) => (
                    <Badge key={index} variant="destructive" className="mb-1">
                      {alert}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("weather.forecast")}</CardTitle>
            <CardDescription>5-day weather forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {forecast.map((day, index) => (
                <Button
                  key={index}
                  variant={selectedDay === index ? "default" : "outline"}
                  className="flex flex-col items-center h-auto py-2"
                  onClick={() => setSelectedDay(index)}
                >
                  <span>{day.day}</span>
                  <span className="text-sm opacity-70">{day.date}</span>
                  <span className="text-xl my-1">{weatherIcon(day.condition)}</span>
                  <span>{day.temperature}</span>
                </Button>
              ))}
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium">
                    {forecast[selectedDay].day}, {forecast[selectedDay].date}
                  </h3>
                  <p className="text-gray-500">{forecast[selectedDay].condition}</p>
                </div>
                <div className="text-4xl">{weatherIcon(forecast[selectedDay].condition)}</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Thermometer className="h-6 w-6 text-gray-700 mb-1" />
                  <span className="text-sm text-gray-500">{t("weather.temperature")}</span>
                  <span className="font-medium">{forecast[selectedDay].temperature}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Droplets className="h-6 w-6 text-gray-700 mb-1" />
                  <span className="text-sm text-gray-500">{t("weather.humidity")}</span>
                  <span className="font-medium">{forecast[selectedDay].humidity}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <CloudRain className="h-6 w-6 text-gray-700 mb-1" />
                  <span className="text-sm text-gray-500">{t("weather.rainfall")}</span>
                  <span className="font-medium">{forecast[selectedDay].rainfall}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Wind className="h-6 w-6 text-gray-700 mb-1" />
                  <span className="text-sm text-gray-500">{t("weather.windSpeed")}</span>
                  <span className="font-medium">{forecast[selectedDay].windSpeed}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agricultural Impact */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>{t("weather.agriculturalImpact")}</CardTitle>
            <CardDescription>Weather impact on your farming activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="crop-impact">
              <TabsList className="mb-4">
                <TabsTrigger value="crop-impact">{t("weather.cropImpact")}</TabsTrigger>
                <TabsTrigger value="farming-activities">{t("weather.farmingActivities")}</TabsTrigger>
                <TabsTrigger value="irrigation-needs">{t("weather.irrigationNeeds")}</TabsTrigger>
              </TabsList>
              <TabsContent value="crop-impact">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Leaf className="h-10 w-10 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Rice</h3>
                      <p className="text-sm text-gray-600">
                        Current weather conditions are favorable for rice growth. The high humidity and moderate
                        temperatures support healthy development. Monitor for any fungal diseases due to humidity
                        levels.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Leaf className="h-10 w-10 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Cotton</h3>
                      <p className="text-sm text-gray-600">
                        The sunny conditions are excellent for cotton growth. The forecast rain on Thursday may benefit
                        flowering cotton plants. Continue regular pest monitoring under these warm conditions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Leaf className="h-10 w-10 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Vegetables</h3>
                      <p className="text-sm text-gray-600">
                        Maintain adequate irrigation for vegetable crops during these hot conditions. The upcoming light
                        rain may provide some relief, but supplemental irrigation will be necessary.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="farming-activities">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Tractor className="h-10 w-10 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Recommended Activities: July 23-24</h3>
                      <ul className="list-disc ml-5 text-sm text-gray-600 space-y-2">
                        <li>Ideal conditions for harvesting mature crops</li>
                        <li>Good time for pesticide application (no rain expected)</li>
                        <li>Complete any field preparation activities</li>
                        <li>Monitor irrigation systems during high temperatures</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Tractor className="h-10 w-10 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Plan Ahead: July 25-27</h3>
                      <ul className="list-disc ml-5 text-sm text-gray-600 space-y-2">
                        <li>Delay pesticide application on Thursday due to forecast rain</li>
                        <li>Check drainage systems before Thursday's expected rainfall</li>
                        <li>Plan indoor activities for Thursday</li>
                        <li>Good conditions for planting after Thursday's rain</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="irrigation-needs">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                      Irrigation Schedule Recommendation
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 px-3 text-left">Day</th>
                            <th className="py-2 px-3 text-left">Rice</th>
                            <th className="py-2 px-3 text-left">Cotton</th>
                            <th className="py-2 px-3 text-left">Vegetables</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-3">July 23 (Today)</td>
                            <td className="py-2 px-3">Medium (15mm)</td>
                            <td className="py-2 px-3">Medium (12mm)</td>
                            <td className="py-2 px-3">High (20mm)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-3">July 24</td>
                            <td className="py-2 px-3">Medium (15mm)</td>
                            <td className="py-2 px-3">Medium (12mm)</td>
                            <td className="py-2 px-3">High (20mm)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-3">July 25</td>
                            <td className="py-2 px-3">Low (10mm)</td>
                            <td className="py-2 px-3">Low (8mm)</td>
                            <td className="py-2 px-3">Medium (15mm)</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-3">July 26</td>
                            <td className="py-2 px-3">None (Rainfall)</td>
                            <td className="py-2 px-3">None (Rainfall)</td>
                            <td className="py-2 px-3">None (Rainfall)</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">July 27</td>
                            <td className="py-2 px-3">Medium (15mm)</td>
                            <td className="py-2 px-3">Medium (12mm)</td>
                            <td className="py-2 px-3">High (18mm)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      <strong>Note:</strong> Adjust irrigation based on actual rainfall received. The light rain
                      forecast for Thursday may not be sufficient for all crops.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
