"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Check, Trash2, User, Phone, Calendar } from "lucide-react"
import type { Order, OrderStatus } from "@/lib/types"

interface OrderCardProps {
  order: Order
  onViewDetails: (order: Order) => void
  onUpdateStatus: (orderId: string, status: OrderStatus) => void
  onDelete: (orderId: string) => void
}

export function OrderCard({ order, onViewDetails, onUpdateStatus, onDelete }: OrderCardProps) {
  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig = {
      pending: { label: "በመጠባበቅ ላይ", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      accepted: { label: "ተቀባይነት አግኝቷል", className: "bg-green-100 text-green-800 border-green-300" },
      completed: { label: "ተጠናቋል", className: "bg-blue-100 text-blue-800 border-blue-300" },
      cancelled: { label: "ተሰርዟል", className: "bg-red-100 text-red-800 border-red-300" },
    }

    const config = statusConfig[status] || statusConfig.pending
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
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg" style={{ color: "#3b2313" }}>
            {order.serviceLabel}
          </CardTitle>
          {getStatusBadge(order.status)}
        </div>
        <p className="text-sm text-gray-600">ማዘዣ #{order.id}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <strong>{order.customerName}</strong>
          </p>
          <p className="text-gray-600">{order.department}</p>
          <p className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            {order.phoneNumber}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            {formatDate(order.dueDate)}
          </p>
        </div>

        <div className="flex gap-2 pt-3 border-t">
          <Button
            onClick={() => onViewDetails(order)}
            size="sm"
            className="flex-1 text-white"
            style={{ backgroundColor: "#fcb040" }}
          >
            <Eye className="w-4 h-4 mr-1" />
            ዝርዝር
          </Button>

          {order.status === "pending" && (
            <Button
              onClick={() => onUpdateStatus(order.id, "accepted")}
              size="sm"
              className="text-white"
              style={{ backgroundColor: "#28a745" }}
            >
              <Check className="w-4 h-4" />
            </Button>
          )}

          <Button
            onClick={() => onDelete(order.id)}
            size="sm"
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
