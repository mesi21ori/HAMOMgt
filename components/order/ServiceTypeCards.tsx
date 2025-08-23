"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, BookOpen, Mic, MessageSquare, Plus, ImageIcon } from "lucide-react"

const SERVICE_TYPES = [
  { value: "banner", label: "ባነር", icon: ImageIcon },
  { value: "flyer", label: "ፍላየር", icon: FileText },
  { value: "video", label: "ቪዲዮ", icon: Video },
  { value: "magazine", label: "መጽሄት", icon: BookOpen },
  { value: "recording", label: "ቀረጻ", icon: Mic },
  { value: "message", label: "መልእክት ማስተላለፊያ", icon: MessageSquare },
  { value: "additional", label: "ተጨማሪ", icon: Plus },
]

interface ServiceTypeCardsProps {
  onServiceSelect: (serviceType: string) => void
  onBack: () => void
}

export function ServiceTypeCards({ onServiceSelect, onBack }: ServiceTypeCardsProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-[#fcb040]/20 backdrop-blur-md border-[#fcb040]/50 shadow-2xl mx-2 sm:mx-0">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-white drop-shadow-lg text-center text-lg sm:text-xl md:text-2xl">
            የሚፈልጉትን አገልግሎት ይምረጡ
          </CardTitle>
          <CardDescription className="text-white/90 drop-shadow-md text-center text-sm sm:text-base">
            ከታች ካሉት አማራጮች ውስጥ የሚፈልጉትን ይምረጡ
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {SERVICE_TYPES.map((service) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.value}
                  className="bg-white/10 hover:bg-[#fcb040]/30 border-[#fcb040]/30 hover:border-[#fcb040] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={() => onServiceSelect(service.value)}
                >
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#fcb040] mx-auto mb-2" />
                    <p className="text-white text-xs sm:text-sm font-medium drop-shadow-md leading-tight">
                      {service.label}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center px-4 sm:px-0">
        <Button
          variant="outline"
          onClick={onBack}
          className="bg-white/20 border-[#fcb040] text-white hover:bg-[#fcb040]/20 rounded-full backdrop-blur-sm px-4 sm:px-6 py-2 text-sm sm:text-base w-auto"
        >
          ወደ ኋላ
        </Button>
      </div>
    </div>
  )
}
