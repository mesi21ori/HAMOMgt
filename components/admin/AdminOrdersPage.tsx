"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { OrderFilters } from "@/components/admin/OrderFilters"
import { OrdersList } from "@/components/admin/OrdersList"
import { OrderDetails } from "@/components/admin/OrderDetails"
import type { Order, OrderStatus } from "@/lib/types"
import {
  getOrders,
  updateOrderStatus as updateFirebaseOrderStatus,
  deleteOrder as deleteFirebaseOrder,
} from "@/lib/database"
import { firestoreDb } from "@/lib/database"
import { doc, getDoc } from "firebase/firestore"
import type { CustomerInfo } from "@/lib/database"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        setError(null)
        const firebaseOrders = await getOrders()

        const transformedOrders: Order[] = await Promise.all(
          firebaseOrders.map(async (order) => {
            let customerName = "Unknown Customer"
            let phoneNumber = "N/A"
            let department = order.formData?.department || "Unknown Department"

            if (order.customerId) {
              try {
                const customerDoc = await getDoc(doc(firestoreDb, "customers", order.customerId))
                if (customerDoc.exists()) {
                  const customerData = customerDoc.data() as CustomerInfo
                  customerName = customerData.fullName || customerName
                  phoneNumber = customerData.phoneNumber || phoneNumber
                  department = customerData.department || department
                }
              } catch (err) {
                console.error("Error fetching customer data:", err)
              }
            }

            return {
              id: order.id,
              customerName,
              department,
              phoneNumber,
              serviceType: order.serviceType,
              serviceLabel: getServiceLabel(order.serviceType),
              status: order.status as OrderStatus,
              submissionDate:
                order.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
              dueDate:
                order.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              details: order.formData || {},
            }
          })
        )

        setOrders(transformedOrders)
      } catch (err) {
        console.error("Error fetching orders:", err)
        setError(
          "የማዘዣዎች መጫን አልተሳካም። እባክዎ ድጋሚ ይሞክሩ።"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getServiceLabel = (serviceType: string): string => {
    const labels: Record<string, string> = {
      banner: "ባነር",
      video: "ቪዲዮ",
      recording: "ቀረጻ",
      flyer: "ፍላየር",
      poster: "ፖስተር",
      brochure: "ብሮሹር",
    }
    return labels[serviceType] || serviceType
  }

  const allowedStatuses = ["accepted", "rejected", "pending"] as const
  type AllowedStatus = typeof allowedStatuses[number]

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    if (!allowedStatuses.includes(newStatus as AllowedStatus)) {
      setError("የተሳካ ሁኔታ አልተመረጠም።")
      return
    }
    try {
      await updateFirebaseOrderStatus(orderId, newStatus as AllowedStatus)
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus })
      }
    } catch (err) {
      console.error("Error updating order status:", err)
      setError("የማዘዣ ሁኔታ መቀየር አልተሳካም። እባክዎ ድጋሚ ይሞክሩ።")
    }
  }

  const deleteOrder = async (orderId: string) => {
    try {
      await deleteFirebaseOrder(orderId)
      setOrders(orders.filter((order) => order.id !== orderId))
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null)
      }
    } catch (err) {
      console.error("Error deleting order:", err)
      setError("የማዘዣ መሰረዝ አልተሳካም። እባክዎ ድጋሚ ይሞክሩ።")
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.department.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">የማዘዣዎች እየተጫኑ ነው...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-800 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              ድጋሚ ሞክር
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader
          title="የማዘዣ ዝርዝር"
          subtitle="ሐይመተ አብርሃም ሚድያ - አስተዳደሪ ፓነል"
          showBackButton
          onBackClick={() => setSelectedOrder(null)}
        />
        <OrderDetails order={selectedOrder} onUpdateStatus={updateOrderStatus} onDelete={deleteOrder} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="የማዘዣ አስተዳደር" subtitle="ሐይመተ አብርሃም ሚድያ - አስተዳደሪ ፓነል" />

      <div className="container mx-auto px-4 sm:px-6 py-6">
        <OrderFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <OrdersList
          orders={filteredOrders}
          onViewDetails={setSelectedOrder}
          onUpdateStatus={updateOrderStatus}
          onDelete={deleteOrder}
        />
      </div>
    </div>
  )
}
