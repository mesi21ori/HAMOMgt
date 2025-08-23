"use client"

import Image from "next/image"

export function OrderHeader() {
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo on left */}
          <div className="flex items-center">
            <Image
              src="/images/church-logo.png"
              alt="Church Logo"
              width={48}
              height={48}
              className="object-contain animate-float"
            />
          </div>

          {/* Bible verse in center - non-clickable */}
          <div className="flex-1 flex justify-center">
            <div className="text-white text-sm md:text-base font-medium text-center drop-shadow-lg">
              "ቀኖቹ ክፉዎች ናቸውና ዘመኑን ዋጁ" ኤፌ 5፥16
            </div>
          </div>

          {/* Logo on right */}
          <div className="flex items-center">
            <Image
              src="/images/church-logo.png"
              alt="Church Logo"
              width={48}
              height={48}
              className="object-contain animate-float"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
