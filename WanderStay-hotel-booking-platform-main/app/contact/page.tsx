"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Get in Touch</h1>
            <p className="text-xl text-slate-300">We're here to help you plan your perfect stay</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Contact Information</h2>
                  <p className="text-slate-600 mb-8">
                    Have questions about your booking or need assistance? Our friendly team is here to help you 24/7.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Address</h3>
                      <p className="text-slate-600">
                        123 Luxury Avenue
                        <br />
                        Hotel District, HD 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Phone</h3>
                      <p className="text-slate-600">
                        +1 (555) 123-4567
                        <br />
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
                      <p className="text-slate-600">
                        info@wanderstay.com
                        <br />
                        support@wanderstay.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Business Hours</h3>
                      <p className="text-slate-600">
                        Monday - Friday: 9:00 AM - 8:00 PM
                        <br />
                        Saturday - Sunday: 10:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-slate-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-slate-500">Interactive Map Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 font-serif">Frequently Asked Questions</h2>
            <p className="text-slate-600">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">How do I make a reservation?</h3>
                <p className="text-slate-600">
                  You can book directly through our website or call our reservation team at +1 (555) 123-4567.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">What is your cancellation policy?</h3>
                <p className="text-slate-600">
                  Free cancellation up to 24 hours before check-in. Terms may vary by hotel.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Do you offer group discounts?</h3>
                <p className="text-slate-600">Yes! Contact us for special rates on bookings of 5 or more rooms.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Is customer support available 24/7?</h3>
                <p className="text-slate-600">
                  Yes, our customer support team is available around the clock to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
