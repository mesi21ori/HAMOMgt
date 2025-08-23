"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OrderHeader } from "@/components/order/OrderHeader"
import { ProgressIndicator } from "@/components/order/ProgressIndicator"
import { CustomerInfoForm } from "@/components/order/CustomerInfoForm"
import { ServiceTypeCards } from "@/components/order/ServiceTypeCards"
import { ServiceForms } from "@/components/order/ServiceForms"
import { SuccessToast } from "@/components/order/SuccessToast"

export default function OrderPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    department: "",
    responsibility: "",
    phone: "",
  })
  const [serviceData, setServiceData] = useState<any>({})
  const [showCustomInput, setShowCustomInput] = useState<{ [key: string]: boolean }>({})
  const [showToast, setShowToast] = useState(false)
  const router = useRouter()

  const handleNextStep = () => {
    if (step === 1 && customerInfo.name && customerInfo.phone && customerInfo.department) {
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleServiceSelect = (serviceType: string) => {
    setSelectedService(serviceType)
    setServiceData({})
    setShowCustomInput({})
  }

  const updateServiceData = (field: string, value: any) => {
    setServiceData({ ...serviceData, [field]: value })
    if (value === "other") {
      setShowCustomInput({ ...showCustomInput, [field]: true })
    } else {
      setShowCustomInput({ ...showCustomInput, [field]: false })
    }
  }

  const handleSubmitOrder = () => {
    console.log("Customer Info:", customerInfo)
    console.log("Service Data:", serviceData)
    console.log("Selected Service:", selectedService)

    setShowToast(true)
    
    // Redirect to home page after 3 seconds
    setTimeout(() => {
      setShowToast(false)
      router.push("/")
    }, 3000)
  }

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/church-logo.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <SuccessToast show={showToast} onClose={() => setShowToast(false)} />

      <div className="relative z-10">
        <OrderHeader />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
            <ProgressIndicator currentStep={step} />

            {step === 1 && (
              <CustomerInfoForm
                customerInfo={customerInfo}
                onCustomerInfoChange={setCustomerInfo}
                onNext={handleNextStep}
              />
            )}

            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                {!selectedService && <ServiceTypeCards onServiceSelect={handleServiceSelect} onBack={handlePrevStep} />}

                {selectedService && (
                  <ServiceForms
                    selectedService={selectedService}
                    serviceData={serviceData}
                    showCustomInput={showCustomInput}
                    onServiceDataChange={updateServiceData}
                    onBack={() => setSelectedService("")}
                    onSubmit={handleSubmitOrder}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}