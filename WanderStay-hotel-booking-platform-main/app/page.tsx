"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { getHotelImageByType } from "@/lib/hotel-images"
import HotelImage from "@/components/hotel-image"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const featuredHotels = [
    {
      id: 1,
      name: "The Grand Palace",
      location: "Paris, France",
      rating: 5,
      price: 450,
      image: getHotelImageByType("paris", 400, 300),
    },
    {
      id: 2,
      name: "Ocean Breeze Resort",
      location: "Maldives",
      rating: 5,
      price: 680,
      image: getHotelImageByType("maldives", 400, 300),
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Swiss Alps",
      rating: 4,
      price: 320,
      image: getHotelImageByType("alps", 400, 300),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.4)), url('${getHotelImageByType("luxury", 1920, 1080)}')`,
          }}
        />

        <div
          className={`relative z-10 text-center text-white px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
            Welcome to
            <span className="block text-amber-400">WanderStay</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover extraordinary hotels and create unforgettable memories around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hotels">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
              >
                Explore Hotels
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg transition-all duration-300"
            >
              Watch Video
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 font-serif">Why Choose WanderStay?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience luxury, comfort, and exceptional service at every destination
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Premium Quality</h3>
              <p className="text-slate-600">Hand-picked luxury hotels with exceptional ratings and reviews</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Prime Locations</h3>
              <p className="text-slate-600">Hotels in the most desirable destinations worldwide</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">24/7 Support</h3>
              <p className="text-slate-600">Round-the-clock customer service for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 font-serif">Featured Hotels</h2>
            <p className="text-xl text-slate-600">Discover our most popular destinations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <div
                key={hotel.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <HotelImage
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48"
                    width={400}
                    height={192}
                    priority={index < 3}
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="ml-1 text-sm font-semibold">{hotel.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{hotel.name}</h3>
                  <p className="text-slate-600 mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">${hotel.price}</span>
                      <span className="text-slate-600">/night</span>
                    </div>
                    <Button className="bg-slate-800 hover:bg-slate-700 text-white">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/hotels">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-3"
              >
                View All Hotels
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 font-serif">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 text-slate-300">
            Join thousands of travelers who trust WanderStay for their perfect getaway
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hotels">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3 text-lg"
              >
                Book Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-800 px-8 py-3 text-lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
