"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function LandingPage() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-green-700 text-white">
        <div className="text-2xl font-bold">{t("landing.title")}</div>
        <nav className="flex items-center gap-4 sm:gap-6">
          <LanguageSelector />
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white hover:bg-white hover:text-green-700 bg-transparent"
            onClick={() => router.push("/auth")}
          >
            {t("landing.login")}
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-green-50">
          <div className="container space-y-10 xl:space-y-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm">{t("hero.badge")}</div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-green-800">
                  {t("hero.title")}
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("hero.subtitle")}
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-green-700 hover:bg-green-800" onClick={() => router.push("/get-started")}>
                    {t("common.getStarted")}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-700 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    {t("hero.watchDemo")}
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/smart-farmer-hero.png"
                  alt="Smart Farming Hero"
                  width={550}
                  height={550}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="grid gap-4 lg:gap-8 md:grid-cols-3">
              <div className="flex flex-col gap-1 items-center justify-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-gray-500">{t("stats.farmers")}</div>
              </div>
              <div className="flex flex-col gap-1 items-center justify-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold">4.8/5</div>
                <div className="text-gray-500">{t("stats.rating")}</div>
              </div>
              <div className="flex flex-col gap-1 items-center justify-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold">+35%</div>
                <div className="text-gray-500">{t("stats.revenue")}</div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-green-800">
                {t("features.title")}
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("features.subtitle")}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <svg className="h-8 w-8" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path
                      d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 12.7215 17.8726 13.4133 17.6392 14.054C17.5551 14.285 17.4075 14.4861 17.2264 14.6527L17.1558 14.727C16.9485 14.9417 16.8431 15.2194 16.8553 15.504C16.8716 15.8693 17.0164 16.2155 17.3219 16.4571C17.6317 16.7013 17.9884 16.8841 18.3309 16.9502C18.8654 17.0437 19.3077 16.715 19.8066 16.5099C19.9807 16.4395 20.1516 16.375 20.3151 16.3159C21.3764 15.93 22 14.9344 22 13.8236C22 12.7956 21.4864 11.8623 20.6038 11.3659C20.5095 11.3153 20.4101 11.2698 20.306 11.2298C19.9137 11.0877 19.5331 10.9083 19.1752 10.6943C18.4569 10.2447 17.9177 9.5011 17.695 8.63577C17.4534 7.67167 16.9075 6.80966 16.1355 6.15469C14.784 5 12.968 5 11.5 5C7.35786 5 4 8.35786 4 12.5C4 16.6421 7.35786 20 11.5 20H17.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t("features.smartFarming.title")}</h3>
                <p className="text-center text-gray-500">{t("features.smartFarming.description")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <svg className="h-8 w-8" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path
                      d="M3 9H21M3 15H21M9 9V21M9 9V3M9 9H15M15 9V21M15 9V3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t("features.marketAccess.title")}</h3>
                <p className="text-center text-gray-500">{t("features.marketAccess.description")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <svg className="h-8 w-8" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path
                      d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M21 7L15.5657 12.4343C15.3657 12.6343 15.2657 12.7343 15.1515 12.7657C15.0518 12.7935 14.9482 12.7935 14.8485 12.7657C14.7343 12.7343 14.6343 12.6343 14.4343 12.4343L12.5657 10.5657C12.3657 10.3657 12.2657 10.2657 12.1515 10.2343C12.0518 10.2065 11.9482 10.2065 11.8485 10.2343C11.7343 10.2657 11.6343 10.3657 11.4343 10.5657L7 15M21 7H17M21 7V11"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t("features.dataAnalytics.title")}</h3>
                <p className="text-center text-gray-500">{t("features.dataAnalytics.description")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <svg className="h-8 w-8" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path
                      d="M12 2L15.6 5.6C17.0333 4.93333 18.6667 4.6 20 6C21.3333 7.4 21 9.03333 20.3333 10.4667L22 12L12 22L3.85333 14.1467C2.6 12.9467 2 11.2667 2 9.53333C2 7.8 2.6 6.12 3.85333 4.92C6.4 2.4 10.0667 2.50667 12 4.44M17 9C17 8.44772 16.5523 8 16 8C15.4477 8 15 8.44772 15 9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t("features.community.title")}</h3>
                <p className="text-center text-gray-500">{t("features.community.description")}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center text-green-800">
                {t("benefits.title")}
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("benefits.increaseYield")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("benefits.reduceWaste")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("benefits.betterPrices")}</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("benefits.expertAdvice")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("benefits.weatherAlerts")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("benefits.communitySupport")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <svg className="h-8 w-8" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M2.5 9.5L12 4L21.5 9.5L12 15L2.5 9.5Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 14.5L12 20L21.5 14.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">40%</div>
                <p className="text-center text-gray-500">{t("benefits.yieldIncrease")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <svg className="h-8 w-8" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path
                      d="M3.03919 4.2939C3.01449 4.77065 3 5.25129 3 5.73684C3 9.64502 4.15875 13.3015 6.19537 16.2354C7.86043 18.6465 9.98396 20.6295 12.4557 22M12.4557 22H8M12.4557 22V17.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.9608 19.7061C20.9855 19.2293 21 18.7487 21 18.2632C21 14.355 19.8412 10.6985 17.8046 7.76458C16.1396 5.35346 14.016 3.37047 11.5443 2M11.5443 2H16M11.5443 2V6.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-3xl font-bold">30%</div>
                <p className="text-center text-gray-500">{t("benefits.wasteReduction")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <svg className="h-8 w-8" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path
                      d="M12 2v20M2 12h20M20 16H4M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-3xl font-bold">25%</div>
                <p className="text-center text-gray-500">{t("benefits.betterIncome")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <svg className="h-8 w-8" fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path
                      d="M22 16.5H2M20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM6 16V8M18 16V8M14 16V8M10 16V8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-3xl font-bold">24/7</div>
                <p className="text-center text-gray-500">{t("benefits.support")}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm">{t("cta.title")}</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">{t("cta.subtitle")}</h2>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-green-700 hover:bg-green-800" onClick={() => router.push("/get-started")}>
                  {t("common.getStarted")}
                </Button>
                <Button variant="outline" className="border-green-700 text-green-700 bg-transparent">
                  {t("cta.learnMore")}
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/smart-farmer-hero.png"
                alt="Smart Farming"
                width={550}
                height={310}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-start justify-between gap-4 md:h-24 md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">{t("footer.description")}</p>
            <p className="text-xs text-gray-500">© 2025 {t("footer.rights")}</p>
          </div>
          <nav className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link href="#" className="text-xs text-gray-500 hover:underline">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:underline">
              {t("footer.terms")}
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:underline">
              {t("footer.contact")}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
