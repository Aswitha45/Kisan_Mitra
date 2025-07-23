"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Building, Phone, Calendar, CheckCircle2, Clock } from "lucide-react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default function LoansPage() {
  const [activeTab, setActiveTab] = useState("apply")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedBank, setSelectedBank] = useState("")
  const [loanAmount, setLoanAmount] = useState("")
  const [landArea, setLandArea] = useState("")
  const [loanPurpose, setLoanPurpose] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [collateralType, setCollateralType] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setActiveTab("track")
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Agricultural Loans</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
            <TabsTrigger value="track">Track Applications</TabsTrigger>
            <TabsTrigger value="schemes">Loan Schemes</TabsTrigger>
          </TabsList>

          <TabsContent value="apply" className="space-y-6">
            {!formSubmitted ? (
              <Card>
                <CardHeader>
                  <CardTitle>Loan Application Form</CardTitle>
                  <CardDescription>Fill in the details below to apply for an agricultural loan</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">1. Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="full-name">Full Name</Label>
                          <Input id="full-name" placeholder="Enter your full name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="Enter your phone number" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="aadhaar">Aadhaar Number</Label>
                          <Input id="aadhaar" placeholder="Enter your 12-digit Aadhaar number" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pan">PAN Card Number</Label>
                          <Input id="pan" placeholder="Enter your PAN card number" required />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">2. Land & Farming Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="land-area">Total Land Area (in acres)</Label>
                          <Input
                            id="land-area"
                            type="number"
                            placeholder="Enter land area"
                            value={landArea}
                            onChange={(e) => setLandArea(e.target.value)}
                            min="0.1"
                            step="0.1"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="land-type">Land Type</Label>
                          <Select required>
                            <SelectTrigger id="land-type">
                              <SelectValue placeholder="Select land type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="irrigated">Irrigated Land</SelectItem>
                              <SelectItem value="non-irrigated">Non-Irrigated Land</SelectItem>
                              <SelectItem value="mixed">Mixed Land</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ownership">Land Ownership</Label>
                          <Select required>
                            <SelectTrigger id="ownership">
                              <SelectValue placeholder="Select ownership type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="owned">Self-Owned</SelectItem>
                              <SelectItem value="leased">Leased</SelectItem>
                              <SelectItem value="ancestral">Ancestral Property</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="crop-type">Primary Crop</Label>
                          <Select required>
                            <SelectTrigger id="crop-type">
                              <SelectValue placeholder="Select primary crop" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rice">Rice (Paddy)</SelectItem>
                              <SelectItem value="wheat">Wheat</SelectItem>
                              <SelectItem value="cotton">Cotton</SelectItem>
                              <SelectItem value="sugarcane">Sugarcane</SelectItem>
                              <SelectItem value="vegetables">Vegetables</SelectItem>
                              <SelectItem value="pulses">Pulses</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">3. Loan Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                          <Input
                            id="loan-amount"
                            type="number"
                            placeholder="Enter loan amount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            min="10000"
                            step="1000"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loan-term">Loan Term</Label>
                          <Select value={loanTerm} onValueChange={setLoanTerm} required>
                            <SelectTrigger id="loan-term">
                              <SelectValue placeholder="Select loan term" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Short Term (Up to 1 year)</SelectItem>
                              <SelectItem value="medium">Medium Term (1-3 years)</SelectItem>
                              <SelectItem value="long">Long Term (3-5 years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="loan-purpose">Loan Purpose</Label>
                          <Select value={loanPurpose} onValueChange={setLoanPurpose} required>
                            <SelectTrigger id="loan-purpose">
                              <SelectValue placeholder="Select loan purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="crop">Crop Production</SelectItem>
                              <SelectItem value="equipment">Farm Equipment</SelectItem>
                              <SelectItem value="irrigation">Irrigation System</SelectItem>
                              <SelectItem value="storage">Storage Facility</SelectItem>
                              <SelectItem value="livestock">Livestock Purchase</SelectItem>
                              <SelectItem value="other">Other Purpose</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {loanPurpose === "other" && (
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="purpose-details">Specify Purpose</Label>
                            <Textarea
                              id="purpose-details"
                              placeholder="Please specify the purpose of the loan"
                              required
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">4. Collateral & Security</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="collateral-type">Collateral Type</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="land"
                                name="collateral-type"
                                value="land"
                                checked={collateralType === "land"}
                                onChange={() => setCollateralType("land")}
                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                              />
                              <Label htmlFor="land" className="cursor-pointer">
                                Land as Collateral
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="property"
                                name="collateral-type"
                                value="property"
                                checked={collateralType === "property"}
                                onChange={() => setCollateralType("property")}
                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                              />
                              <Label htmlFor="property" className="cursor-pointer">
                                Property as Collateral
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="gold"
                                name="collateral-type"
                                value="gold"
                                checked={collateralType === "gold"}
                                onChange={() => setCollateralType("gold")}
                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                              />
                              <Label htmlFor="gold" className="cursor-pointer">
                                Gold as Collateral
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="none"
                                name="collateral-type"
                                value="none"
                                checked={collateralType === "none"}
                                onChange={() => setCollateralType("none")}
                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                              />
                              <Label htmlFor="none" className="cursor-pointer">
                                No Collateral (KCC)
                              </Label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Documents Available</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="land-records" />
                              <Label htmlFor="land-records" className="cursor-pointer">
                                Land Records
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="income-proof" />
                              <Label htmlFor="income-proof" className="cursor-pointer">
                                Income Proof
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="id-proof" />
                              <Label htmlFor="id-proof" className="cursor-pointer">
                                ID Proof
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="address-proof" />
                              <Label htmlFor="address-proof" className="cursor-pointer">
                                Address Proof
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">5. Select Bank</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BankCard
                          name="State Bank of India"
                          interestRate="7.0% - 8.5%"
                          maxAmount="₹10,00,000"
                          selected={selectedBank === "sbi"}
                          onClick={() => setSelectedBank("sbi")}
                        />
                        <BankCard
                          name="NABARD Kisan Credit"
                          interestRate="4.0% - 7.0%"
                          maxAmount="₹3,00,000"
                          selected={selectedBank === "nabard"}
                          onClick={() => setSelectedBank("nabard")}
                        />
                        <BankCard
                          name="Punjab National Bank"
                          interestRate="7.5% - 9.0%"
                          maxAmount="₹7,50,000"
                          selected={selectedBank === "pnb"}
                          onClick={() => setSelectedBank("pnb")}
                        />
                        <BankCard
                          name="HDFC Kisan Loan"
                          interestRate="8.0% - 10.0%"
                          maxAmount="₹15,00,000"
                          selected={selectedBank === "hdfc"}
                          onClick={() => setSelectedBank("hdfc")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm">
                          I confirm that all the information provided is accurate and I agree to the terms and
                          conditions
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={!selectedBank}>
                      Submit Loan Application
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            ) : (
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <CardTitle>Application Submitted Successfully</CardTitle>
                  </div>
                  <CardDescription>
                    Your loan application has been submitted. You can track its status in the "Track Applications" tab.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Application ID:</span>
                      <span>LOAN-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bank:</span>
                      <span>{getBankName(selectedBank)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Loan Amount:</span>
                      <span>₹{Number.parseInt(loanAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Submission Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setFormSubmitted(false)}>
                    Apply for Another Loan
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => setActiveTab("track")}>
                    Track Application
                  </Button>
                </CardFooter>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard
                icon={<FileText className="h-5 w-5 text-green-600" />}
                title="Required Documents"
                description="Keep your land records, ID proof, address proof, and income statements ready for faster processing."
              />
              <InfoCard
                icon={<Calendar className="h-5 w-5 text-green-600" />}
                title="Processing Time"
                description="Loan applications typically take 7-14 days to process, depending on document verification."
              />
              <InfoCard
                icon={<Phone className="h-5 w-5 text-green-600" />}
                title="Need Help?"
                description="Call our helpline at 1800-123-4567 for assistance with your loan application."
              />
            </div>
          </TabsContent>

          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Loan Applications</CardTitle>
                <CardDescription>View the status of your submitted loan applications</CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="space-y-4">
                    <LoanApplicationCard
                      id={`LOAN-${Math.floor(100000 + Math.random() * 900000)}`}
                      bank={getBankName(selectedBank)}
                      amount={Number.parseInt(loanAmount).toLocaleString()}
                      date={new Date().toLocaleDateString()}
                      status="Under Review"
                      statusColor="yellow"
                    />

                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                      <div className="relative pl-10 pb-6">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-green-100 border-2 border-green-500">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <h4 className="font-medium text-sm">Application Submitted</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-10 pb-6">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-yellow-100 border-2 border-yellow-500">
                          <Clock className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <h4 className="font-medium text-sm">Document Verification</h4>
                          <p className="text-xs text-gray-600 mt-1">Your documents are being verified by the bank</p>
                        </div>
                      </div>

                      <div className="relative pl-10 pb-6">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300">
                          <span className="text-xs font-medium text-gray-600">3</span>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3">
                          <h4 className="font-medium text-sm">Credit Assessment</h4>
                          <p className="text-xs text-gray-600 mt-1">Pending credit assessment and approval</p>
                        </div>
                      </div>

                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300">
                          <span className="text-xs font-medium text-gray-600">4</span>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3">
                          <h4 className="font-medium text-sm">Loan Disbursement</h4>
                          <p className="text-xs text-gray-600 mt-1">Pending loan approval and disbursement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No Applications Found</h3>
                    <p className="text-gray-500 mb-6">You haven't submitted any loan applications yet.</p>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => setActiveTab("apply")}>
                      Apply for a Loan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agricultural Loan Schemes</CardTitle>
                <CardDescription>Explore various loan schemes available for farmers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <LoanSchemeCard
                  title="Kisan Credit Card (KCC)"
                  provider="Multiple Banks"
                  interestRate="4% (with subsidy)"
                  maxAmount="₹3,00,000"
                  description="Short-term credit for crop production, post-harvest expenses, and maintenance of farm assets."
                  features={[
                    "No collateral required up to ₹1,60,000",
                    "Interest subvention of 2% for prompt repayment",
                    "Flexible withdrawal and repayment",
                    "Personal accident insurance cover",
                  ]}
                />

                <LoanSchemeCard
                  title="Agricultural Term Loan"
                  provider="Commercial Banks"
                  interestRate="8.5% - 12.5%"
                  maxAmount="Based on project cost"
                  description="Medium to long-term loans for capital investments in agriculture and allied activities."
                  features={[
                    "Funding for farm mechanization, land development",
                    "Flexible repayment options based on cash flow",
                    "Moratorium period available",
                    "Collateral required in most cases",
                  ]}
                />

                <LoanSchemeCard
                  title="NABARD Rural Infrastructure Development Fund"
                  provider="NABARD through Banks"
                  interestRate="6.5% - 8.0%"
                  maxAmount="Based on project assessment"
                  description="Financing for rural infrastructure projects that support agricultural activities."
                  features={[
                    "Funding for irrigation projects, rural roads",
                    "Long repayment period of 7-15 years",
                    "Grace period of 2-3 years",
                    "Lower interest rates compared to commercial loans",
                  ]}
                />

                <LoanSchemeCard
                  title="PM Kisan Samman Nidhi Yojana"
                  provider="Government of India"
                  interestRate="Not applicable (Direct Benefit)"
                  maxAmount="₹6,000 per year"
                  description="Direct income support to farmer families to supplement their financial needs."
                  features={[
                    "Direct benefit transfer to farmer's account",
                    "No repayment required as it's not a loan",
                    "All landholding farmer families eligible",
                    "Amount provided in three equal installments",
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function BankCard({ name, interestRate, maxAmount, selected, onClick }) {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
        selected ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Building className="h-5 w-5 text-gray-700 mr-3" />
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-gray-500 mt-1">Agricultural Loan Provider</p>
          </div>
        </div>
        {selected && <CheckCircle2 className="h-5 w-5 text-green-600" />}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Interest Rate</p>
          <p className="font-medium">{interestRate}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Maximum Amount</p>
          <p className="font-medium">{maxAmount}</p>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, title, description }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-start">
        <div className="bg-green-50 rounded-full p-2 mr-3">{icon}</div>
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}

function LoanApplicationCard({ id, bank, amount, date, status, statusColor }) {
  const getStatusBadgeColor = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800 border-green-200"
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "red":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="h-4 w-4 text-gray-500 mr-2" />
          <span className="font-medium text-sm">{id}</span>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusBadgeColor(statusColor)}`}>
          {status}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Bank</p>
            <p className="font-medium">{bank}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Amount</p>
            <p className="font-medium">₹{amount}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Application Date</p>
            <p className="font-medium">{date}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" className="text-xs h-8">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

function LoanSchemeCard({ title, provider, interestRate, maxAmount, description, features }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">Provider: {provider}</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Interest Rate</p>
            <p className="font-medium">{interestRate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Maximum Amount</p>
            <p className="font-medium">{maxAmount}</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4">{description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Key Features:</h4>
          <ul className="text-sm space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-end">
          <Button className="bg-green-600 hover:bg-green-700">Apply Now</Button>
        </div>
      </div>
    </div>
  )
}

// Helper function to get bank name
function getBankName(bankCode) {
  const banks = {
    sbi: "State Bank of India",
    nabard: "NABARD Kisan Credit",
    pnb: "Punjab National Bank",
    hdfc: "HDFC Kisan Loan",
  }

  return banks[bankCode] || "Selected Bank"
}
