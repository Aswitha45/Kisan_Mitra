"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  TrendingUp,
  Leaf,
  Droplets,
  Sun,
  Sprout,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

interface Crop {
  id: string
  name: string
  image: string
  season: string
  duration: string
  yieldPotential: {
    conventional: string
    organic: string
  }
  description: string
  stages: CultivationStage[]
  organicMethods: OrganicMethod[]
  expertTips: ExpertTip[]
}

interface CultivationStage {
  id: string
  name: string
  duration: string
  description: string
  activities: string[]
  icon: React.ReactNode
}

interface OrganicMethod {
  id: string
  category: string
  title: string
  description: string
  materials: string[]
  steps: string[]
  benefits: string[]
}

interface ExpertTip {
  category: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
}

export default function SmartCroppingPage() {
  const { t } = useLanguage()
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)

  const crops: Crop[] = [
    {
      id: "wheat",
      name: "Wheat",
      image: "/images/crops/wheat.jpg",
      season: "Rabi (Oct-Mar)",
      duration: "120-150 days",
      yieldPotential: {
        conventional: "20-25 quintals/acre",
        organic: "18-22 quintals/acre",
      },
      description:
        "Wheat is a major cereal crop grown during the Rabi season. It requires cool weather during growth and warm weather during maturation.",
      stages: [
        {
          id: "land-prep",
          name: "Land Preparation",
          duration: "15-20 days",
          description: "Prepare the field for optimal wheat cultivation",
          activities: [
            "Deep plowing to 20-25 cm depth",
            "Add organic compost (5-8 tons/acre)",
            "Level the field properly",
            "Create proper drainage channels",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "seed-treatment",
          name: "Seed Treatment",
          duration: "1-2 days",
          description: "Treat seeds for better germination and disease resistance",
          activities: [
            "Select certified seeds (40-50 kg/acre)",
            "Treat with organic fungicide",
            "Soak in cow urine solution for 6 hours",
            "Dry in shade before sowing",
          ],
          icon: <Leaf className="h-5 w-5" />,
        },
        {
          id: "sowing",
          name: "Sowing",
          duration: "3-5 days",
          description: "Optimal sowing for maximum yield",
          activities: [
            "Sow at 2-3 cm depth",
            "Maintain 20-22 cm row spacing",
            "Ensure proper seed rate",
            "Cover seeds with soil",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "germination",
          name: "Germination",
          duration: "7-10 days",
          description: "Monitor and support early growth",
          activities: [
            "Maintain soil moisture",
            "Monitor for pest attacks",
            "Remove weeds manually",
            "Apply organic growth promoters",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "vegetative",
          name: "Vegetative Growth",
          duration: "30-45 days",
          description: "Support healthy plant development",
          activities: [
            "Apply organic nitrogen fertilizer",
            "Irrigate at critical stages",
            "Monitor for diseases",
            "Intercultural operations",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "flowering",
          name: "Flowering",
          duration: "15-20 days",
          description: "Critical stage for grain formation",
          activities: [
            "Ensure adequate water supply",
            "Apply potassium-rich organic fertilizer",
            "Monitor for pest attacks",
            "Avoid stress conditions",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "maturity",
          name: "Maturity & Harvesting",
          duration: "15-20 days",
          description: "Harvest at optimal time for maximum yield",
          activities: [
            "Monitor grain moisture content",
            "Harvest when grains are hard",
            "Use proper harvesting techniques",
            "Store in dry conditions",
          ],
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ],
      organicMethods: [
        {
          id: "soil-prep",
          category: "Soil Preparation",
          title: "Organic Soil Enhancement",
          description: "Improve soil health using natural methods",
          materials: ["Farmyard manure", "Compost", "Vermicompost", "Green manure crops"],
          steps: [
            "Apply 8-10 tons of well-decomposed FYM per acre",
            "Mix 2-3 tons of compost into the soil",
            "Incorporate green manure crops like dhaincha",
            "Add vermicompost for better soil structure",
          ],
          benefits: ["Improved soil fertility", "Better water retention", "Enhanced microbial activity"],
        },
        {
          id: "seed-treatment",
          category: "Seed Treatment",
          title: "Natural Seed Treatment",
          description: "Protect seeds using organic methods",
          materials: ["Cow urine", "Neem oil", "Turmeric powder", "Trichoderma"],
          steps: [
            "Soak seeds in cow urine solution (1:10) for 6 hours",
            "Treat with neem oil (2ml per kg seed)",
            "Dust with turmeric powder",
            "Inoculate with Trichoderma (5g per kg seed)",
          ],
          benefits: ["Disease resistance", "Better germination", "Stronger seedlings"],
        },
        {
          id: "fertilization",
          category: "Organic Fertilization",
          title: "Natural Nutrient Management",
          description: "Provide balanced nutrition through organic sources",
          materials: ["Bone meal", "Neem cake", "Rock phosphate", "Wood ash"],
          steps: [
            "Apply bone meal (50 kg/acre) for phosphorus",
            "Use neem cake (100 kg/acre) for nitrogen",
            "Add rock phosphate (25 kg/acre) for long-term P supply",
            "Apply wood ash (20 kg/acre) for potassium",
          ],
          benefits: ["Slow nutrient release", "Improved soil health", "Cost-effective"],
        },
        {
          id: "pest-management",
          category: "Pest Management",
          title: "Integrated Pest Management",
          description: "Control pests using natural methods",
          materials: ["Neem extract", "Pheromone traps", "Beneficial insects", "Garlic spray"],
          steps: [
            "Install pheromone traps for monitoring",
            "Spray neem extract (3ml/liter) weekly",
            "Release beneficial insects like ladybugs",
            "Use garlic-chili spray for aphids",
          ],
          benefits: ["Eco-friendly pest control", "Preserves beneficial insects", "No chemical residues"],
        },
      ],
      expertTips: [
        {
          category: "Yield Enhancement",
          title: "Optimal Sowing Time",
          description: "Sow wheat between November 15-30 for maximum yield potential in most regions.",
          impact: "high",
        },
        {
          category: "Quality Improvement",
          title: "Proper Irrigation",
          description: "Provide irrigation at crown root initiation, tillering, flowering, and grain filling stages.",
          impact: "high",
        },
        {
          category: "Cost Reduction",
          title: "Crop Rotation",
          description: "Follow wheat with legumes like chickpea to improve soil nitrogen naturally.",
          impact: "medium",
        },
        {
          category: "Sustainability",
          title: "Residue Management",
          description: "Incorporate wheat straw back into soil instead of burning to improve organic matter.",
          impact: "high",
        },
      ],
    },
    {
      id: "rice",
      name: "Rice",
      image: "/images/crops/rice.jpg",
      season: "Kharif (Jun-Nov)",
      duration: "90-120 days",
      yieldPotential: {
        conventional: "25-30 quintals/acre",
        organic: "22-27 quintals/acre",
      },
      description:
        "Rice is the staple food crop grown during Kharif season. It requires warm weather and abundant water supply.",
      stages: [
        {
          id: "nursery",
          name: "Nursery Preparation",
          duration: "25-30 days",
          description: "Prepare healthy seedlings for transplanting",
          activities: [
            "Prepare nursery beds with organic matter",
            "Sow pre-germinated seeds",
            "Maintain proper water level",
            "Apply organic nutrients",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "land-prep",
          name: "Main Field Preparation",
          duration: "10-15 days",
          description: "Prepare main field for transplanting",
          activities: [
            "Plow and puddle the field",
            "Level the field properly",
            "Apply organic manure",
            "Maintain standing water",
          ],
          icon: <Droplets className="h-5 w-5" />,
        },
        {
          id: "transplanting",
          name: "Transplanting",
          duration: "5-7 days",
          description: "Transplant seedlings to main field",
          activities: [
            "Transplant 25-30 day old seedlings",
            "Maintain 20x15 cm spacing",
            "Plant 2-3 seedlings per hill",
            "Ensure proper depth",
          ],
          icon: <Leaf className="h-5 w-5" />,
        },
        {
          id: "vegetative",
          name: "Vegetative Growth",
          duration: "40-50 days",
          description: "Support tillering and growth",
          activities: [
            "Maintain water level at 2-5 cm",
            "Apply organic nitrogen",
            "Control weeds manually",
            "Monitor for pests",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "reproductive",
          name: "Reproductive Phase",
          duration: "30-35 days",
          description: "Support panicle development",
          activities: [
            "Maintain continuous flooding",
            "Apply potassium-rich fertilizer",
            "Monitor for diseases",
            "Ensure proper nutrition",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "maturity",
          name: "Maturity & Harvesting",
          duration: "15-20 days",
          description: "Harvest at proper maturity",
          activities: [
            "Drain field 10 days before harvest",
            "Harvest when 80% grains are golden",
            "Use proper harvesting tools",
            "Dry to 14% moisture content",
          ],
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ],
      organicMethods: [
        {
          id: "soil-prep",
          category: "Soil Preparation",
          title: "Organic Soil Management",
          description: "Enhance soil fertility for rice cultivation",
          materials: ["Green manure", "Azolla", "Blue-green algae", "Compost"],
          steps: [
            "Grow green manure crops like dhaincha",
            "Incorporate Azolla as biofertilizer",
            "Inoculate with blue-green algae",
            "Apply 10-12 tons compost per acre",
          ],
          benefits: ["Nitrogen fixation", "Improved soil structure", "Enhanced water retention"],
        },
        {
          id: "nutrient-management",
          category: "Nutrient Management",
          title: "Organic Nutrition Program",
          description: "Balanced nutrition through organic sources",
          materials: ["Neem cake", "Bone meal", "Seaweed extract", "Microbial consortia"],
          steps: [
            "Apply neem cake (150 kg/acre) as basal dose",
            "Use bone meal (75 kg/acre) for phosphorus",
            "Spray seaweed extract at tillering stage",
            "Apply microbial consortia for nutrient cycling",
          ],
          benefits: ["Slow nutrient release", "Improved nutrient uptake", "Better grain quality"],
        },
        {
          id: "water-management",
          category: "Water Management",
          title: "Efficient Water Use",
          description: "Optimize water usage in organic rice",
          materials: ["Organic mulch", "SRI techniques", "Alternate wetting-drying"],
          steps: [
            "Follow System of Rice Intensification (SRI)",
            "Practice alternate wetting and drying",
            "Use organic mulch to reduce evaporation",
            "Maintain optimal water depth",
          ],
          benefits: ["Water conservation", "Better root development", "Reduced methane emission"],
        },
        {
          id: "pest-control",
          category: "Pest Control",
          title: "Natural Pest Management",
          description: "Eco-friendly pest control methods",
          materials: ["Neem oil", "Trichogramma", "Light traps", "Botanical extracts"],
          steps: [
            "Release Trichogramma for stem borer control",
            "Install light traps for night-flying pests",
            "Spray neem oil (5ml/liter) for sucking pests",
            "Use botanical extracts for disease control",
          ],
          benefits: ["Preserves natural enemies", "No pesticide residues", "Sustainable pest control"],
        },
      ],
      expertTips: [
        {
          category: "Yield Enhancement",
          title: "SRI Method",
          description: "Adopt System of Rice Intensification for 20-30% higher yields with less water and seeds.",
          impact: "high",
        },
        {
          category: "Quality Improvement",
          title: "Proper Drying",
          description: "Dry harvested rice to 14% moisture content to prevent storage losses and maintain quality.",
          impact: "high",
        },
        {
          category: "Cost Reduction",
          title: "Direct Seeding",
          description: "Consider direct seeding in well-prepared fields to save labor costs and time.",
          impact: "medium",
        },
        {
          category: "Sustainability",
          title: "Crop Diversification",
          description: "Rotate rice with other crops like pulses or vegetables to break pest cycles.",
          impact: "medium",
        },
      ],
    },
    {
      id: "corn",
      name: "Corn",
      image: "/images/crops/corn.jpg",
      season: "Kharif (Jun-Oct)",
      duration: "90-110 days",
      yieldPotential: {
        conventional: "28-35 quintals/acre",
        organic: "25-30 quintals/acre",
      },
      description:
        "Corn is a versatile crop grown for food, feed, and industrial purposes. It requires warm weather and moderate rainfall.",
      stages: [
        {
          id: "land-prep",
          name: "Land Preparation",
          duration: "10-15 days",
          description: "Prepare field for corn cultivation",
          activities: ["Deep plowing to 25-30 cm", "Apply organic matter", "Create proper drainage", "Level the field"],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "sowing",
          name: "Sowing",
          duration: "3-5 days",
          description: "Plant corn seeds at optimal spacing",
          activities: [
            "Sow at 3-4 cm depth",
            "Maintain 60x20 cm spacing",
            "Use 8-10 kg seed per acre",
            "Ensure good seed-soil contact",
          ],
          icon: <Leaf className="h-5 w-5" />,
        },
        {
          id: "germination",
          name: "Germination",
          duration: "7-10 days",
          description: "Support early seedling growth",
          activities: ["Maintain soil moisture", "Protect from birds", "Monitor for pests", "Thin if necessary"],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "vegetative",
          name: "Vegetative Growth",
          duration: "35-45 days",
          description: "Support rapid plant growth",
          activities: [
            "Apply organic nitrogen",
            "Irrigate at knee-high stage",
            "Control weeds",
            "Earth up around plants",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "tasseling",
          name: "Tasseling & Silking",
          duration: "15-20 days",
          description: "Critical pollination period",
          activities: [
            "Ensure adequate water supply",
            "Monitor for silk cut worms",
            "Avoid stress conditions",
            "Support pollination",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "grain-filling",
          name: "Grain Filling",
          duration: "25-30 days",
          description: "Support grain development",
          activities: [
            "Maintain soil moisture",
            "Apply potassium fertilizer",
            "Monitor for diseases",
            "Protect from birds",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "maturity",
          name: "Maturity & Harvesting",
          duration: "10-15 days",
          description: "Harvest at proper maturity",
          activities: [
            "Check grain moisture (20-25%)",
            "Harvest when husks are dry",
            "Dry cobs properly",
            "Store in dry conditions",
          ],
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ],
      organicMethods: [
        {
          id: "soil-enhancement",
          category: "Soil Enhancement",
          title: "Organic Soil Building",
          description: "Build soil fertility for corn production",
          materials: ["Compost", "Vermicompost", "Green manure", "Biochar"],
          steps: [
            "Apply 8-10 tons compost per acre",
            "Mix 2-3 tons vermicompost",
            "Incorporate green manure crops",
            "Add biochar for carbon sequestration",
          ],
          benefits: ["Improved soil structure", "Better nutrient retention", "Enhanced water holding capacity"],
        },
        {
          id: "organic-nutrition",
          category: "Organic Nutrition",
          title: "Natural Fertilization",
          description: "Provide balanced nutrition organically",
          materials: ["Fish emulsion", "Kelp meal", "Bat guano", "Mycorrhizal fungi"],
          steps: [
            "Apply fish emulsion (diluted 1:10) weekly",
            "Use kelp meal (25 kg/acre) for micronutrients",
            "Apply bat guano (50 kg/acre) for phosphorus",
            "Inoculate with mycorrhizal fungi",
          ],
          benefits: ["Complete nutrition", "Improved nutrient uptake", "Better plant health"],
        },
        {
          id: "companion-planting",
          category: "Companion Planting",
          title: "Three Sisters Method",
          description: "Traditional intercropping system",
          materials: ["Corn seeds", "Bean seeds", "Squash seeds"],
          steps: [
            "Plant corn first in hills",
            "Add beans 2-3 weeks later",
            "Plant squash around the hills",
            "Maintain proper spacing",
          ],
          benefits: ["Nitrogen fixation", "Natural pest control", "Efficient space utilization"],
        },
        {
          id: "natural-pest-control",
          category: "Pest Control",
          title: "Biological Pest Management",
          description: "Control pests using natural methods",
          materials: ["Bt spray", "Predatory insects", "Trap crops", "Essential oils"],
          steps: [
            "Spray Bt for corn borer control",
            "Release beneficial insects",
            "Plant trap crops like sunflower",
            "Use essential oil sprays for aphids",
          ],
          benefits: ["Targeted pest control", "Preserves beneficial insects", "No chemical residues"],
        },
      ],
      expertTips: [
        {
          category: "Yield Enhancement",
          title: "Proper Plant Population",
          description: "Maintain optimal plant density of 20,000-25,000 plants per acre for maximum yield.",
          impact: "high",
        },
        {
          category: "Quality Improvement",
          title: "Timely Harvest",
          description: "Harvest when grain moisture is 20-25% for best quality and storage life.",
          impact: "high",
        },
        {
          category: "Cost Reduction",
          title: "Intercropping",
          description: "Grow legumes between corn rows to fix nitrogen and increase overall farm income.",
          impact: "medium",
        },
        {
          category: "Sustainability",
          title: "Cover Crops",
          description: "Plant cover crops after harvest to prevent soil erosion and improve soil health.",
          impact: "high",
        },
      ],
    },
    {
      id: "cotton",
      name: "Cotton",
      image: "/images/crops/cotton-field.jpeg",
      season: "Kharif (Apr-Dec)",
      duration: "180-200 days",
      yieldPotential: {
        conventional: "6-10 quintals/acre",
        organic: "5-8 quintals/acre",
      },
      description:
        "Cotton is a major cash crop requiring warm weather and moderate rainfall. It's grown for fiber production.",
      stages: [
        {
          id: "land-prep",
          name: "Land Preparation",
          duration: "15-20 days",
          description: "Prepare field for cotton cultivation",
          activities: [
            "Deep summer plowing",
            "Apply organic matter",
            "Create ridges and furrows",
            "Install drip irrigation",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "sowing",
          name: "Sowing",
          duration: "5-7 days",
          description: "Plant cotton seeds",
          activities: [
            "Sow at 2-3 cm depth",
            "Maintain 90x30 cm spacing",
            "Use 1.5-2 kg seed per acre",
            "Apply starter fertilizer",
          ],
          icon: <Leaf className="h-5 w-5" />,
        },
        {
          id: "germination",
          name: "Germination",
          duration: "10-15 days",
          description: "Support seedling establishment",
          activities: [
            "Maintain soil moisture",
            "Protect from pests",
            "Thin to one plant per hill",
            "Apply organic growth promoter",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "vegetative",
          name: "Vegetative Growth",
          duration: "60-75 days",
          description: "Support plant development",
          activities: ["Regular irrigation", "Apply organic nitrogen", "Control weeds", "Monitor for pests"],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "flowering",
          name: "Flowering",
          duration: "45-60 days",
          description: "Support boll formation",
          activities: [
            "Maintain adequate moisture",
            "Apply potassium fertilizer",
            "Control bollworms",
            "Remove excess vegetative growth",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "boll-development",
          name: "Boll Development",
          duration: "45-50 days",
          description: "Support fiber development",
          activities: [
            "Reduce irrigation frequency",
            "Monitor for diseases",
            "Apply foliar nutrition",
            "Prepare for harvest",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "harvesting",
          name: "Harvesting",
          duration: "30-45 days",
          description: "Multiple picks for quality cotton",
          activities: [
            "First pick when 60% bolls open",
            "Subsequent picks at 15-day intervals",
            "Pick during dry weather",
            "Store in clean containers",
          ],
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ],
      organicMethods: [
        {
          id: "soil-health",
          category: "Soil Health",
          title: "Organic Soil Management",
          description: "Build soil health for cotton production",
          materials: ["Compost", "Vermicompost", "Biofertilizers", "Gypsum"],
          steps: [
            "Apply 10-12 tons compost per acre",
            "Mix 3-4 tons vermicompost",
            "Inoculate with Azotobacter and PSB",
            "Apply gypsum (200 kg/acre) for calcium",
          ],
          benefits: ["Improved soil structure", "Better water infiltration", "Enhanced nutrient availability"],
        },
        {
          id: "organic-pest-control",
          category: "Pest Control",
          title: "Integrated Pest Management",
          description: "Manage cotton pests organically",
          materials: ["Neem oil", "Bt spray", "Pheromone traps", "Beneficial insects"],
          steps: [
            "Install pheromone traps for monitoring",
            "Spray neem oil (5ml/liter) for sucking pests",
            "Use Bt spray for bollworm control",
            "Release Chrysoperla for aphid control",
          ],
          benefits: ["Reduced pest damage", "Preserved natural enemies", "No pesticide residues"],
        },
        {
          id: "water-management",
          category: "Water Management",
          title: "Efficient Irrigation",
          description: "Optimize water use in cotton",
          materials: ["Drip irrigation", "Mulch", "Moisture sensors"],
          steps: [
            "Install drip irrigation system",
            "Apply organic mulch around plants",
            "Use soil moisture sensors",
            "Schedule irrigation based on crop stage",
          ],
          benefits: ["Water conservation", "Reduced weed growth", "Better fiber quality"],
        },
        {
          id: "nutrition-management",
          category: "Nutrition Management",
          title: "Organic Nutrition Program",
          description: "Balanced nutrition for cotton",
          materials: ["Neem cake", "Castor cake", "Rock phosphate", "Sulphur"],
          steps: [
            "Apply neem cake (200 kg/acre) as basal",
            "Use castor cake (150 kg/acre) for nitrogen",
            "Apply rock phosphate (100 kg/acre)",
            "Add sulphur (25 kg/acre) for oil content",
          ],
          benefits: ["Slow nutrient release", "Improved fiber quality", "Better plant health"],
        },
      ],
      expertTips: [
        {
          category: "Yield Enhancement",
          title: "Plant Growth Regulators",
          description: "Use natural plant growth regulators like seaweed extract to improve boll retention.",
          impact: "medium",
        },
        {
          category: "Quality Improvement",
          title: "Proper Picking",
          description: "Pick cotton during dry weather and avoid contamination for better fiber quality.",
          impact: "high",
        },
        {
          category: "Cost Reduction",
          title: "Intercropping",
          description: "Grow short-duration crops like green gram between cotton rows for additional income.",
          impact: "medium",
        },
        {
          category: "Sustainability",
          title: "Crop Rotation",
          description: "Rotate cotton with cereals and legumes to break pest cycles and improve soil health.",
          impact: "high",
        },
      ],
    },
    {
      id: "sugarcane",
      name: "Sugarcane",
      image: "/images/crops/sugarcane-field.jpeg",
      season: "Year-round",
      duration: "12-18 months",
      yieldPotential: {
        conventional: "400-500 quintals/acre",
        organic: "350-450 quintals/acre",
      },
      description:
        "Sugarcane is a long-duration cash crop grown for sugar production. It requires warm climate and abundant water.",
      stages: [
        {
          id: "land-prep",
          name: "Land Preparation",
          duration: "20-25 days",
          description: "Prepare field for sugarcane planting",
          activities: [
            "Deep plowing to 30-35 cm",
            "Apply organic matter",
            "Create furrows 90-120 cm apart",
            "Install irrigation system",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "planting",
          name: "Planting",
          duration: "10-15 days",
          description: "Plant sugarcane setts",
          activities: [
            "Select healthy seed cane",
            "Cut into 2-3 budded setts",
            "Treat setts with fungicide",
            "Plant in furrows end-to-end",
          ],
          icon: <Leaf className="h-5 w-5" />,
        },
        {
          id: "germination",
          name: "Germination",
          duration: "20-30 days",
          description: "Support sprouting and establishment",
          activities: [
            "Maintain soil moisture",
            "Apply light irrigation",
            "Control weeds manually",
            "Monitor for pest attacks",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "tillering",
          name: "Tillering",
          duration: "60-90 days",
          description: "Support tiller development",
          activities: [
            "Apply organic nitrogen",
            "Irrigate at 7-10 day intervals",
            "Earth up around plants",
            "Control weeds",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "grand-growth",
          name: "Grand Growth",
          duration: "120-150 days",
          description: "Rapid cane elongation phase",
          activities: [
            "Maintain regular irrigation",
            "Apply balanced nutrition",
            "Monitor for borers",
            "Support tall canes if needed",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "maturation",
          name: "Maturation",
          duration: "60-90 days",
          description: "Sugar accumulation phase",
          activities: [
            "Reduce irrigation frequency",
            "Stop nitrogen application",
            "Monitor sugar content",
            "Prepare for harvest",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "harvesting",
          name: "Harvesting",
          duration: "30-45 days",
          description: "Harvest at optimal maturity",
          activities: [
            "Test for sugar content (18-20%)",
            "Cut close to ground level",
            "Remove trash and tops",
            "Transport to mill quickly",
          ],
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ],
      organicMethods: [
        {
          id: "soil-preparation",
          category: "Soil Preparation",
          title: "Organic Soil Enhancement",
          description: "Build soil fertility for sugarcane",
          materials: ["Press mud", "Bagasse", "Compost", "Biofertilizers"],
          steps: [
            "Apply press mud (15-20 tons/acre)",
            "Incorporate bagasse compost (10 tons/acre)",
            "Add well-decomposed FYM (25 tons/acre)",
            "Inoculate with Azotobacter and PSB",
          ],
          benefits: ["Improved soil organic matter", "Better water retention", "Enhanced nutrient cycling"],
        },
        {
          id: "sett-treatment",
          category: "Sett Treatment",
          title: "Organic Sett Treatment",
          description: "Protect setts using natural methods",
          materials: ["Trichoderma", "Cow urine", "Neem extract", "Carbendazim"],
          steps: [
            "Treat setts with Trichoderma (10g/liter)",
            "Dip in cow urine solution (1:10)",
            "Spray with neem extract (3%)",
            "Air dry in shade before planting",
          ],
          benefits: ["Disease protection", "Better sprouting", "Stronger root system"],
        },
        {
          id: "nutrition-program",
          category: "Nutrition Program",
          title: "Organic Nutrition Management",
          description: "Balanced nutrition through organic sources",
          materials: ["Neem cake", "Castor cake", "Rock phosphate", "Potash"],
          steps: [
            "Apply neem cake (300 kg/acre) in 3 splits",
            "Use castor cake (200 kg/acre) for nitrogen",
            "Apply rock phosphate (150 kg/acre) as basal",
            "Add muriate of potash (100 kg/acre)",
          ],
          benefits: ["Sustained nutrient supply", "Improved cane quality", "Better sugar recovery"],
        },
        {
          id: "pest-disease-management",
          category: "Pest & Disease Management",
          title: "Integrated Management",
          description: "Control pests and diseases organically",
          materials: ["Trichogramma", "Light traps", "Bordeaux mixture", "Copper fungicides"],
          steps: [
            "Release Trichogramma for borer control",
            "Install light traps for adult moths",
            "Spray Bordeaux mixture for fungal diseases",
            "Use copper-based fungicides preventively",
          ],
          benefits: ["Reduced pest damage", "Lower disease incidence", "Improved cane health"],
        },
      ],
      expertTips: [
        {
          category: "Yield Enhancement",
          title: "Proper Spacing",
          description: "Maintain 90-120 cm row spacing for optimal light interception and air circulation.",
          impact: "high",
        },
        {
          category: "Quality Improvement",
          title: "Timely Harvest",
          description: "Harvest when sugar content reaches 18-20% for maximum sugar recovery.",
          impact: "high",
        },
        {
          category: "Cost Reduction",
          title: "Ratoon Management",
          description: "Manage ratoon crops properly to get 3-4 profitable harvests from single planting.",
          impact: "high",
        },
        {
          category: "Sustainability",
          title: "Trash Management",
          description: "Retain sugarcane trash as mulch to conserve moisture and add organic matter.",
          impact: "medium",
        },
      ],
    },
    {
      id: "tomato",
      name: "Tomato",
      image: "/images/crops/fresh-tomatoes.jpeg",
      season: "Rabi/Summer",
      duration: "90-120 days",
      yieldPotential: {
        conventional: "200-300 quintals/acre",
        organic: "180-250 quintals/acre",
      },
      description:
        "Tomato is a high-value vegetable crop grown for fresh consumption and processing. It requires moderate climate.",
      stages: [
        {
          id: "nursery",
          name: "Nursery Raising",
          duration: "25-30 days",
          description: "Raise healthy seedlings",
          activities: [
            "Prepare nursery beds with organic matter",
            "Sow seeds in raised beds",
            "Maintain proper moisture",
            "Protect from extreme weather",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "land-prep",
          name: "Land Preparation",
          duration: "10-15 days",
          description: "Prepare main field for transplanting",
          activities: [
            "Deep plowing and harrowing",
            "Apply organic manure",
            "Make raised beds",
            "Install drip irrigation",
          ],
          icon: <Droplets className="h-5 w-5" />,
        },
        {
          id: "transplanting",
          name: "Transplanting",
          duration: "3-5 days",
          description: "Transplant seedlings to main field",
          activities: [
            "Transplant 4-5 week old seedlings",
            "Maintain 60x45 cm spacing",
            "Water immediately after transplanting",
            "Provide shade for 2-3 days",
          ],
          icon: <Leaf className="h-5 w-5" />,
        },
        {
          id: "vegetative",
          name: "Vegetative Growth",
          duration: "30-40 days",
          description: "Support plant establishment and growth",
          activities: [
            "Regular irrigation through drip",
            "Apply organic fertilizers",
            "Stake plants for support",
            "Control weeds and pests",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "flowering",
          name: "Flowering & Fruit Set",
          duration: "20-25 days",
          description: "Support flower and fruit development",
          activities: [
            "Maintain consistent moisture",
            "Apply potassium-rich fertilizer",
            "Remove suckers regularly",
            "Monitor for diseases",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "fruit-development",
          name: "Fruit Development",
          duration: "25-30 days",
          description: "Support fruit growth and maturation",
          activities: [
            "Continue regular irrigation",
            "Apply calcium to prevent disorders",
            "Support heavy fruit clusters",
            "Monitor for fruit flies",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "harvesting",
          name: "Harvesting",
          duration: "45-60 days",
          description: "Multiple harvests of ripe fruits",
          activities: [
            "Harvest at breaker stage for transport",
            "Pick fully ripe for local market",
            "Harvest every 2-3 days",
            "Handle fruits carefully",
          ],
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ],
      organicMethods: [
        {
          id: "soil-health",
          category: "Soil Health",
          title: "Organic Soil Management",
          description: "Build soil health for tomato production",
          materials: ["Compost", "Vermicompost", "Coco peat", "Perlite"],
          steps: [
            "Apply 15-20 tons compost per acre",
            "Mix 5-8 tons vermicompost",
            "Add coco peat for water retention",
            "Incorporate perlite for drainage",
          ],
          benefits: ["Improved soil structure", "Better drainage", "Enhanced water retention"],
        },
        {
          id: "organic-nutrition",
          category: "Organic Nutrition",
          title: "Natural Fertilization Program",
          description: "Provide balanced nutrition organically",
          materials: ["Fish emulsion", "Seaweed extract", "Bone meal", "Wood ash"],
          steps: [
            "Apply fish emulsion weekly (diluted 1:10)",
            "Spray seaweed extract bi-weekly",
            "Use bone meal (100 kg/acre) for phosphorus",
            "Apply wood ash (50 kg/acre) for potassium",
          ],
          benefits: ["Complete nutrition", "Better fruit quality", "Improved plant health"],
        },
        {
          id: "disease-prevention",
          category: "Disease Prevention",
          title: "Organic Disease Management",
          description: "Prevent diseases using natural methods",
          materials: ["Copper fungicide", "Baking soda", "Milk spray", "Compost tea"],
          steps: [
            "Spray copper fungicide preventively",
            "Use baking soda solution (1%) for powdery mildew",
            "Apply milk spray (1:10) for viral diseases",
            "Drench with compost tea weekly",
          ],
          benefits: ["Disease prevention", "Improved plant immunity", "No chemical residues"],
        },
        {
          id: "pest-management",
          category: "Pest Management",
          title: "Integrated Pest Control",
          description: "Control pests using organic methods",
          materials: ["Neem oil", "Sticky traps", "Beneficial insects", "Diatomaceous earth"],
          steps: [
            "Spray neem oil (3ml/liter) for aphids",
            "Install yellow sticky traps for whiteflies",
            "Release ladybugs for aphid control",
            "Dust diatomaceous earth for crawling pests",
          ],
          benefits: ["Effective pest control", "Preserved beneficial insects", "Safe for consumption"],
        },
      ],
      expertTips: [
        {
          category: "Yield Enhancement",
          title: "Proper Pruning",
          description: "Remove suckers and lower leaves regularly to improve air circulation and fruit quality.",
          impact: "high",
        },
        {
          category: "Quality Improvement",
          title: "Calcium Management",
          description: "Maintain adequate calcium levels to prevent blossom end rot and improve fruit quality.",
          impact: "high",
        },
        {
          category: "Cost Reduction",
          title: "Mulching",
          description: "Use organic mulch to reduce watering needs, control weeds, and maintain soil temperature.",
          impact: "medium",
        },
        {
          category: "Sustainability",
          title: "Companion Planting",
          description: "Grow basil, marigold, or nasturtium nearby to repel pests naturally.",
          impact: "medium",
        },
      ],
    },
    {
      id: "onion",
      name: "Onion",
      image: "/images/crops/fresh-onions.jpeg",
      season: "Rabi (Oct-Apr)",
      duration: "120-150 days",
      yieldPotential: {
        conventional: "150-200 quintals/acre",
        organic: "130-180 quintals/acre",
      },
      description:
        "Onion is an important vegetable and spice crop grown during Rabi season. It requires cool weather during growth.",
      stages: [
        {
          id: "nursery",
          name: "Nursery Preparation",
          duration: "35-45 days",
          description: "Raise healthy onion seedlings",
          activities: [
            "Prepare nursery beds with fine soil",
            "Sow seeds in lines 10 cm apart",
            "Maintain proper moisture",
            "Protect from heavy rains",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "land-prep",
          name: "Land Preparation",
          duration: "15-20 days",
          description: "Prepare main field for transplanting",
          activities: [
            "Deep plowing and fine tilth",
            "Apply organic manure",
            "Make raised beds 1m wide",
            "Install drip irrigation",
          ],
          icon: <Droplets className="h-5 w-5" />,
        },
        {
          id: "transplanting",
          name: "Transplanting",
          duration: "5-7 days",
          description: "Transplant seedlings to main field",
          activities: [
            "Transplant 6-7 week old seedlings",
            "Maintain 15x10 cm spacing",
            "Plant at proper depth",
            "Water immediately after transplanting",
          ],
          icon: <Leaf className="h-5 w-5" />,
        },
        {
          id: "vegetative",
          name: "Vegetative Growth",
          duration: "40-50 days",
          description: "Support leaf and root development",
          activities: [
            "Regular light irrigation",
            "Apply nitrogen-rich fertilizer",
            "Control weeds manually",
            "Monitor for thrips",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "bulb-initiation",
          name: "Bulb Initiation",
          duration: "20-25 days",
          description: "Support bulb formation",
          activities: [
            "Reduce irrigation frequency",
            "Apply potassium fertilizer",
            "Stop nitrogen application",
            "Monitor for diseases",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "bulb-development",
          name: "Bulb Development",
          duration: "25-30 days",
          description: "Support bulb enlargement",
          activities: [
            "Maintain moderate soil moisture",
            "Apply phosphorus fertilizer",
            "Remove flower stalks if any",
            "Monitor bulb size",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "maturity",
          name: "Maturity & Harvesting",
          duration: "15-20 days",
          description: "Harvest at proper maturity",
          activities: [
            "Stop irrigation 10 days before harvest",
            "Harvest when 50% tops fall",
            "Cure bulbs in field for 3-4 days",
            "Store in well-ventilated place",
          ],
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ],
      organicMethods: [
        {
          id: "soil-preparation",
          category: "Soil Preparation",
          title: "Organic Soil Enhancement",
          description: "Prepare soil for onion cultivation",
          materials: ["Well-decomposed FYM", "Compost", "Vermicompost", "Sand"],
          steps: [
            "Apply 20-25 tons FYM per acre",
            "Mix 8-10 tons compost",
            "Add 3-4 tons vermicompost",
            "Incorporate sand for better drainage",
          ],
          benefits: ["Improved soil structure", "Better drainage", "Enhanced nutrient availability"],
        },
        {
          id: "seedling-care",
          category: "Seedling Care",
          title: "Organic Nursery Management",
          description: "Raise healthy seedlings organically",
          materials: ["Trichoderma", "Neem cake", "Cocopeat", "Vermiculite"],
          steps: [
            "Treat nursery soil with Trichoderma",
            "Mix neem cake in nursery medium",
            "Add cocopeat for water retention",
            "Use vermiculite for better aeration",
          ],
          benefits: ["Disease-free seedlings", "Better root development", "Higher survival rate"],
        },
        {
          id: "nutrition-management",
          category: "Nutrition Management",
          title: "Organic Fertilization",
          description: "Provide balanced nutrition organically",
          materials: ["Neem cake", "Mustard cake", "Rock phosphate", "Sulphur"],
          steps: [
            "Apply neem cake (200 kg/acre) in 2 splits",
            "Use mustard cake (150 kg/acre) for nitrogen",
            "Apply rock phosphate (100 kg/acre) as basal",
            "Add sulphur (25 kg/acre) for pungency",
          ],
          benefits: ["Sustained nutrient supply", "Better bulb quality", "Improved storage life"],
        },
        {
          id: "pest-disease-control",
          category: "Pest & Disease Control",
          title: "Organic Protection",
          description: "Control pests and diseases naturally",
          materials: ["Neem oil", "Blue sticky traps", "Copper fungicide", "Garlic extract"],
          steps: [
            "Spray neem oil (5ml/liter) for thrips",
            "Install blue sticky traps",
            "Use copper fungicide for purple blotch",
            "Apply garlic extract for nematodes",
          ],
          benefits: ["Effective pest control", "Disease prevention", "No chemical residues"],
        },
      ],
      expertTips: [
        {
          category: "Yield Enhancement",
          title: "Proper Spacing",
          description: "Maintain optimal plant spacing of 15x10 cm for maximum bulb size and yield.",
          impact: "high",
        },
        {
          category: "Quality Improvement",
          title: "Curing Process",
          description: "Proper field curing for 3-4 days improves storage life and reduces post-harvest losses.",
          impact: "high",
        },
        {
          category: "Cost Reduction",
          title: "Direct Seeding",
          description: "Consider direct seeding in well-prepared beds to save transplanting costs.",
          impact: "medium",
        },
        {
          category: "Sustainability",
          title: "Crop Rotation",
          description: "Rotate onion with cereals or legumes to break disease cycles and improve soil health.",
          impact: "medium",
        },
      ],
    },
    {
      id: "potato",
      name: "Potato",
      image: "/images/crops/potato.jpg",
      season: "Rabi (Oct-Mar)",
      duration: "90-120 days",
      yieldPotential: {
        conventional: "120-180 quintals/acre",
        organic: "100-150 quintals/acre",
      },
      description:
        "Potato is an important food crop grown during Rabi season. It requires cool weather and well-drained soil.",
      stages: [
        {
          id: "land-prep",
          name: "Land Preparation",
          duration: "15-20 days",
          description: "Prepare field for potato cultivation",
          activities: [
            "Deep plowing to 25-30 cm",
            "Apply organic matter",
            "Make ridges 60 cm apart",
            "Ensure proper drainage",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "seed-treatment",
          name: "Seed Treatment",
          duration: "2-3 days",
          description: "Treat seed tubers before planting",
          activities: [
            "Select disease-free tubers",
            "Cut large tubers with 2-3 eyes",
            "Treat with fungicide",
            "Dry cut tubers for 2 days",
          ],
          icon: <Leaf className="h-5 w-5" />,
        },
        {
          id: "planting",
          name: "Planting",
          duration: "3-5 days",
          description: "Plant seed tubers",
          activities: [
            "Plant at 5-7 cm depth",
            "Maintain 20-25 cm spacing",
            "Use 12-15 quintals seed per acre",
            "Cover with soil properly",
          ],
          icon: <Sprout className="h-5 w-5" />,
        },
        {
          id: "emergence",
          name: "Emergence",
          duration: "15-20 days",
          description: "Support plant emergence",
          activities: [
            "Maintain soil moisture",
            "Monitor for pest attacks",
            "Remove weeds manually",
            "Apply light irrigation",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "vegetative",
          name: "Vegetative Growth",
          duration: "30-40 days",
          description: "Support plant growth and development",
          activities: [
            "Earth up plants twice",
            "Apply organic fertilizers",
            "Control weeds and pests",
            "Maintain proper irrigation",
          ],
          icon: <Sun className="h-5 w-5" />,
        },
        {
          id: "tuber-formation",
          name: "Tuber Formation",
          duration: "25-30 days",
          description: "Support tuber development",
          activities: [
            "Maintain consistent moisture",
            "Apply potassium fertilizer",
            "Monitor for late blight",
            "Avoid water stress",
          ],
          icon: <TrendingUp className="h-5 w-5" />,
        },
        {
          id: "maturity",
          name: "Maturity & Harvesting",
          duration: "10-15 days",
          description: "Harvest at proper maturity",
          activities: [
            "Stop irrigation 10 days before harvest",
            "Harvest when tops dry",
            "Dig carefully to avoid damage",
            "Cure tubers in shade",
          ],
          icon: <CheckCircle className="h-5 w-5" />,
        },
      ],
      organicMethods: [
        {
          id: "soil-health",
          category: "Soil Health",
          title: "Organic Soil Management",
          description: "Build soil health for potato production",
          materials: ["Compost", "Vermicompost", "Green manure", "Lime"],
          steps: [
            "Apply 15-20 tons compost per acre",
            "Mix 5-8 tons vermicompost",
            "Incorporate green manure crops",
            "Apply lime if soil is acidic",
          ],
          benefits: ["Improved soil structure", "Better tuber quality", "Reduced soil-borne diseases"],
        },
        {
          id: "seed-treatment",
          category: "Seed Treatment",
          title: "Organic Seed Treatment",
          description: "Treat seed tubers organically",
          materials: ["Trichoderma", "Cow urine", "Turmeric powder", "Neem extract"],
          steps: [
            "Treat tubers with Trichoderma (10g/liter)",
            "Dip in cow urine solution (1:10)",
            "Dust with turmeric powder",
            "Spray with neem extract (3%)",
          ],
          benefits: ["Disease protection", "Better sprouting", "Reduced seed rot"],
        },
        {
          id: "nutrition-program",
          category: "Nutrition Program",
          title: "Organic Fertilization",
          description: "Provide balanced nutrition organically",
          materials: ["Neem cake", "Mustard cake", "Rock phosphate", "Wood ash"],
          steps: [
            "Apply neem cake (150 kg/acre) as basal",
            "Use mustard cake (100 kg/acre) for nitrogen",
            "Apply rock phosphate (75 kg/acre)",
            "Add wood ash (50 kg/acre) for potassium",
          ],
          benefits: ["Sustained nutrient supply", "Better tuber development", "Improved storage quality"],
        },
        {
          id: "disease-management",
          category: "Disease Management",
          title: "Organic Disease Control",
          description: "Control diseases using natural methods",
          materials: ["Copper fungicide", "Bordeaux mixture", "Baking soda", "Compost tea"],
          steps: [
            "Spray copper fungicide for late blight",
            "Use Bordeaux mixture preventively",
            "Apply baking soda solution (1%) for scab",
            "Drench with compost tea weekly",
          ],
          benefits: ["Disease prevention", "Improved plant health", "No chemical residues"],
        },
      ],
      expertTips: [
        {
          category: "Yield Enhancement",
          title: "Proper Earthing Up",
          description: "Earth up plants 2-3 times to prevent tuber greening and increase yield.",
          impact: "high",
        },
        {
          category: "Quality Improvement",
          title: "Harvest Timing",
          description: "Harvest when skin is set and tubers don't rub off easily for better storage quality.",
          impact: "high",
        },
        {
          category: "Cost Reduction",
          title: "Seed Production",
          description: "Produce your own seed tubers to reduce input costs and ensure quality.",
          impact: "medium",
        },
        {
          category: "Sustainability",
          title: "Crop Rotation",
          description: "Rotate potato with non-solanaceous crops to break disease cycles.",
          impact: "high",
        },
      ],
    },
  ]

  const selectedCropData = crops.find((crop) => crop.id === selectedCrop)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800">{t("smartCropping.title")}</h1>
          <p className="text-gray-600 mt-2">{t("smartCropping.subtitle")}</p>
        </div>
      </div>

      {!selectedCrop ? (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">{t("smartCropping.selectCrop")}</h2>
            <p className="text-gray-600">{t("smartCropping.chooseCrop")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crops.map((crop) => (
              <Card
                key={crop.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group"
                onClick={() => setSelectedCrop(crop.id)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={crop.image || "/placeholder.svg"}
                      alt={crop.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{crop.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {crop.season}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {crop.duration}
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {crop.yieldPotential.organic}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        selectedCropData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setSelectedCrop(null)}>
                ← {t("common.back")}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                {t("smartCropping.downloadGuide")}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={selectedCropData.image || "/placeholder.svg"}
                      alt={selectedCropData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{selectedCropData.name}</CardTitle>
                    <CardDescription className="mt-2">{selectedCropData.description}</CardDescription>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">{t("smartCropping.season")}</p>
                          <p className="text-sm text-gray-600">{selectedCropData.season}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">{t("smartCropping.duration")}</p>
                          <p className="text-sm text-gray-600">{selectedCropData.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">{t("smartCropping.yieldPotential")}</p>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500">
                              {t("smartCropping.conventional")}: {selectedCropData.yieldPotential.conventional}
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                              {t("smartCropping.organic")}: {selectedCropData.yieldPotential.organic}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="schedule">{t("smartCropping.cultivationSchedule")}</TabsTrigger>
                <TabsTrigger value="methods">{t("smartCropping.organicMethods")}</TabsTrigger>
                <TabsTrigger value="tips">{t("smartCropping.expertTips")}</TabsTrigger>
              </TabsList>

              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span>{t("smartCropping.cultivationSchedule")}</span>
                    </CardTitle>
                    <CardDescription>
                      Complete timeline for organic {selectedCropData.name.toLowerCase()} cultivation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {selectedCropData.stages.map((stage, index) => (
                        <div key={stage.id} className="relative">
                          {index < selectedCropData.stages.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-16 bg-green-200" />
                          )}
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <div className="text-green-600">{stage.icon}</div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">{stage.name}</h3>
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  {stage.duration}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mt-1">{stage.description}</p>
                              <div className="mt-3">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Activities:</h4>
                                <ul className="space-y-1">
                                  {stage.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>{activity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="methods" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCropData.organicMethods.map((method) => (
                    <Card key={method.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{method.title}</CardTitle>
                          <Badge variant="secondary">{method.category}</Badge>
                        </div>
                        <CardDescription>{method.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-900 mb-2">Materials Needed:</h4>
                          <div className="flex flex-wrap gap-2">
                            {method.materials.map((material, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-900 mb-2">Steps:</h4>
                          <ol className="space-y-1">
                            {method.steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                                <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium">
                                  {index + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-900 mb-2">Benefits:</h4>
                          <ul className="space-y-1">
                            {method.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                                <Leaf className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tips" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["Yield Enhancement", "Quality Improvement", "Cost Reduction", "Sustainability"].map((category) => {
                    const categoryTips = selectedCropData.expertTips.filter((tip) => tip.category === category)
                    if (categoryTips.length === 0) return null

                    return (
                      <Card key={category}>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            {category === "Yield Enhancement" && <TrendingUp className="h-5 w-5 text-green-600" />}
                            {category === "Quality Improvement" && <CheckCircle className="h-5 w-5 text-blue-600" />}
                            {category === "Cost Reduction" && <AlertCircle className="h-5 w-5 text-orange-600" />}
                            {category === "Sustainability" && <Leaf className="h-5 w-5 text-green-600" />}
                            <span>{category}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {categoryTips.map((tip, index) => (
                            <div key={index} className="border-l-4 border-green-200 pl-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{tip.title}</h4>
                                <Badge
                                  variant={
                                    tip.impact === "high"
                                      ? "default"
                                      : tip.impact === "medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className={
                                    tip.impact === "high"
                                      ? "bg-green-600"
                                      : tip.impact === "medium"
                                        ? "bg-yellow-600"
                                        : "border-gray-400"
                                  }
                                >
                                  {tip.impact} impact
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{tip.description}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )
      )}
    </div>
  )
}
