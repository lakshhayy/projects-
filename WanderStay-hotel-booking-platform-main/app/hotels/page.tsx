"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Wifi, Car, Coffee, Users, Search, Filter } from "lucide-react"
import { getHotelImageByType, getRandomHotelImage } from "@/lib/hotel-images"
import HotelImage from "@/components/hotel-image"
import ImageGallery from "@/components/image-gallery"

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<any>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const hotels = [
    {
      id: 1,
      name: "The Grand Palace",
      location: "Paris, France",
      rating: 5,
      price: 450,
      image: getHotelImageByType("paris", 400, 300),
      images: [
        getHotelImageByType("paris", 800, 600),
        getRandomHotelImage("rooms", 800, 600),
        getRandomHotelImage("amenities", 800, 600),
      ],
      amenities: ["Wifi", "Parking", "Restaurant", "Spa"],
      description: "Luxury hotel in the heart of Paris with stunning city views",
    },
    {
      id: 2,
      name: "Ocean Breeze Resort",
      location: "Maldives",
      rating: 5,
      price: 680,
      image: getHotelImageByType("maldives", 400, 300),
      images: [
        getHotelImageByType("maldives", 800, 600),
        getRandomHotelImage("rooms", 800, 600),
        getRandomHotelImage("amenities", 800, 600),
      ],
      amenities: ["Wifi", "Beach Access", "Pool", "Spa"],
      description: "Overwater bungalows with crystal clear ocean views",
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Swiss Alps",
      rating: 4,
      price: 320,
      image: getHotelImageByType("alps", 400, 300),
      images: [
        getHotelImageByType("alps", 800, 600),
        getRandomHotelImage("rooms", 800, 600),
        getRandomHotelImage("amenities", 800, 600),
      ],
      amenities: ["Wifi", "Parking", "Restaurant", "Ski Access"],
      description: "Cozy alpine lodge with breathtaking mountain panoramas",
    },
    {
      id: 4,
      name: "Urban Boutique Hotel",
      location: "New York, USA",
      rating: 4,
      price: 280,
      image: getHotelImageByType("newyork", 400, 300),
      images: [
        getHotelImageByType("newyork", 800, 600),
        getRandomHotelImage("rooms", 800, 600),
        getRandomHotelImage("amenities", 800, 600),
      ],
      amenities: ["Wifi", "Gym", "Restaurant", "Business Center"],
      description: "Modern boutique hotel in Manhattan's vibrant district",
    },
    {
      id: 5,
      name: "Sunset Beach Villa",
      location: "Santorini, Greece",
      rating: 5,
      price: 520,
      image: getHotelImageByType("santorini", 400, 300),
      images: [
        getHotelImageByType("santorini", 800, 600),
        getRandomHotelImage("rooms", 800, 600),
        getRandomHotelImage("amenities", 800, 600),
      ],
      amenities: ["Wifi", "Pool", "Beach Access", "Restaurant"],
      description: "Whitewashed villa overlooking the Aegean Sea",
    },
    {
      id: 6,
      name: "Desert Oasis Resort",
      location: "Dubai, UAE",
      rating: 5,
      price: 380,
      image: getHotelImageByType("dubai", 400, 300),
      images: [
        getHotelImageByType("dubai", 800, 600),
        getRandomHotelImage("rooms", 800, 600),
        getRandomHotelImage("amenities", 800, 600),
      ],
      amenities: ["Wifi", "Pool", "Spa", "Golf Course"],
      description: "Luxurious desert resort with world-class amenities",
    },
  ]

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "parking":
        return <Car className="w-4 h-4" />
      case "restaurant":
        return <Coffee className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Discover Amazing Hotels</h1>
            <p className="text-xl text-slate-300 mb-8">Find your perfect stay from our curated collection</p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search hotels or destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full bg-white text-slate-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-800">{filteredHotels.length} Hotels Found</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel, index) => (
              <div
                key={hotel.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    setSelectedHotel(hotel)
                    setGalleryOpen(true)
                  }}
                >
                  <HotelImage
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48"
                    width={400}
                    height={192}
                    priority={index < 6}
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="ml-1 text-sm font-semibold">{hotel.rating}</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 font-semibold">
                      View Gallery
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{hotel.name}</h3>
                  <p className="text-slate-600 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </p>
                  <p className="text-slate-600 text-sm mb-4">{hotel.description}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full text-xs text-slate-600"
                      >
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">${hotel.price}</span>
                      <span className="text-slate-600">/night</span>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">Book Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHotels.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600">No hotels found matching your search.</p>
              <Button onClick={() => setSearchTerm("")} className="mt-4 bg-amber-500 hover:bg-amber-600 text-slate-900">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
      {selectedHotel && (
        <ImageGallery
          images={selectedHotel.images}
          hotelName={selectedHotel.name}
          isOpen={galleryOpen}
          onClose={() => {
            setGalleryOpen(false)
            setSelectedHotel(null)
          }}
        />
      )}
    </div>
  )
}
