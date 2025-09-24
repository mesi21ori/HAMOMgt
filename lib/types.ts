export type OrderStatus = "pending" | "accepted" | "completed" | "cancelled"

export interface OrderDetails {
  content?: string
  mainTitle?: string
  subTitle?: string
  size?: string
  description?: string
  purpose?: string
  title?: string
  recordingDate?: string
  time?: string
}

export interface Order {
  id: string
  customerName: string
  department: string
  phoneNumber: string
  serviceType: string
  serviceLabel: string
  status: OrderStatus
  submissionDate: string
  dueDate: string
  details: OrderDetails
}
