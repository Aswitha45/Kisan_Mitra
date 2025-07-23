"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "@/lib/i18n/translations"

type Language = "en" | "hi" | "te" | "ta"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["en", "hi", "te", "ta"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
      setIsInitialized(true)
    }
  }, [])

  // Update localStorage when language changes
  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      localStorage.setItem("language", language)
    }
  }, [language, isInitialized])

  const t = (key: string): string => {
    try {
      if (!key || typeof key !== "string") {
        console.warn(`Invalid translation key: ${key}`)
        return key
      }

      const keys = key.split(".")
      let value: any = translations[language]

      for (const k of keys) {
        if (value === undefined || value === null) {
          console.warn(`Translation missing for key: ${key} in language: ${language}`)
          // Fallback to English if current language doesn't have the key
          value = translations.en
          for (const fallbackKey of keys) {
            if (value === undefined || value === null) {
              return key
            }
            value = value[fallbackKey]
          }
          return value || key
        }
        value = value[k]
      }

      if (typeof value !== "string") {
        console.warn(`Translation value is not a string for key: ${key}`)
        return key
      }

      return value
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error)
      return key
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
