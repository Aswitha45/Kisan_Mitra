"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Mic, Send, MicOff } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function ChatbotButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "नमस्ते! मैं वसुधा हूँ, आपका कृषि सहायक। मैं आपकी किस प्रकार सहायता कर सकती हूँ?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [language, setLanguage] = useState("hindi")
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const speechSynthesisRef = useRef(null)

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speechSynthesisRef.current = window.speechSynthesis
    }

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // Function to speak text using speech synthesis
  const speakText = (text) => {
    if (!speechSynthesisRef.current) return

    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    // Set language based on selected language
    switch (language) {
      case "hindi":
        utterance.lang = "hi-IN"
        break
      case "telugu":
        utterance.lang = "te-IN"
        break
      case "tamil":
        utterance.lang = "ta-IN"
        break
      default:
        utterance.lang = "en-US"
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    speechSynthesisRef.current.speak(utterance)
  }

  // Process the user's message and generate a response
  const processMessage = (message) => {
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase()

    // Check for navigation commands
    if (lowerMessage.includes("loan") || lowerMessage.includes("कर्ज") || lowerMessage.includes("ऋण")) {
      return {
        response: "I can help you apply for a loan. Let me take you to the loan application form.",
        action: () => router.push("/dashboard/loans"),
      }
    } else if (lowerMessage.includes("crop") || lowerMessage.includes("फसल")) {
      return {
        response: "Let me show you our crop recommendations based on your soil and climate.",
        action: () => router.push("/dashboard/crop-recommendations"),
      }
    } else if (lowerMessage.includes("market") || lowerMessage.includes("बाजार") || lowerMessage.includes("मंडी")) {
      return {
        response: "I'll take you to our marketplace where you can buy and sell agricultural products.",
        action: () => router.push("/dashboard/marketplace"),
      }
    } else if (lowerMessage.includes("byproduct") || lowerMessage.includes("उप-उत्पाद")) {
      return {
        response: "Let me show you our byproducts marketplace where you can buy and sell agricultural byproducts.",
        action: () => router.push("/dashboard/byproducts"),
      }
    } else if (lowerMessage.includes("budget") || lowerMessage.includes("बजट")) {
      return {
        response: "I'll help you plan your farming budget. Let me take you to our budget planning tool.",
        action: () => router.push("/dashboard/budget-planning"),
      }
    } else if (lowerMessage.includes("dashboard") || lowerMessage.includes("डैशबोर्ड")) {
      return {
        response: "Taking you to the main dashboard.",
        action: () => router.push("/dashboard"),
      }
    } else if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("नमस्ते")) {
      return {
        response: "Hi, I am Vasudha. How can I help you today with your farming needs?",
        action: null,
      }
    } else {
      // Default response if no specific command is recognized
      return {
        response:
          "I can help you with loans, crop recommendations, marketplace, byproducts, budget planning, and more. What would you like assistance with?",
        action: null,
      }
    }
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const newMessages = [
      ...messages,
      {
        role: "user",
        content: inputMessage,
        timestamp: new Date(),
      },
    ]

    setMessages(newMessages)
    setInputMessage("")

    // Process the message and get response
    const { response, action } = processMessage(inputMessage)

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        role: "bot",
        content: response,
        timestamp: new Date(),
      }

      setMessages([...newMessages, botMessage])

      // Speak the response
      speakText(response)

      // Execute any action (like navigation) after a short delay
      if (action) {
        setTimeout(() => {
          action()
        }, 2000)
      }
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      return
    }

    setIsRecording(true)

    // Greet the user when they start recording
    const greeting = "Hi, I am Vasudha. How can I help you?"

    // Add bot greeting message
    const greetingMessage = {
      role: "bot",
      content: greeting,
      timestamp: new Date(),
    }

    setMessages([...messages, greetingMessage])

    // Speak the greeting
    speakText(greeting)

    // Simulate voice recognition after a delay
    setTimeout(() => {
      // Simulate recognized voice command (for demo purposes)
      const simulatedCommand = "How do I apply for a loan?"

      // Add user message
      const userMessage = {
        role: "user",
        content: simulatedCommand,
        timestamp: new Date(),
      }

      const updatedMessages = [...messages, greetingMessage, userMessage]
      setMessages(updatedMessages)

      // Process the command
      const { response, action } = processMessage(simulatedCommand)

      // Add bot response
      setTimeout(() => {
        const botResponse = {
          role: "bot",
          content: response,
          timestamp: new Date(),
        }

        setMessages([...updatedMessages, botResponse])

        // Speak the response
        speakText(response)

        // Execute any action (like navigation)
        if (action) {
          setTimeout(() => {
            setIsRecording(false)
            action()
          }, 2000)
        } else {
          setIsRecording(false)
        }
      }, 1500)
    }, 3000)
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-green-700"
        onClick={toggleChat}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-150px)] shadow-xl flex flex-col">
          <CardHeader className="bg-green-600 text-white py-3 px-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 border-2 border-white">
                <AvatarFallback className="bg-green-800 text-white">VA</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-bold">VASUDHA</CardTitle>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[100px] bg-green-700 border-green-500 text-white h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hindi">हिंदी</SelectItem>
                <SelectItem value="telugu">తెలుగు</SelectItem>
                <SelectItem value="tamil">தமிழ்</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === "user" ? "text-green-100" : "text-gray-500"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isSpeaking && (
              <div className="flex justify-center">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs flex items-center">
                  <span className="mr-2">Speaking</span>
                  <div className="flex space-x-1">
                    <div
                      className="w-1 h-3 bg-green-600 rounded-full animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1 h-3 bg-green-600 rounded-full animate-pulse"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-1 h-3 bg-green-600 rounded-full animate-pulse"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-3 border-t">
            <div className="flex items-center w-full gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isRecording ? "bg-red-100 text-red-600 border-red-300" : ""}`}
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff className="h-5 w-5 animate-pulse" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Input
                placeholder={language === "hindi" ? "अपना संदेश लिखें..." : "Type your message..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isRecording}
              />
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-green-600 text-white hover:bg-green-700 border-none"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isRecording}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
