"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { saveCustomerInfo } from "@/lib/database"
import { useState } from "react"

interface CustomerInfo {
  name: string
  department: string
  responsibility: string
  phone: string
}

interface CustomerInfoFormProps {
  customerInfo: CustomerInfo
  onCustomerInfoChange: (info: CustomerInfo) => void
  onNext: () => void
}

export function CustomerInfoForm({ customerInfo, onCustomerInfoChange, onNext }: CustomerInfoFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    onCustomerInfoChange({ ...customerInfo, [field]: value })
  }

  const handleNext = async () => {
    if (!isValid) return

    setIsLoading(true)
    try {
      // Trim values before sending to Firestore
      const customerId = await saveCustomerInfo({
        fullName: customerInfo.name.trim(),
        department: customerInfo.department.trim(),
        responsibility: customerInfo.responsibility?.trim() || "",
        phoneNumber: customerInfo.phone.trim(),
      })

      // Store customer ID for later use in order submission
      sessionStorage.setItem("customerId", customerId)
      onNext()
    } catch (error) {
      console.error("Error saving customer info:", error)
      alert(
        "የመረጃ ማስቀመጥ ስህተት ተፈጥሯል። እባክዎን እንደገና ይሞክሩ።"
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Form is valid if required fields are not empty after trimming
  const isValid =
    customerInfo.name.trim() !== "" &&
    customerInfo.department.trim() !== "" &&
    customerInfo.phone.trim() !== ""

  return (
    <Card className="bg-[#fcb040]/20 backdrop-blur-md border-[#fcb040]/50 shadow-2xl mx-2 sm:mx-0">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <CardTitle className="text-white drop-shadow-lg text-lg sm:text-xl md:text-2xl text-center">
          የእርስዎ መረጃ
        </CardTitle>
        <CardDescription className="text-white/90 drop-shadow-md text-sm sm:text-base text-center">
          እባክዎን የግል መረጃዎን ያስገቡ
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white drop-shadow-md text-sm sm:text-base">
              ሙሉ ስም *
            </Label>
            <Input
              id="name"
              value={customerInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="ሙሉ ስምዎን ያስገቡ"
              className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] h-10 sm:h-12 text-sm sm:text-base"
              disabled={isLoading}
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department" className="text-white drop-shadow-md text-sm sm:text-base">
              ክፍል *
            </Label>
            <Select
              value={customerInfo.department}
              onValueChange={(value) => handleInputChange("department", value)}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] h-10 sm:h-12 text-sm sm:text-base">
                <SelectValue placeholder="ክፍል ይምረጡ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teaching">ት/ት ክፍል</SelectItem>
                <SelectItem value="music">መዝሙር ክፍል</SelectItem>
                <SelectItem value="members">አባላት ጉዳይ</SelectItem>
                <SelectItem value="youth"> ጽ/ቤት</SelectItem>
                <SelectItem value="women">ህጻናት እና አዳጊ</SelectItem>
                <SelectItem value="media">ልማት ክፍል</SelectItem>
                <SelectItem value="admin">የበገና</SelectItem>
                 <SelectItem value="admin">ንብረት ክፍል</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Responsibility */}
          <div className="space-y-2">
            <Label htmlFor="responsibility" className="text-white drop-shadow-md text-sm sm:text-base">
              ሃላፊነት
            </Label>
            <Input
              id="responsibility"
              value={customerInfo.responsibility}
              onChange={(e) => handleInputChange("responsibility", e.target.value)}
              placeholder="የሃላፊነት ቦታዎ"
              className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] h-10 sm:h-12 text-sm sm:text-base"
              disabled={isLoading}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white drop-shadow-md text-sm sm:text-base">
              ስልክ ቁጥር *
            </Label>
            <Input
              id="phone"
              value={customerInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="የስልክ ቁጥርዎ"
              className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] h-10 sm:h-12 text-sm sm:text-base"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/">
            <Button
            variant="outline"
          className="bg-white/20 border-[#fcb040] text-white hover:bg-[#fcb040]/20 rounded-full backdrop-blur-sm px-6"
           disabled={isLoading}
            >
              ወደ ሃላ
            </Button>
          </Link>

          <Button
            onClick={handleNext}
            className="bg-[#3b2313] hover:bg-[#382112] text-white rounded-full px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg w-auto"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "እየተቀመጠ..." : "ቀጣይ"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
