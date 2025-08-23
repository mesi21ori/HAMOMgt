"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { saveOrder } from "@/lib/database"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SERVICE_TYPES = [
  { value: "banner", label: "ባነር" },
  { value: "flyer", label: "ፍላየር" },
  { value: "video", label: "ቪዲዮ" },
  { value: "magazine", label: "መጽሄት" },
  { value: "recording", label: "ቀረጻ" },
  { value: "message", label: "መልእክት ማስተላለፊያ" },
  { value: "additional", label: "ተጨማሪ" },
]

interface ServiceFormsProps {
  selectedService: string
  serviceData: any
  showCustomInput: { [key: string]: boolean }
  onServiceDataChange: (field: string, value: any) => void
  onBack: () => void
  onSubmit: () => void
}

export function ServiceForms({
  selectedService,
  serviceData,
  showCustomInput,
  onServiceDataChange,
  onBack,
  onSubmit,
}: ServiceFormsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const bannerSizes = [
    "A4 (21cm x 29.7cm)",
    "A3 (29.7cm x 42cm)",
    "A2 (42cm x 59.4cm)",
    "A1 (59.4cm x 84.1cm)",
    "A0 (84.1cm x 118.9cm)",
    "Banner 1m x 2m",
    "Banner 2m x 3m",
    "Banner 3m x 6m",
    "ሌላ",
  ]

  const updateServiceData = (field: string, value: any) => {
    onServiceDataChange(field, value)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const customerId = sessionStorage.getItem("customerId")
      if (!customerId) {
        alert("የደንበኛ መረጃ አልተገኘም። እባክዎን እንደገና ይሞክሩ።")
        return
      }

      const files: File[] = []
      const cleanServiceData = { ...serviceData }

      // Extract files from different service types
      if (serviceData.images && Array.isArray(serviceData.images)) {
        files.push(...serviceData.images.filter((item: any) => item instanceof File))
        delete cleanServiceData.images // Remove files from form data
      }

      if (serviceData.resources && Array.isArray(serviceData.resources)) {
        files.push(...serviceData.resources.filter((item: any) => item instanceof File))
        delete cleanServiceData.resources // Remove files from form data
      }

      console.log(" Extracted files for upload:", files.length)

      await saveOrder(customerId, {
        serviceType: selectedService,
        formData: cleanServiceData,
        files: files.length > 0 ? files : undefined, // Pass files separately
      })

      onSubmit()
      
      // Redirect to home page after successful submission
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Error saving order:", error)
      alert("የማዘዣ ማስቀመጥ ስህተት ተፈጥሯል። እባክዎን እንደገና ይሞክሩ።")
    } finally {
      setIsLoading(false)
    }
  }

  const renderBannerForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-white drop-shadow-md">ይዘት *</Label>
        <Select
          value={serviceData.content}
          onValueChange={(value) => updateServiceData("content", value)}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]">
            <SelectValue placeholder="ይዘት ይምረጡ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="journey">ጉዞ</SelectItem>
            <SelectItem value="advertisement">ማስታወቂያ</SelectItem>
            <SelectItem value="other">ሌላ</SelectItem>
          </SelectContent>
        </Select>
        {showCustomInput.content && (
          <Input
            value={serviceData.customContent}
            onChange={(e) => updateServiceData("customContent", e.target.value)}
            placeholder="የራስዎን ይዘት ይጻፉ"
            className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] mt-2"
            disabled={isLoading}
          />
        )}
      </div>
      <div>
        <Label className="text-white drop-shadow-md">መጠን *</Label>
        <Select
          value={serviceData.size}
          onValueChange={(value) => updateServiceData("size", value)}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]">
            <SelectValue placeholder="የባነር መጠን ይምረጡ" />
          </SelectTrigger>
          <SelectContent>
            {bannerSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showCustomInput.size && (
          <Input
            value={serviceData.customSize}
            onChange={(e) => updateServiceData("customSize", e.target.value)}
            placeholder="የራስዎን መጠን ይጻፉ"
            className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] mt-2"
            disabled={isLoading}
          />
        )}
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ዓብይ ርዕስ *</Label>
        <Input
          value={serviceData.mainTitle}
          onChange={(e) => updateServiceData("mainTitle", e.target.value)}
          placeholder="ዋና ርዕስ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ንዑስ ርዕስ</Label>
        <Input
          value={serviceData.subTitle}
          onChange={(e) => updateServiceData("subTitle", e.target.value)}
          placeholder="ንዑስ ርዕስ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">ተጨማሪ ትንተና</Label>
        <Textarea
          value={serviceData.description}
          onChange={(e) => updateServiceData("description", e.target.value)}
          placeholder="ተጨማሪ መግለጫ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
    
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">መስረከቢያ ቀን *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white/90 border-[#fcb040]/50 hover:border-[#fcb040] text-[#3b2313]"
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {serviceData.dueDate ? format(serviceData.dueDate, "PPP") : "ቀን ይምረጡ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={serviceData.dueDate}
              onSelect={(date) => updateServiceData("dueDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )

  const renderFlyerForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-white drop-shadow-md">ይዘት *</Label>
        <Select
          value={serviceData.content}
          onValueChange={(value) => updateServiceData("content", value)}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]">
            <SelectValue placeholder="ይዘት ይምረጡ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="program">መርሃ ግብር</SelectItem>
            <SelectItem value="advertisement">ማስታወቂያ</SelectItem>
            <SelectItem value="other">ሌላ</SelectItem>
          </SelectContent>
        </Select>
        {showCustomInput.content && (
          <Input
            value={serviceData.customContent}
            onChange={(e) => updateServiceData("customContent", e.target.value)}
            placeholder="የራስዎን ይዘት ይጻፉ"
            className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] mt-2"
            disabled={isLoading}
          />
        )}
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ዓብይ ርዕስ *</Label>
        <Input
          value={serviceData.mainTitle}
          onChange={(e) => updateServiceData("mainTitle", e.target.value)}
          placeholder="ዋና ርዕስ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ንዑስ ርዕስ</Label>
        <Input
          value={serviceData.subTitle}
          onChange={(e) => updateServiceData("subTitle", e.target.value)}
          placeholder="ንዑስ ርዕስ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">ተጨማሪ ትንተና</Label>
        <Textarea
          value={serviceData.description}
          onChange={(e) => updateServiceData("description", e.target.value)}
          placeholder="ተጨማሪ መግለጫ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
     
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">መስረከቢያ ቀን *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white/90 border-[#fcb040]/50 hover:border-[#fcb040] text-[#3b2313]"
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {serviceData.dueDate ? format(serviceData.dueDate, "PPP") : "ቀን ይምረጡ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={serviceData.dueDate}
              onSelect={(date) => updateServiceData("dueDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )

  const renderVideoForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-white drop-shadow-md">ይዘት *</Label>
        <Select
          value={serviceData.content}
          onValueChange={(value) => updateServiceData("content", value)}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]">
            <SelectValue placeholder="ይዘት ይምረጡ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hymn">መዝሙር</SelectItem>
            <SelectItem value="teaching">ትምህርት</SelectItem>
            <SelectItem value="advertisement">ማስታወቂያ</SelectItem>
            <SelectItem value="other">ሌላ</SelectItem>
          </SelectContent>
        </Select>
        {showCustomInput.content && (
          <Input
            value={serviceData.customContent}
            onChange={(e) => updateServiceData("customContent", e.target.value)}
            placeholder="የራስዎን ይዘት ይጻፉ"
            className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] mt-2"
            disabled={isLoading}
          />
        )}
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ዓብይ ርዕስ *</Label>
        <Input
          value={serviceData.mainTitle}
          onChange={(e) => updateServiceData("mainTitle", e.target.value)}
          placeholder="ዋና ርዕስ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">አላማ</Label>
        <Input
          value={serviceData.purpose}
          onChange={(e) => updateServiceData("purpose", e.target.value)}
          placeholder="የቪዲዮው አላማ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">ተጨማሪ ትንተና</Label>
        <Textarea
          value={serviceData.description}
          onChange={(e) => updateServiceData("description", e.target.value)}
          placeholder="ተጨማሪ መግለጫ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
   
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">መስረከቢያ ቀን *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white/90 border-[#fcb040]/50 hover:border-[#fcb040] text-[#3b2313]"
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {serviceData.dueDate ? format(serviceData.dueDate, "PPP") : "ቀን ይምረጡ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={serviceData.dueDate}
              onSelect={(date) => updateServiceData("dueDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )

  const renderMagazineForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-white drop-shadow-md">ይዘት *</Label>
        <Select
          value={serviceData.content}
          onValueChange={(value) => updateServiceData("content", value)}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]">
            <SelectValue placeholder="ይዘት ይምረጡ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="holiday">የበአላት</SelectItem>
            <SelectItem value="baptism">የምርቃት</SelectItem>
            <SelectItem value="other">ሌላ</SelectItem>
          </SelectContent>
        </Select>
        {showCustomInput.content && (
          <Input
            value={serviceData.customContent}
            onChange={(e) => updateServiceData("customContent", e.target.value)}
            placeholder="የራስዎን ይዘት ይጻፉ"
            className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313] mt-2"
            disabled={isLoading}
          />
        )}
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ዓብይ ርዕስ *</Label>
        <Input
          value={serviceData.mainTitle}
          onChange={(e) => updateServiceData("mainTitle", e.target.value)}
          placeholder="ዋና ርዕስ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ንዑስ ርዕስ</Label>
        <Input
          value={serviceData.subTitle}
          onChange={(e) => updateServiceData("subTitle", e.target.value)}
          placeholder="ንዑስ ርዕስ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">አላማ</Label>
        <Input
          value={serviceData.purpose}
          onChange={(e) => updateServiceData("purpose", e.target.value)}
          placeholder="የመጽሔቱ አላማ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">ተጨማሪ ትንተና</Label>
        <Textarea
          value={serviceData.description}
          onChange={(e) => updateServiceData("description", e.target.value)}
          placeholder="ተጨማሪ መግለጫ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">መስረከቢያ ቀን *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white/90 border-[#fcb040]/50 hover:border-[#fcb040] text-[#3b2313]"
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {serviceData.dueDate ? format(serviceData.dueDate, "PPP") : "ቀን ይምረጡ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={serviceData.dueDate}
              onSelect={(date) => updateServiceData("dueDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )

  const renderRecordingForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-white drop-shadow-md">አላማ *</Label>
        <Input
          value={serviceData.purpose}
          onChange={(e) => updateServiceData("purpose", e.target.value)}
          placeholder="የቀረጻው አላማ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ርዕስ *</Label>
        <Input
          value={serviceData.title}
          onChange={(e) => updateServiceData("title", e.target.value)}
          placeholder="የቀረጻው ርዕስ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">የቀረጻ ቀን *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white/90 border-[#fcb040]/50 hover:border-[#fcb040] text-[#3b2313]"
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {serviceData.recordingDate ? format(serviceData.recordingDate, "PPP") : "የቀረጻ ቀን ይምረጡ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={serviceData.recordingDate}
              onSelect={(date) => updateServiceData("recordingDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ሰዓት *</Label>
        <Input
          value={serviceData.time}
          onChange={(e) => updateServiceData("time", e.target.value)}
          placeholder="የቀረጻ �ሰዓት"
          type="time"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">ተጨማሪ ትንተና</Label>
        <Textarea
          value={serviceData.description}
          onChange={(e) => updateServiceData("description", e.target.value)}
          placeholder="ተጨማሪ መግለጫ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          rows={4}
          disabled={isLoading}
        />
      </div>
    </div>
  )

  const renderMessageForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-white drop-shadow-md">አላማ *</Label>
        <Input
          value={serviceData.purpose}
          onChange={(e) => updateServiceData("purpose", e.target.value)}
          placeholder="የመልዕክቱ አላማ"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">የሚተላለፍለት አካል *</Label>
        <Input
          value={serviceData.recipient}
          onChange={(e) => updateServiceData("recipient", e.target.value)}
          placeholder="ለማን �ይተላለፋል"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ቀን *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white/90 border-[#fcb040]/50 hover:border-[#fcb040] text-[#3b2313]"
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {serviceData.date ? format(serviceData.date, "PPP") : "ቀን ይምረጡ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={serviceData.date}
              onSelect={(date) => updateServiceData("date", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label className="text-white drop-shadow-md">ሰዓት *</Label>
        <Input
          value={serviceData.time}
          onChange={(e) => updateServiceData("time", e.target.value)}
          placeholder="ሰዓት"
          type="time"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          disabled={isLoading}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-white drop-shadow-md">መልዕክት *</Label>
        <Textarea
          value={serviceData.message}
          onChange={(e) => updateServiceData("message", e.target.value)}
          placeholder="የሚተላለፈው መልዕክት"
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          rows={4}
          disabled={isLoading}
        />
      </div>
    </div>
  )

  const renderAdditionalForm = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-white drop-shadow-md">ተጨማሪ ጥያቄ *</Label>
        <Textarea
          value={serviceData.additionalRequest}
          onChange={(e) => updateServiceData("additionalRequest", e.target.value)}
          placeholder="እባክዎን የሚፈልጉትን በዝርዝር ይግለጹ..."
          className="bg-white/90 border-[#fcb040]/50 focus:border-[#fcb040] text-[#3b2313]"
          rows={6}
          disabled={isLoading}
        />
      </div>
    </div>
  )

  return (
    <Card className="bg-[#fcb040]/20 backdrop-blur-md border-[#fcb040]/50 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white drop-shadow-lg">
          {SERVICE_TYPES.find((s) => s.value === selectedService)?.label} ዝርዝሮች
        </CardTitle>
        <CardDescription className="text-white/90 drop-shadow-md">እባክዎን የሚፈልጉትን ዝርዝሮች ያስገቡ</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedService === "banner" && renderBannerForm()}
        {selectedService === "flyer" && renderFlyerForm()}
        {selectedService === "video" && renderVideoForm()}
        {selectedService === "magazine" && renderMagazineForm()}
        {selectedService === "recording" && renderRecordingForm()}
        {selectedService === "message" && renderMessageForm()}
        {selectedService === "additional" && renderAdditionalForm()}

        <div className="flex gap-4 justify-center pt-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="bg-white/20 border-[#fcb040] text-white hover:bg-[#fcb040]/20 rounded-full backdrop-blur-sm px-6"
            disabled={isLoading}
          >
            ወደ ኋላ
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#3b2313] hover:bg-[#382112] text-white rounded-full transition-all duration-300 hover:scale-105 px-8"
            disabled={isLoading}
          >
            {isLoading ? "እየተላከ..." : "ማዘዣ ይላኩ"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}