"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const phoneNumber = searchParams.get("phone") || ""
  const name = searchParams.get("name") || ""

  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (!/^\d*$/.test(value)) {
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleResendOtp = () => {
    setIsResending(true)

    // Simulate API call to resend OTP
    setTimeout(() => {
      setTimeLeft(30)
      setIsResending(false)
      toast({
        title: "OTP Resent",
        description: `A new OTP has been sent to ${phoneNumber}`,
      })
    }, 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const otpValue = otp.join("")
    if (otpValue.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // For demo purposes, any 4-digit OTP is accepted
    // In a real app, you would verify this with your backend
    setTimeout(() => {
      setIsLoading(false)

      // Store user info in localStorage (in a real app, use a proper auth system)
      localStorage.setItem("user", JSON.stringify({ name, phoneNumber }))

      toast({
        title: "Success",
        description: "OTP verified successfully",
      })

      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
      <Link href="/auth" className="absolute top-4 left-4 flex items-center text-green-700 hover:text-green-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      <div className="flex items-center mb-8">
        <Leaf className="h-8 w-8 text-green-600 mr-2" />
        <h1 className="text-3xl font-bold text-green-800">KISAN MITRA</h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">OTP Verification</CardTitle>
          <CardDescription className="text-center">We've sent a 4-digit code to {phoneNumber}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex justify-center space-x-3">
              {[0, 1, 2, 3].map((index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  className="w-14 h-14 text-center text-xl"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-500">Resend OTP in {timeLeft} seconds</p>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  className="text-green-600 p-0 h-auto"
                  onClick={handleResendOtp}
                  disabled={isResending}
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </Button>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading || otp.join("").length !== 4}
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
