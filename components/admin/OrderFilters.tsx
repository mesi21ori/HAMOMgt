"use client"

import { Search, Filter } from "lucide-react"

type OrderStatus = "pending" | "accepted" | "completed" | "cancelled"

interface OrderFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: OrderStatus | "all"
  onStatusFilterChange: (status: OrderStatus | "all") => void
}

export function OrderFilters({ searchTerm, onSearchChange, statusFilter, onStatusFilterChange }: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="ደንበኛ ስም፣ አገልግሎት ወይም ክፍል ፈልግ..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:ring-opacity-50"
          aria-label="ደንበኛ ስም፣ አገልግሎት ወይም ክፍል ፈልግ"
        />
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as OrderStatus | "all")}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:ring-opacity-50"
          aria-label="ሁኔታ ማጣሪያ"
          title="ሁኔታ ማጣሪያ"
        >
          <option value="all">ሁሉም ሁኔታዎች</option>
          <option value="pending">በመጠባበቅ ላይ</option>
          <option value="accepted">ተቀባይነት አግኝቷል</option>
          <option value="completed">ተጠናቋል</option>
          <option value="cancelled">ተሰርዟል</option>
        </select>
      </div>
    </div>
  )
}
