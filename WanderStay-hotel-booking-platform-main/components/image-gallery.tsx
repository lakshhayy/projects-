"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import HotelImage from "./hotel-image"

interface ImageGalleryProps {
  images: string[]
  hotelName: string
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export default function ImageGallery({ images, hotelName, isOpen, onClose, initialIndex = 0 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-4xl max-h-4xl p-4">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Main image */}
        <div className="w-full h-full flex items-center justify-center">
          <HotelImage
            src={images[currentIndex]}
            alt={`${hotelName} - Image ${currentIndex + 1}`}
            className="max-w-full max-h-full"
            width={800}
            height={600}
          />
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 ${
                  index === currentIndex ? "border-amber-500" : "border-transparent"
                }`}
              >
                <HotelImage
                  src={image}
                  alt={`${hotelName} thumbnail ${index + 1}`}
                  className="w-full h-full"
                  width={64}
                  height={48}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
