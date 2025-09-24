"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface AdminHeaderProps {
  title: string
  subtitle: string
  showBackButton?: boolean
  onBackClick?: () => void
}

export function AdminHeader({ title, subtitle, showBackButton, onBackClick }: AdminHeaderProps) {
  return (
    <div className="py-6 px-4 sm:px-6" style={{ backgroundColor: "#3b2313" }}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/church-logo.png"
            alt="ሐይመተ አብርሃም ሰንበት ት/ቤት"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-sm" style={{ color: "#fcb040" }}>
              {subtitle}
            </p>
          </div>
        </div>

        {showBackButton ? (
          <Button
            onClick={onBackClick}
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ወደ ዝርዝር ተመለስ
          </Button>
        ) : (
          <Link href="/">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black bg-transparent"
            >
              ወደ ዋና ገጽ
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
