"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Music, Instagram, Youtube, Facebook } from "lucide-react"
import Link from "next/link"
import { OrderHeader } from "@/components/order/OrderHeader"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/church-logo.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <OrderHeader />

        {/* Hero Section */}
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-140px)] -mt-8 sm:-mt-6">
          <div className="text-center text-white max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
            {/* Main Header */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 drop-shadow-lg animate-slide-up-1 hover:scale-105 transition-transform duration-500 header-stroke-responsive leading-tight">
              ሐይመተ አብርሃም ሚድያ
            </h1>

            {/* Address */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed drop-shadow-md animate-slide-up-2 hover:opacity-100 transition-opacity duration-300 px-2 sm:px-4">
              ጀሞ ቁ.3 ደብረ ኃይል ቅዱስ ገብርኤል ቤተ ክርስቲያን ሐይመተ አብርሃም ሰንበት ት/ቤት
            </p>

            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold drop-shadow-lg animate-slide-up-3 hover:scale-105 transition-transform duration-500 wave-text inline-block">
                ሚድያ ክፍል
              </h2>
            </div>

            {/* Order Button */}
            <Link href="/order">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 border-[#fcb040] text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 mb-6 sm:mb-8 lg:mb-12 text-white hover:opacity-50 hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-slide-up-5 animate-pulse-slow rounded-full w-auto"
              >
                ለማዘዝ
              </Button>
            </Link>

            {/* Social Media Links */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 animate-slide-up-6">
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start gap-2 hover:opacity-80 hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md group text-sm sm:text-base"
                style={{ color: "#fcb040" }}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="sm:inline">Telegram</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start gap-2 hover:opacity-80 hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md group text-sm sm:text-base"
                style={{ color: "#fcb040" }}
              >
                <Music className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="sm:inline">TikTok</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start gap-2 hover:opacity-80 hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md group text-sm sm:text-base"
                style={{ color: "#fcb040" }}
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="sm:inline">Instagram</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start gap-2 hover:opacity-80 hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md group text-sm sm:text-base"
                style={{ color: "#fcb040" }}
              >
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="sm:inline">YouTube</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start gap-2 hover:opacity-80 hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-md group text-sm sm:text-base col-span-2 sm:col-span-1"
                style={{ color: "#fcb040" }}
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="sm:inline">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* replaced header-stroke with responsive version */
        .header-stroke-responsive {
          -webkit-text-stroke: 1px #fcb040;
          text-stroke: 1px #fcb040;
        }
        
        @media (min-width: 640px) {
          .header-stroke-responsive {
            -webkit-text-stroke: 1.5px #fcb040;
            text-stroke: 1.5px #fcb040;
          }
        }
        
        @media (min-width: 768px) {
          .header-stroke-responsive {
            -webkit-text-stroke: 2px #fcb040;
            text-stroke: 2px #fcb040;
          }
        }
        
        .wave-text {
          position: relative;
          color: #fcb040;
          display: inline-block;
        }
        
        .wave-text::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #fcb040, transparent);
          animation: wave 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slide-up-1 {
          animation: slideUp 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up-2 {
          animation: slideUp 0.8s ease-out 0.4s both;
        }
        
        .animate-slide-up-3 {
          animation: slideUp 0.8s ease-out 0.6s both;
        }
        
        .animate-slide-up-5 {
          animation: slideUp 0.8s ease-out 1s both;
        }
        
        .animate-slide-up-6 {
          animation: slideUp 0.8s ease-out 1.2s both;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
