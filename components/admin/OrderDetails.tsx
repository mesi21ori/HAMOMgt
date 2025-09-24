"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Trash2, User, Phone, FileText, Calendar } from "lucide-react"

type OrderStatus = "pending" | "accepted" | "completed" | "cancelled"

interface Order {
  id: string
  customerName: string
  department: string
  phoneNumber: string
  serviceType: string
  serviceLabel: string
  status: string
  submissionDate: string
  dueDate: string
  details: Record<string, any>
}

interface OrderDetailsProps {
  order: Order
  onUpdateStatus: (orderId: string, status: OrderStatus) => void
  onDelete: (orderId: string) => void
}

export function OrderDetails({ order, onUpdateStatus, onDelete }: OrderDetailsProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "በመጠባበቅ ላይ", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      accepted: { label: "ተቀባይነት አግኝቷል", className: "bg-green-100 text-green-800 border-green-300" },
      completed: { label: "ተጠናቋል", className: "bg-blue-100 text-blue-800 border-blue-300" },
      cancelled: { label: "ተሰርዟል", className: "bg-red-100 text-red-800 border-red-300" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("am-ET", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="pb-6" style={{ backgroundColor: "#fcb040" }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl" style={{ color: "#3b2313" }}>
                ማዘዣ #{order.id}
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: "#3b2313" }}>
                {formatDate(order.submissionDate)} ላይ ቀርቧል
              </p>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "#3b2313" }}>
                <User className="w-5 h-5" />
                የደንበኛ መረጃ
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>ስም:</strong> {order.customerName}
                </p>
                <p>
                  <strong>ክፍል:</strong> {order.department}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {order.phoneNumber}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "#3b2313" }}>
                <FileText className="w-5 h-5" />
                የአገልግሎት መረጃ
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>አገልግሎት ዓይነት:</strong> {order.serviceLabel}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <strong>መስረከቢያ ቀን:</strong> {formatDate(order.dueDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: "#3b2313" }}>
              የአገልግሎት ዝርዝር
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
              {Object.entries(order.details).map(([key, value]) => {
                const labels: { [key: string]: string } = {
                  content: "ይዘት",
                  mainTitle: "ዋና ርዕስ",
                  subTitle: "ንዑስ ርዕስ",
                  size: "መጠን",
                  purpose: "አላማ",
                  title: "ርዕስ",
                  recordingDate: "የቀረጻ ቀን",
                  time: "ሰዓት",
                  description: "ተጨማሪ ትንተና",
                }

                let displayValue = value
                if (key === "recordingDate" && value) {
                  displayValue = formatDate(value as string)
                }

                return (
                  <p key={key}>
                    <strong>{labels[key] || key}:</strong> {displayValue}
                  </p>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t">
            {order.status === "pending" && (
              <Button
                onClick={() => onUpdateStatus(order.id, "accepted")}
                className="text-white"
                style={{ backgroundColor: "#28a745" }}
              >
                <Check className="w-4 h-4 mr-2" />
                ተቀበል
              </Button>
            )}

            {order.status === "accepted" && (
              <Button
                onClick={() => onUpdateStatus(order.id, "completed")}
                className="text-white"
                style={{ backgroundColor: "#007bff" }}
              >
                <Check className="w-4 h-4 mr-2" />
                ተጠናቋል ምልክት አድርግ
              </Button>
            )}

            <Button
              onClick={() => onUpdateStatus(order.id, "pending")}
              variant="outline"
              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
            >
              <Clock className="w-4 h-4 mr-2" />
              በመጠባበቅ ላይ
            </Button>

            <Button
              onClick={() => onDelete(order.id)}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              ሰርዝ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
