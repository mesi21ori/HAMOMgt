"use client"

import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  currentStep: number
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            currentStep >= 1 ? "bg-[#fcb040] text-white" : "bg-white/20 text-white",
          )}
        >
          1
        </div>
        <div className={cn("w-16 h-1", currentStep >= 2 ? "bg-[#fcb040]" : "bg-white/20")} />
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            currentStep >= 2 ? "bg-[#fcb040] text-white" : "bg-white/20 text-white",
          )}
        >
          2
        </div>
      </div>
    </div>
  )
}
