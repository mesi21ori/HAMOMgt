import type { Order, OrderStatus } from "@/lib/types"
import { OrderCard } from "./OrderCard"

interface OrdersListProps {
  orders: Order[]
  onViewDetails: (order: Order) => void
  onUpdateStatus: (orderId: string, status: OrderStatus) => void
  onDelete: (orderId: string) => void
}

export function OrdersList({ orders, onViewDetails, onUpdateStatus, onDelete }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">ምንም ማዘዣ አልተገኘም</p>
        <p className="text-gray-400 text-sm mt-2">የፍለጋ ቃሉን ይቀይሩ ወይም ማጣሪያውን ያስተካክሉ</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onViewDetails={onViewDetails}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
