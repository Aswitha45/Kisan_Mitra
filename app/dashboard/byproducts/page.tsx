"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Star,
  MapPin,
  Truck,
  ShoppingBag,
  Heart,
  Share2,
  ArrowUpDown,
  Leaf,
  Recycle,
  Flame,
  Tractor,
  Factory,
  Apple,
  Zap,
  Wheat,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default function ByproductsPage() {
  const [userType, setUserType] = useState("buyer")
  const [showAddProductDialog, setShowAddProductDialog] = useState(false)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOption, setSortOption] = useState("popularity")

  const byproducts = [
    {
      id: 1,
      name: "Rice Straw",
      category: "animal-feed",
      price: 2,
      unit: "kg",
      rating: 4.3,
      seller: "Green Farms",
      location: "Hyderabad",
      image: "/images/products/rice-straw.jpeg",
      description:
        "High-quality rice straw, perfect for animal bedding and feed. Collected after harvest and properly dried.",
      stock: 1500,
      minOrder: 50,
      categoryIcon: <Wheat className="h-4 w-4" />,
    },
    {
      id: 2,
      name: "Sugarcane Bagasse",
      category: "biofuels",
      price: 3.5,
      unit: "kg",
      rating: 4.1,
      seller: "Sugarcane Cooperative",
      location: "Vijayawada",
      image:
        "https://cdn11.bigcommerce.com/s-b9pwig4brj/product_images/uploaded_images/0-featured-sugarcane-bagasse-plates-start-here.jpg",
      description:
        "Dried sugarcane bagasse, excellent for biofuel production or as a raw material for paper manufacturing.",
      stock: 2000,
      minOrder: 100,
      categoryIcon: <Flame className="h-4 w-4" />,
    },
    {
      id: 3,
      name: "Composted Manure",
      category: "fertilizers",
      price: 8,
      unit: "kg",
      rating: 4.8,
      seller: "Organic Solutions",
      location: "Warangal",
      image: "/images/products/compost.jpeg",
      description: "Well-composted organic manure, rich in nutrients. Perfect for organic farming and gardening.",
      stock: 800,
      minOrder: 25,
      categoryIcon: <Recycle className="h-4 w-4" />,
    },
    {
      id: 4,
      name: "Cotton Stalks",
      category: "raw-materials",
      price: 1.5,
      unit: "kg",
      rating: 4.0,
      seller: "Cotton Growers Association",
      location: "Guntur",
      image: "/images/products/cotton-stalks.jpeg",
      description: "Dried cotton stalks that can be used for paper production, particle boards, or as biomass fuel.",
      stock: 3000,
      minOrder: 100,
      categoryIcon: <Factory className="h-4 w-4" />,
    },
    {
      id: 5,
      name: "Fruit Pulp Waste",
      category: "food-additives",
      price: 12,
      unit: "kg",
      rating: 4.5,
      seller: "Fruit Processing Unit",
      location: "Bangalore",
      image: "/images/products/fruit-peels.jpeg",
      description:
        "Fruit pulp waste from processing, suitable for extraction of pectin, dietary fiber, and natural colors.",
      stock: 200,
      minOrder: 10,
      categoryIcon: <Apple className="h-4 w-4" />,
    },
    {
      id: 6,
      name: "Biogas Slurry",
      category: "energy-production",
      price: 5,
      unit: "liter",
      rating: 4.2,
      seller: "Green Energy Farm",
      location: "Chennai",
      image: "/images/products/biogas-slurry.jpeg",
      description: "Nutrient-rich slurry from biogas plants, excellent as liquid fertilizer for crops.",
      stock: 500,
      minOrder: 20,
      categoryIcon: <Zap className="h-4 w-4" />,
    },
    {
      id: 7,
      name: "Wheat Bran",
      category: "animal-feed",
      price: 15,
      unit: "kg",
      rating: 4.6,
      seller: "Grain Mills Co.",
      location: "Delhi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYaxMXq86W498Os7gIPF2_IZlRbCg_ZbjfQ&s",
      description: "Nutritious wheat bran, excellent for livestock feed with high fiber content.",
      stock: 1000,
      minOrder: 25,
      categoryIcon: <Wheat className="h-4 w-4" />,
    },
    {
      id: 8,
      name: "Coconut Husk",
      category: "raw-materials",
      price: 4,
      unit: "kg",
      rating: 4.3,
      seller: "Coastal Farms",
      location: "Kerala",
      image: "/images/products/coconut-husk.jpeg",
      description: "Coconut husks for coir production, gardening, or as a growing medium.",
      stock: 1200,
      minOrder: 50,
      categoryIcon: <Factory className="h-4 w-4" />,
    },
  ]

  const myByproducts = [
    {
      id: 101,
      name: "Rice Husk",
      category: "raw-materials",
      price: 3,
      unit: "kg",
      stock: 2000,
      minOrder: 50,
      image:
        "https://lh7-rt.googleusercontent.com/docsz/AD_4nXf484lLMevOBFswhX54X8IsIzdWvFHXSALoYmVNPBl1KL0--mq3bcWqvlLLk4O5bg9ePOZnwNTB8RVG5hTZGCOn_jGuevPLSs0sTsHf2nu10q1ceBYnICwmlBl6I8AS2ugZumN6oe-CYuA-og6K_4kfew0?key=TEtPCAOQnEc5QCNhilqhRw",
      description: "Rice husks from our rice mill, suitable for fuel, building materials, or animal bedding.",
      orders: 15,
      revenue: 2250,
      status: "active",
    },
    {
      id: 102,
      name: "Cow Manure",
      category: "fertilizers",
      price: 6,
      unit: "kg",
      stock: 500,
      minOrder: 25,
      image: "/images/products/cow-manure.jpeg",
      description: "Organic cow manure, aged and ready to use as fertilizer for all types of crops.",
      orders: 12,
      revenue: 1800,
      status: "active",
    },
    {
      id: 103,
      name: "Corn Stalks",
      category: "animal-feed",
      price: 2.5,
      unit: "kg",
      stock: 800,
      minOrder: 100,
      image: "https://www.countrymillfarms.com/uploads/8/3/4/2/83427896/s316092691655243770_p87_i1_w960.jpeg",
      description: "Dried corn stalks, suitable for animal feed or bedding material.",
      orders: 8,
      revenue: 2000,
      status: "low-stock",
    },
  ]

  const getCategoryName = (categoryCode) => {
    const categories = {
      "animal-feed": "Animal Feed",
      biofuels: "Biofuels",
      fertilizers: "Fertilizers",
      "raw-materials": "Raw Materials",
      "food-additives": "Food Additives",
      "energy-production": "Energy Production",
      other: "Other Uses",
    }

    return categories[categoryCode] || categoryCode
  }

  const getCategoryIcon = (categoryCode) => {
    const icons = {
      "animal-feed": <Tractor className="h-4 w-4" />,
      biofuels: <Flame className="h-4 w-4" />,
      fertilizers: <Recycle className="h-4 w-4" />,
      "raw-materials": <Factory className="h-4 w-4" />,
      "food-additives": <Apple className="h-4 w-4" />,
      "energy-production": <Zap className="h-4 w-4" />,
      other: <Leaf className="h-4 w-4" />,
    }

    return icons[categoryCode] || <Leaf className="h-4 w-4" />
  }

  const filteredByproducts = byproducts
    .filter((product) => {
      // Apply search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Apply category filter
      if (categoryFilter !== "all" && product.category !== categoryFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOption) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default: // popularity
          return b.rating - a.rating
      }
    })

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setShowProductDetails(true)
  }

  const totalCartValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Agricultural Byproducts Marketplace</h1>
          <Tabs value={userType} onValueChange={setUserType} className="w-auto">
            <TabsList>
              <TabsTrigger value="buyer">Buy Byproducts</TabsTrigger>
              <TabsTrigger value="seller">Sell Byproducts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mb-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Recycle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-800">Sustainable Agriculture Through Byproduct Utilization</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Agricultural byproducts can be valuable resources rather than waste. By selling or buying
                    byproducts, you contribute to sustainable farming practices, reduce waste, and create additional
                    income streams.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={userType} className="w-full">
          <TabsContent value="buyer" className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for byproducts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>Category</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="animal-feed">Animal Feed</SelectItem>
                    <SelectItem value="biofuels">Biofuels</SelectItem>
                    <SelectItem value="fertilizers">Fertilizers</SelectItem>
                    <SelectItem value="raw-materials">Raw Materials</SelectItem>
                    <SelectItem value="food-additives">Food Additives</SelectItem>
                    <SelectItem value="energy-production">Energy Production</SelectItem>
                    <SelectItem value="other">Other Uses</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <span>Sort By</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                className="h-auto py-2 justify-start"
                onClick={() => setCategoryFilter("all")}
              >
                <Leaf className="h-4 w-4 mr-2" />
                <span>All</span>
              </Button>
              <Button
                variant={categoryFilter === "animal-feed" ? "default" : "outline"}
                className="h-auto py-2 justify-start"
                onClick={() => setCategoryFilter("animal-feed")}
              >
                <Tractor className="h-4 w-4 mr-2" />
                <span>Animal Feed</span>
              </Button>
              <Button
                variant={categoryFilter === "biofuels" ? "default" : "outline"}
                className="h-auto py-2 justify-start"
                onClick={() => setCategoryFilter("biofuels")}
              >
                <Flame className="h-4 w-4 mr-2" />
                <span>Biofuels</span>
              </Button>
              <Button
                variant={categoryFilter === "fertilizers" ? "default" : "outline"}
                className="h-auto py-2 justify-start"
                onClick={() => setCategoryFilter("fertilizers")}
              >
                <Recycle className="h-4 w-4 mr-2" />
                <span>Fertilizers</span>
              </Button>
              <Button
                variant={categoryFilter === "raw-materials" ? "default" : "outline"}
                className="h-auto py-2 justify-start"
                onClick={() => setCategoryFilter("raw-materials")}
              >
                <Factory className="h-4 w-4 mr-2" />
                <span>Raw Materials</span>
              </Button>
              <Button
                variant={categoryFilter === "food-additives" ? "default" : "outline"}
                className="h-auto py-2 justify-start"
                onClick={() => setCategoryFilter("food-additives")}
              >
                <Apple className="h-4 w-4 mr-2" />
                <span>Food Additives</span>
              </Button>
              <Button
                variant={categoryFilter === "energy-production" ? "default" : "outline"}
                className="h-auto py-2 justify-start"
                onClick={() => setCategoryFilter("energy-production")}
              >
                <Zap className="h-4 w-4 mr-2" />
                <span>Energy</span>
              </Button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredByproducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600 flex items-center">
                      {product.categoryIcon}
                      <span className="ml-1">{getCategoryName(product.category)}</span>
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{getCategoryName(product.category)}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{product.location}</span>
                      <span className="mx-2">•</span>
                      <span>Seller: {product.seller}</span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-lg font-bold">₹{product.price}</span>
                        <span className="text-sm text-gray-500">/{product.unit}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Min order: {product.minOrder} {product.unit}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleProductClick(product)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Shopping Cart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Shopping Cart
                  {cartItems.length > 0 && <Badge className="ml-2 bg-green-600">{cartItems.length}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-6">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-gray-500">Your cart is empty</h3>
                    <p className="text-sm text-gray-400 mt-1">Add some byproducts to your cart</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded mr-3"
                          />
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center text-sm">
                              <span className="text-gray-500">
                                ₹{item.price}/{item.unit}
                              </span>
                              <span className="mx-2">•</span>
                              <span className="text-gray-500">Seller: {item.seller}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="flex items-center border rounded-md mr-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>

                          <div className="text-right min-w-[80px]">
                            <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs text-red-600 p-0"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <p className="text-gray-500">Subtotal</p>
                        <p className="text-xl font-bold">₹{totalCartValue.toFixed(2)}</p>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">Proceed to Checkout</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Byproducts</h2>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowAddProductDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Byproduct
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Byproduct Listings</CardTitle>
                <CardDescription>Manage your agricultural byproducts and track sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">Product</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-500">Price</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-500">Stock</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-500">Orders</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-500">Revenue</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-500">Status</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {myByproducts.map((product, index) => (
                        <tr key={product.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded mr-3"
                              />
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs text-gray-500">{getCategoryName(product.category)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            ₹{product.price}/{product.unit}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {product.stock} {product.unit}
                          </td>
                          <td className="px-4 py-3 text-right">{product.orders}</td>
                          <td className="px-4 py-3 text-right">₹{product.revenue}</td>
                          <td className="px-4 py-3 text-right">
                            <Badge
                              className={`${
                                product.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : product.status === "low-stock"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }`}
                            >
                              {product.status === "active"
                                ? "Active"
                                : product.status === "low-stock"
                                  ? "Low Stock"
                                  : "Out of Stock"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm" className="h-8">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Sales Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Orders</span>
                      <span className="font-medium">35</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Revenue</span>
                      <span className="font-medium">₹6,050</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Active Listings</span>
                      <span className="font-medium">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Selling Byproduct</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <img
                      src="/images/byproducts/rice-husk.jpg"
                      alt="Rice Husk"
                      className="w-16 h-16 object-cover rounded mr-3"
                    />
                    <div>
                      <h3 className="font-medium">Rice Husk</h3>
                      <p className="text-sm text-gray-500">15 orders • ₹2,250 revenue</p>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Top Seller</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Inventory Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Corn Stalks - Low Stock (800 kg)</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Update Inventory
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Byproduct Usage Guide</CardTitle>
                <CardDescription>
                  Information about different types of agricultural byproducts and their potential uses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Tractor className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Animal Feed</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Straws, hulls, and other crop residues can be used as feed for livestock. These materials provide
                      fiber and nutrients.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Flame className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Biofuels</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Bagasse, crop residues, and other biomass can be used to produce biofuels like biogas, biodiesel,
                      and bioethanol.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Recycle className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Fertilizers</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Manure and composted crop residues can be used as organic fertilizers, improving soil health and
                      reducing chemical inputs.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Factory className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Raw Materials</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Byproducts can be used as raw materials in various industries, including paper, plastics,
                      adhesives, and more.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Apple className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Food Additives</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Peels, hulls, seeds, and pulp can be used as food additives, functional additives, and
                      nutraceuticals.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Zap className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Energy Production</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Agricultural waste can be converted into energy through processes like anaerobic digestion,
                      producing biogas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Product Details Dialog */}
        <Dialog open={showProductDetails} onOpenChange={setShowProductDetails}>
          <DialogContent className="max-w-3xl">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                  <DialogDescription>Byproduct details and purchasing information</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Heart className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold">₹{selectedProduct.price}</span>
                          <span className="text-gray-500">/{selectedProduct.unit}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{selectedProduct.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{selectedProduct.location}</span>
                        <span className="mx-2">•</span>
                        <span>Seller: {selectedProduct.seller}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Description</h4>
                      <p className="text-gray-700">{selectedProduct.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Category</p>
                        <p className="font-medium">{getCategoryName(selectedProduct.category)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Available Stock</p>
                        <p className="font-medium">
                          {selectedProduct.stock} {selectedProduct.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Minimum Order</p>
                        <p className="font-medium">
                          {selectedProduct.minOrder} {selectedProduct.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Potential Uses</p>
                        <p className="font-medium">{getCategoryName(selectedProduct.category)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Delivery Information</h4>
                      <div className="flex items-start">
                        <Truck className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          Delivery available within 50km radius. Estimated delivery time: 1-3 days. Bulk orders may
                          require special transportation arrangements.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          handleAddToCart(selectedProduct)
                          setShowProductDetails(false)
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Product Dialog */}
        <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Byproduct</DialogTitle>
              <DialogDescription>
                Enter the details of your agricultural byproduct to list it on the marketplace
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Byproduct Name</Label>
                  <Input id="product-name" placeholder="Enter byproduct name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select required>
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="animal-feed">Animal Feed</SelectItem>
                      <SelectItem value="biofuels">Biofuels</SelectItem>
                      <SelectItem value="fertilizers">Fertilizers</SelectItem>
                      <SelectItem value="raw-materials">Raw Materials</SelectItem>
                      <SelectItem value="food-additives">Food Additives</SelectItem>
                      <SelectItem value="energy-production">Energy Production</SelectItem>
                      <SelectItem value="other">Other Uses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-price">Price (₹)</Label>
                  <Input id="product-price" type="number" placeholder="Enter price" min="0.1" step="0.1" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-unit">Unit</Label>
                  <Select required>
                    <SelectTrigger id="product-unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="ton">Ton</SelectItem>
                      <SelectItem value="bundle">Bundle</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                      <SelectItem value="piece">Piece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-stock">Available Stock</Label>
                  <Input id="product-stock" type="number" placeholder="Enter available stock" min="1" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-min-order">Minimum Order</Label>
                  <Input id="product-min-order" type="number" placeholder="Enter minimum order" min="1" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your byproduct, its quality, and potential uses"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-image">Product Image</Label>
                <Input id="product-image" type="file" className="cursor-pointer" />
                <p className="text-xs text-gray-500">Upload a clear image of your byproduct (max 5MB)</p>
              </div>
            </form>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddProductDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  // Handle form submission
                  setShowAddProductDialog(false)
                }}
              >
                Add Byproduct
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
