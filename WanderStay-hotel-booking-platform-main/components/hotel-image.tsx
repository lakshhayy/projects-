"use client"

import { useState } from "react"
import Image from "next/image"

interface HotelImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function HotelImage({
  src,
  alt,
  className = "",
  width = 400,
  height = 300,
  priority = false,
}: HotelImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fallback image if the API image fails to load
  const fallbackImage = `/placeholder.svg?height=${height}&width=${width}`

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <Image
        src={imageError ? fallbackImage : src}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
