"use client"

import { Checkbox } from "@/components/ui/checkbox"

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
} from "lucide-react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default function MarketplacePage() {
  const [userType, setUserType] = useState("buyer")
  const [showAddProductDialog, setShowAddProductDialog] = useState(false)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOption, setSortOption] = useState("popularity")

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "vegetables",
      price: 40,
      unit: "kg",
      rating: 4.5,
      seller: "Green Farms",
      location: "Hyderabad",
      organic: true,
      image: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
      description: "Fresh organic tomatoes grown without pesticides. Rich in flavor and nutrients.",
      stock: 50,
      minOrder: 2,
    },
    {
      id: 2,
      name: "Moong Dal",
      category: "pulses",
      price: 120,
      unit: "kg",
      rating: 4.2,
      seller: "Organic Pulses Co.",
      location: "Vijayawada",
      organic: true,
      image: "https://www.whats4eats.com/wp-content/uploads/2024/03/ingredients-mung-beans-pixabay-166996-4x3-1.jpg",
      description: "High-quality yellow moong dal, perfect for making dal, soups, and khichdi.",
      stock: 100,
      minOrder: 1,
    },
    {
      id: 3,
      name: "Fresh Spinach",
      category: "vegetables",
      price: 30,
      unit: "bunch",
      rating: 4.0,
      seller: "Healthy Greens",
      location: "Hyderabad",
      organic: true,
      image: "/images/products/fresh-spinach.jpeg",
      description: "Nutrient-rich spinach leaves, freshly harvested from our farm.",
      stock: 30,
      minOrder: 1,
    },
    {
      id: 4,
      name: "Basmati Rice",
      category: "grains",
      price: 90,
      unit: "kg",
      rating: 4.8,
      seller: "Rice Farmers Collective",
      location: "Warangal",
      organic: false,
      image: "/images/products/basmati-rice.jpeg",
      description: "Premium quality basmati rice with aromatic flavor and long grains.",
      stock: 200,
      minOrder: 5,
    },
    {
      id: 5,
      name: "Red Chilli Powder",
      category: "spices",
      price: 180,
      unit: "kg",
      rating: 4.6,
      seller: "Spice Garden",
      location: "Guntur",
      organic: true,
      image: "https://flourworks.in/wp-content/uploads/2023/07/RedChilliBoth-03_1500x.webp",
      description: "Authentic Guntur red chilli powder, known for its rich color and heat.",
      stock: 25,
      minOrder: 0.5,
    },
    {
      id: 6,
      name: "Fresh Potatoes",
      category: "vegetables",
      price: 25,
      unit: "kg",
      rating: 4.1,
      seller: "Root Vegetables Farm",
      location: "Bangalore",
      organic: false,
      image: "/images/products/fresh-potatoes.jpeg",
      description: "Fresh and clean potatoes, perfect for various culinary uses.",
      stock: 150,
      minOrder: 2,
    },
  ]

  const myProducts = [
    {
      id: 101,
      name: "Organic Rice",
      category: "grains",
      price: 60,
      unit: "kg",
      stock: 500,
      minOrder: 10,
      image: "https://countrylifefoods.com/cdn/shop/articles/organic_rice-590855.png?v=1737534403",
      description: "Organically grown rice from our farm. No pesticides or chemicals used.",
      orders: 12,
      revenue: 7200,
      status: "active",
    },
    {
      id: 102,
      name: "Fresh Onions",
      category: "vegetables",
      price: 35,
      unit: "kg",
      stock: 200,
      minOrder: 5,
      image: "https://m.media-amazon.com/images/I/51DJ-9xkuQL.jpg",
      description: "Freshly harvested onions, available in bulk quantities.",
      orders: 8,
      revenue: 1400,
      status: "active",
    },
    {
      id: 103,
      name: "Turmeric Powder",
      category: "spices",
      price: 250,
      unit: "kg",
      stock: 30,
      minOrder: 0.5,
      image: "https://vibrantliving.in/cdn/shop/files/TurmericPowder.png?v=1731060171",
      description: "Pure turmeric powder made from organically grown turmeric roots.",
      orders: 5,
      revenue: 625,
      status: "low-stock",
    },
  ]

  const filteredProducts = products
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
          <h1 className="text-2xl font-bold">Agricultural Marketplace</h1>
          <Tabs value={userType} onValueChange={setUserType} className="w-auto">
            <TabsList>
              <TabsTrigger value="buyer">Buy Products</TabsTrigger>
              <TabsTrigger value="seller">Sell Products</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={userType} className="w-full">
          <TabsContent value="buyer" className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for products..."
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
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="pulses">Pulses</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="spices">Spices</SelectItem>
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

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.organic && (
                      <Badge className="absolute top-2 right-2 bg-green-600">
                        <Leaf className="h-3 w-3 mr-1" /> Organic
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
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
                    <p className="text-sm text-gray-400 mt-1">Add some products to your cart</p>
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
              <h2 className="text-xl font-semibold">My Products</h2>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowAddProductDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Product Listings</CardTitle>
                <CardDescription>Manage your products and track sales</CardDescription>
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
                      {myProducts.map((product, index) => (
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
                                <div className="text-xs text-gray-500">{product.category}</div>
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
                      <span className="font-medium">25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Revenue</span>
                      <span className="font-medium">₹9,225</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Active Products</span>
                      <span className="font-medium">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Selling Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <img
                      src="/images/products/organic-rice.jpg"
                      alt="Organic Rice"
                      className="w-16 h-16 object-cover rounded mr-3"
                    />
                    <div>
                      <h3 className="font-medium">Organic Rice</h3>
                      <p className="text-sm text-gray-500">12 orders • ₹7,200 revenue</p>
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
                      <span className="text-sm">Turmeric Powder - Low Stock (30 kg)</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Update Inventory
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Product Details Dialog */}
        <Dialog open={showProductDetails} onOpenChange={setShowProductDetails}>
          <DialogContent className="max-w-3xl">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                  <DialogDescription>Product details and purchasing information</DialogDescription>
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
                        <p className="font-medium capitalize">{selectedProduct.category}</p>
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
                        <p className="text-gray-500">Organic</p>
                        <p className="font-medium">{selectedProduct.organic ? "Yes" : "No"}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Delivery Information</h4>
                      <div className="flex items-start">
                        <Truck className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          Delivery available within 50km radius. Estimated delivery time: 1-2 days.
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
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Enter the details of your product to list it on the marketplace</DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="Enter product name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select required>
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="pulses">Pulses</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-price">Price (₹)</Label>
                  <Input id="product-price" type="number" placeholder="Enter price" min="1" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-unit">Unit</Label>
                  <Select required>
                    <SelectTrigger id="product-unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="g">Gram (g)</SelectItem>
                      <SelectItem value="piece">Piece</SelectItem>
                      <SelectItem value="dozen">Dozen</SelectItem>
                      <SelectItem value="bunch">Bunch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-stock">Available Stock</Label>
                  <Input id="product-stock" type="number" placeholder="Enter available stock" min="1" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-min-order">Minimum Order</Label>
                  <Input
                    id="product-min-order"
                    type="number"
                    placeholder="Enter minimum order"
                    min="0.1"
                    step="0.1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-image">Product Image</Label>
                <Input id="product-image" type="file" className="cursor-pointer" />
                <p className="text-xs text-gray-500">Upload a clear image of your product (max 5MB)</p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="is-organic" />
                <Label htmlFor="is-organic" className="cursor-pointer">
                  This is an organic product
                </Label>
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
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
