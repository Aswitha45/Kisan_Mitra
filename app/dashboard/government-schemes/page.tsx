"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Info, CheckCircle2, User, FileText } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function GovernmentSchemesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data for government schemes
  const schemes = [
    {
      id: 1,
      name: "PM-KISAN",
      description: "Direct income support to farmers with small and marginal landholdings",
      category: "subsidies",
      eligibility: "Farmers with up to 2 hectares of cultivable land",
      benefits: "₹6,000 per year in three equal installments",
      documents: ["Land records", "Aadhaar Card", "Bank account details"],
      deadline: "Continuous enrollment",
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme to provide financial support to farmers suffering crop loss/damage",
      category: "insurance",
      eligibility: "All farmers growing notified crops",
      benefits: "Coverage against crop loss due to natural calamities, pests & diseases",
      documents: ["Land records", "Aadhaar Card", "Bank account details", "Sowing certificate"],
      deadline: "Seasonal application periods",
    },
    {
      id: 3,
      name: "Kisan Credit Card",
      description: "Provides farmers with easy access to affordable credit",
      category: "loans",
      eligibility: "All farmers, tenant farmers, oral lessees, and sharecroppers",
      benefits: "Simplified loan procedures and interest subvention",
      documents: ["Land records", "Identity proof", "Address proof", "Passport size photos"],
      deadline: "Available year-round",
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      description: "Provides soil health assessment and recommendations for nutrients and fertilizers",
      category: "subsidies",
      eligibility: "All farmers",
      benefits: "Free soil testing and fertilizer recommendations",
      documents: ["Land ownership/tenancy document", "Aadhaar Card"],
      deadline: "Continuous enrollment",
    },
    {
      id: 5,
      name: "Agriculture Infrastructure Fund",
      description: "Financing facility for investment in agriculture infrastructure projects",
      category: "loans",
      eligibility: "Farmers, FPOs, PACS, Marketing Cooperative Societies, SHGs",
      benefits: "₹1 lakh crore financing facility with interest subvention and credit guarantee",
      documents: ["Project report", "Identity proof", "Business plan", "Land documents"],
      deadline: "Applications open until 2025-26",
    },
    {
      id: 6,
      name: "Paramparagat Krishi Vikas Yojana",
      description: "Promotes organic farming practices through cluster approach",
      category: "training",
      eligibility: "Farmers willing to adopt organic farming",
      benefits: "₹50,000 per hectare for 3 years including certification cost",
      documents: ["Land records", "Aadhaar Card", "Bank account details"],
      deadline: "State-wise application periods",
    },
  ]

  const categories = [
    { id: "all", label: t("governmentSchemes.allSchemes") },
    { id: "subsidies", label: t("governmentSchemes.subsidies") },
    { id: "insurance", label: t("governmentSchemes.insurance") },
    { id: "loans", label: t("governmentSchemes.loans") },
    { id: "training", label: t("governmentSchemes.training") },
  ]

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "subsidies":
        return "bg-green-100 text-green-800"
      case "insurance":
        return "bg-blue-100 text-blue-800"
      case "loans":
        return "bg-purple-100 text-purple-800"
      case "training":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("governmentSchemes.title")}</h1>
      <p className="text-gray-500 mb-6">{t("governmentSchemes.description")}</p>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={t("governmentSchemes.searchSchemes")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
                  <Badge className={getCategoryColor(scheme.category)}>
                    {categories.find((c) => c.id === scheme.category)?.label}
                  </Badge>
                </div>
              </div>
              <CardDescription className="mt-2">{scheme.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-600" />
                      {t("governmentSchemes.benefits")}
                    </h4>
                    <p className="text-sm text-gray-600">{scheme.benefits}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                      {t("governmentSchemes.deadline")}
                    </h4>
                    <p className="text-sm text-gray-600">{scheme.deadline}</p>
                  </div>
                </TabsContent>

                <TabsContent value="eligibility" className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <User className="h-4 w-4 mr-1 text-purple-600" />
                      {t("governmentSchemes.eligibility")}
                    </h4>
                    <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-orange-600" />
                      {t("governmentSchemes.documents")}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {scheme.documents.map((doc, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="pt-4">
              <div className="flex gap-2 w-full">
                <Button className="flex-1" size="sm">
                  {t("governmentSchemes.applyNow")}
                </Button>
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
