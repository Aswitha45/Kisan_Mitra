"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Globe,
  Users,
  ArrowRight,
  CheckCircle,
  Smartphone,
  TrendingUp,
  BarChart3,
  UserPlus,
  LogIn,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function GetStartedPage() {
  const { language, setLanguage, t } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState(language)

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  ]

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode)
    setLanguage(langCode)
  }

  const features = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: t("features.smartFarming.title"),
      description: t("features.smartFarming.description"),
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t("features.marketAccess.title"),
      description: t("features.marketAccess.description"),
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t("features.dataAnalytics.title"),
      description: t("features.dataAnalytics.description"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-green-800">KISAN MITRA</span>
            </Link>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t("getStarted.step")} 1/2</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("getStarted.welcome")}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("getStarted.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Language Selection */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-xl">{t("getStarted.selectLanguage")}</CardTitle>
                </div>
                <CardDescription>{t("getStarted.languageDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedLanguage === lang.code
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-25"
                    }`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="font-medium text-gray-900">{lang.nativeName}</div>
                          <div className="text-sm text-gray-500">{lang.name}</div>
                        </div>
                      </div>
                      {selectedLanguage === lang.code && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Login Options */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-xl">{t("getStarted.chooseOption")}</CardTitle>
                </div>
                <CardDescription>{t("getStarted.optionDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/auth">
                  <div className="p-6 rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-25 cursor-pointer transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                          <UserPlus className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{t("getStarted.newUser")}</div>
                          <div className="text-sm text-gray-500">{t("getStarted.newUserDesc")}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </div>
                </Link>

                <Link href="/auth">
                  <div className="p-6 rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-25 cursor-pointer transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                          <LogIn className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{t("getStarted.existingUser")}</div>
                          <div className="text-sm text-gray-500">{t("getStarted.existingUserDesc")}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Features Preview */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{t("getStarted.whatYouGet")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-green-600">{feature.icon}</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center mt-12">
            <Link href="/auth">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                {t("getStarted.continue")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">{t("getStarted.freeToUse")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
