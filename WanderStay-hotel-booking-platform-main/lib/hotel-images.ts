// Hotel image API utilities
export const UNSPLASH_BASE_URL = "https://images.unsplash.com"

// Curated hotel image IDs from Unsplash for consistent quality
export const HOTEL_IMAGE_IDS = {
  luxury: [
    "photo-1551882547-ff40c63fe5fa", // Luxury hotel lobby
    "photo-1564501049412-61c2a3083791", // Modern hotel room
    "photo-1582719478250-c89cae4dc85b", // Desert resort
    "photo-1571896349842-33c89424de2d", // Mountain lodge
    "photo-1520250497591-112f2f40a3f4", // Beach resort
    "photo-1613490493576-7fde63acd811", // Santorini hotel
    "photo-1566073771259-6a8506099945", // Hotel exterior
    "photo-1542314831-068cd1dbfeeb", // Hotel pool
    "photo-1445019980597-93fa8acb246c", // Boutique hotel
    "photo-1578662996442-48f60103fc96", // City hotel
  ],
  rooms: [
    "photo-1631049307264-da0ec9d70304", // Luxury bedroom
    "photo-1586023492125-27b2c045efd7", // Modern hotel room
    "photo-1560472354-b33ff0c44a43", // Suite
    "photo-1522771739844-6a9f6d5f14af", // Hotel bathroom
    "photo-1595576508898-0ad5c879a061", // Penthouse
  ],
  amenities: [
    "photo-1571019613454-1cb2f99b2d8b", // Hotel spa
    "photo-1544966503-7cc5ac882d5f", // Hotel restaurant
    "photo-1571019613454-1cb2f99b2d8b", // Fitness center
    "photo-1582719478250-c89cae4dc85b", // Pool area
  ],
}

export function getHotelImageUrl(imageId: string, width = 400, height = 300, quality = 80): string {
  return `${UNSPLASH_BASE_URL}/${imageId}?w=${width}&h=${height}&fit=crop&auto=format&q=${quality}`
}

export function getRandomHotelImage(
  category: keyof typeof HOTEL_IMAGE_IDS = "luxury",
  width = 400,
  height = 300,
): string {
  const images = HOTEL_IMAGE_IDS[category]
  const randomImage = images[Math.floor(Math.random() * images.length)]
  return getHotelImageUrl(randomImage, width, height)
}

// Get hotel images by location/type
export function getHotelImageByType(type: string, width = 400, height = 300): string {
  const imageMap: Record<string, string> = {
    paris: "photo-1551882547-ff40c63fe5fa",
    maldives: "photo-1520250497591-112f2f40a3f4",
    alps: "photo-1571896349842-33c89424de2d",
    newyork: "photo-1564501049412-61c2a3083791",
    santorini: "photo-1613490493576-7fde63acd811",
    dubai: "photo-1582719478250-c89cae4dc85b",
    tokyo: "photo-1578662996442-48f60103fc96",
    london: "photo-1445019980597-93fa8acb246c",
    bali: "photo-1542314831-068cd1dbfeeb",
    miami: "photo-1566073771259-6a8506099945",
  }

  const imageId = imageMap[type.toLowerCase()] || HOTEL_IMAGE_IDS.luxury[0]
  return getHotelImageUrl(imageId, width, height)
}
