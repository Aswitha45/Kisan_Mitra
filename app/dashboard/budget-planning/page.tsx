"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Info,
  Edit,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface BudgetPlan {
  cropType: string
  farmingMethod: string
  availableBudget: number
  estimatedCost: number
  estimatedRevenue: number
  estimatedProfit: number
  costBreakdown: CostItem[]
  revenueProjections: RevenueProjection[]
  cashFlow: CashFlowItem[]
  riskAssessment: RiskItem[]
}

interface CostItem {
  category: string
  amount: number
  percentage: number
  description: string
}

interface RevenueProjection {
  scenario: string
  amount: number
  probability: number
}

interface CashFlowItem {
  month: string
  income: number
  expense: number
  cumulative: number
}

interface RiskItem {
  risk: string
  impact: "high" | "medium" | "low"
  mitigation: string
}

export default function BudgetPlanningPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    cropType: "",
    farmingMethod: "",
    availableBudget: "",
  })
  const [budgetPlan, setBudgetPlan] = useState<BudgetPlan | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const cropTypes = [
    { value: "wheat", label: "Wheat" },
    { value: "rice", label: "Rice" },
    { value: "corn", label: "Corn" },
    { value: "cotton", label: "Cotton" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "tomato", label: "Tomato" },
    { value: "onion", label: "Onion" },
    { value: "potato", label: "Potato" },
  ]

  const generateBudgetPlan = async () => {
    if (!formData.cropType || !formData.farmingMethod || !formData.availableBudget) {
      return
    }

    setIsGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const budget = Number.parseFloat(formData.availableBudget)
    const isOrganic = formData.farmingMethod === "organic"

    // Generate mock budget plan based on crop type and method
    const costMultiplier = isOrganic ? 1.2 : 1.0
    const baseCost = budget * 0.7 * costMultiplier
    const baseRevenue = budget * 1.4 * (isOrganic ? 1.1 : 1.0)

    const mockPlan: BudgetPlan = {
      cropType: formData.cropType,
      farmingMethod: formData.farmingMethod,
      availableBudget: budget,
      estimatedCost: baseCost,
      estimatedRevenue: baseRevenue,
      estimatedProfit: baseRevenue - baseCost,
      costBreakdown: [
        {
          category: "Seeds/Planting Material",
          amount: baseCost * 0.15,
          percentage: 15,
          description: "High-quality seeds and planting materials",
        },
        {
          category: "Fertilizers & Nutrients",
          amount: baseCost * 0.25,
          percentage: 25,
          description: isOrganic ? "Organic fertilizers and bio-inputs" : "Chemical fertilizers and nutrients",
        },
        {
          category: "Irrigation & Water",
          amount: baseCost * 0.2,
          percentage: 20,
          description: "Water charges and irrigation system costs",
        },
        {
          category: "Labor",
          amount: baseCost * 0.25,
          percentage: 25,
          description: "Farm labor for various operations",
        },
        {
          category: "Machinery & Equipment",
          amount: baseCost * 0.1,
          percentage: 10,
          description: "Equipment rental and machinery costs",
        },
        {
          category: "Miscellaneous",
          amount: baseCost * 0.05,
          percentage: 5,
          description: "Other farming expenses and contingencies",
        },
      ],
      revenueProjections: [
        {
          scenario: "Conservative",
          amount: baseRevenue * 0.8,
          probability: 30,
        },
        {
          scenario: "Expected",
          amount: baseRevenue,
          probability: 50,
        },
        {
          scenario: "Optimistic",
          amount: baseRevenue * 1.2,
          probability: 20,
        },
      ],
      cashFlow: [
        { month: "Month 1", income: 0, expense: baseCost * 0.3, cumulative: -baseCost * 0.3 },
        { month: "Month 2", income: 0, expense: baseCost * 0.2, cumulative: -baseCost * 0.5 },
        { month: "Month 3", income: 0, expense: baseCost * 0.15, cumulative: -baseCost * 0.65 },
        { month: "Month 4", income: 0, expense: baseCost * 0.15, cumulative: -baseCost * 0.8 },
        { month: "Month 5", income: 0, expense: baseCost * 0.2, cumulative: -baseCost },
        { month: "Month 6", income: baseRevenue, expense: 0, cumulative: baseRevenue - baseCost },
      ],
      riskAssessment: [
        {
          risk: "Weather Variability",
          impact: "high",
          mitigation: "Crop insurance and weather-resistant varieties",
        },
        {
          risk: "Market Price Fluctuation",
          impact: "medium",
          mitigation: "Contract farming and price hedging",
        },
        {
          risk: "Pest and Disease",
          impact: "medium",
          mitigation: "Integrated pest management and regular monitoring",
        },
        {
          risk: "Input Cost Inflation",
          impact: "low",
          mitigation: "Bulk purchasing and alternative suppliers",
        },
      ],
    }

    setBudgetPlan(mockPlan)
    setIsGenerating(false)
  }

  const getBudgetStatus = () => {
    if (!budgetPlan) return null
    return budgetPlan.availableBudget >= budgetPlan.estimatedCost ? "sufficient" : "insufficient"
  }

  const getROI = () => {
    if (!budgetPlan) return 0
    return ((budgetPlan.estimatedProfit / budgetPlan.estimatedCost) * 100).toFixed(1)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800">{t("budgetPlanning.title")}</h1>
          <p className="text-gray-600 mt-2">{t("budgetPlanning.description")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-green-600" />
                <span>{t("budgetPlanning.planYourBudget")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">{t("budgetPlanning.cropType")}</Label>
                <Select
                  value={formData.cropType}
                  onValueChange={(value) => setFormData({ ...formData, cropType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("budgetPlanning.selectCropType")} />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingMethod">{t("budgetPlanning.farmingMethod")}</Label>
                <Select
                  value={formData.farmingMethod}
                  onValueChange={(value) => setFormData({ ...formData, farmingMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("budgetPlanning.selectFarmingMethod")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">{t("budgetPlanning.farmingMethods.organic")}</SelectItem>
                    <SelectItem value="conventional">{t("budgetPlanning.farmingMethods.conventional")}</SelectItem>
                    <SelectItem value="mixed">{t("budgetPlanning.farmingMethods.mixed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">{t("budgetPlanning.availableBudget")}</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder={t("budgetPlanning.enterBudget")}
                  value={formData.availableBudget}
                  onChange={(e) => setFormData({ ...formData, availableBudget: e.target.value })}
                />
              </div>

              <Button
                onClick={generateBudgetPlan}
                disabled={isGenerating || !formData.cropType || !formData.farmingMethod || !formData.availableBudget}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isGenerating ? t("common.loading") : t("budgetPlanning.generateBudgetPlan")}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {budgetPlan ? (
            <div className="space-y-6">
              {/* Budget Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5 text-green-600" />
                      <span>{t("budgetPlanning.budgetSummary")}</span>
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      {t("budgetPlanning.editPlan")}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">{t("budgetPlanning.availableBudgetLabel")}</p>
                      <p className="text-2xl font-bold text-blue-600">₹{budgetPlan.availableBudget.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">{t("budgetPlanning.estimatedCost")}</p>
                      <p className="text-2xl font-bold text-red-600">₹{budgetPlan.estimatedCost.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">{t("budgetPlanning.estimatedRevenue")}</p>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{budgetPlan.estimatedRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">{t("budgetPlanning.estimatedProfit")}</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ₹{budgetPlan.estimatedProfit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Budget Status:</span>
                      <Badge
                        variant={getBudgetStatus() === "sufficient" ? "default" : "destructive"}
                        className={getBudgetStatus() === "sufficient" ? "bg-green-600" : ""}
                      >
                        {getBudgetStatus() === "sufficient" ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {t("budgetPlanning.sufficient")}
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {t("budgetPlanning.insufficient")}
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Utilization</span>
                        <span>{((budgetPlan.estimatedCost / budgetPlan.availableBudget) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(budgetPlan.estimatedCost / budgetPlan.availableBudget) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Return on Investment (ROI)</span>
                        <span className="font-semibold text-green-600">{getROI()}%</span>
                      </div>
                      <Progress value={Math.min(Number.parseFloat(getROI()), 100)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <Tabs defaultValue="breakdown" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="breakdown">{t("budgetPlanning.costBreakdown")}</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue Scenarios</TabsTrigger>
                  <TabsTrigger value="cashflow">{t("budgetPlanning.cashFlow")}</TabsTrigger>
                  <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="breakdown" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("budgetPlanning.detailedBudgetBreakdown")}</CardTitle>
                      <CardDescription>Cost distribution across farming activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {budgetPlan.costBreakdown.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{item.category}</p>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">₹{item.amount.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">{item.percentage}%</p>
                              </div>
                            </div>
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="revenue" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Projections</CardTitle>
                      <CardDescription>Different scenarios based on market conditions and yield</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {budgetPlan.revenueProjections.map((projection, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold">{projection.scenario} Scenario</h4>
                              <Badge variant="outline">{projection.probability}% probability</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl font-bold text-green-600">
                                ₹{projection.amount.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-600">
                                Profit: ₹{(projection.amount - budgetPlan.estimatedCost).toLocaleString()}
                              </span>
                            </div>
                            <Progress
                              value={(projection.amount / (budgetPlan.estimatedRevenue * 1.2)) * 100}
                              className="h-2 mt-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="cashflow" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Cash Flow Analysis</CardTitle>
                      <CardDescription>Track income and expenses throughout the farming cycle</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {budgetPlan.cashFlow.map((flow, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4 p-3 border rounded-lg">
                            <div>
                              <p className="text-sm text-gray-600">Period</p>
                              <p className="font-semibold">{flow.month}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Income</p>
                              <p className="font-semibold text-green-600">₹{flow.income.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Expense</p>
                              <p className="font-semibold text-red-600">₹{flow.expense.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Cumulative</p>
                              <p
                                className={`font-semibold ${flow.cumulative >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                ₹{flow.cumulative.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="risks" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment & Mitigation</CardTitle>
                      <CardDescription>Identify potential risks and mitigation strategies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {budgetPlan.riskAssessment.map((risk, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{risk.risk}</h4>
                              <Badge
                                variant={
                                  risk.impact === "high"
                                    ? "destructive"
                                    : risk.impact === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                                className={
                                  risk.impact === "high" ? "" : risk.impact === "medium" ? "bg-yellow-600" : ""
                                }
                              >
                                {risk.impact} impact
                              </Badge>
                            </div>
                            <div className="flex items-start space-x-2">
                              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-gray-600">{risk.mitigation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calculator className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Budget Plan Generated</h3>
                <p className="text-gray-500 text-center">
                  Fill in the form on the left and click "Generate Budget Plan" to see your detailed budget analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
