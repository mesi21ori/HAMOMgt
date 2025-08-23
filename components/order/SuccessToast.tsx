"use client"

import { Button } from "../ui/button"

interface SuccessToastProps {
  show: boolean
  onClose: () => void
}

export function SuccessToast({ show, onClose }: SuccessToastProps) {
  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-[#fcb040] border border-[#3b2313] rounded-lg shadow-2xl p-4 max-w-sm backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-[#3b2313]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[#3b2313] font-semibold text-sm">በተሳካ ሁኔታ ተልኳል!</p>
            <p className="text-[#382112] text-xs mt-1">ጥያቄዎ ሲቀበል እናሳውቅዎታለን</p>
          </div>
          <Button onClick={onClose} className="flex-shrink-0 text-[#3b2313] hover:text-[#382112] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
