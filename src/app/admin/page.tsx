'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    capacity: '2',
    amenities: '',
    image1: '',
    image2: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('Please login')
      return
    }

    setLoading(true)

    try {
      const amenitiesArray = formData.amenities
        .split(',')
        .map((a: string) => a.trim())
        .filter((a: string) => a !== '')

      const imagesArray = [formData.image1, formData.image2].filter((i: string) => i !== '')

      const { error } = await supabase.from('rooms').insert([
        {
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          capacity: parseInt(formData.capacity),
          amenities: amenitiesArray,
          images: imagesArray.length > 0 
            ? imagesArray 
            : ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
          rating: 0,
          available: true,
        },
      ])

      if (error) throw error

      toast.success('Room added! 🎉')
      setFormData({
        title: '',
        description: '',
        price: '',
        capacity: '2',
        amenities: '',
        image1: '',
        image2: '',
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to add room'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin - Add Room</h1>

        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ocean outline-none"
                placeholder="e.g. Ocean View Deluxe"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ocean outline-none"
                rows={4}
                placeholder="Describe the room..."
                required
              />
            </div>

            {/* Price & Capacity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (৳/night) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ocean outline-none"
                  placeholder="12000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Guests *
                </label>
                <select
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ocean outline-none"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="8">8 Guests</option>
                </select>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amenities (comma separated)
              </label>
              <input
                type="text"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ocean outline-none"
                placeholder="WiFi, AC, TV, Pool, Balcony"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL 1
              </label>
              <input
                type="url"
                value={formData.image1}
                onChange={(e) => setFormData({ ...formData, image1: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ocean outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL 2
              </label>
              <input
                type="url"
                value={formData.image2}
                onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ocean outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Preview */}
            {formData.image1 && (
              <div className="rounded-lg overflow-hidden h-48">
                <img
                  src={formData.image1}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ocean text-white font-semibold rounded-lg hover:bg-ocean-dark disabled:opacity-50 transition text-lg"
            >
              {loading ? 'Adding Room...' : 'Add Room'}
            </button>
          </form>
        </div>

        {/* Quick Add Sample Rooms */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick: Add Sample Rooms</h2>
          <p className="text-gray-600 mb-4">Click to add 6 sample rooms instantly</p>
          <button
            onClick={async () => {
              setLoading(true)
              try {
                const { error } = await supabase.from('rooms').insert([
                  {
                    title: 'Ocean View Deluxe',
                    description: 'Spacious room with stunning ocean views and modern amenities.',
                    price: 12000, capacity: 2,
                    amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Balcony', 'Sea View'],
                    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
                    rating: 4.5, available: true,
                  },
                  {
                    title: 'Family Suite',
                    description: 'Large suite perfect for families with separate living area.',
                    price: 20000, capacity: 4,
                    amenities: ['WiFi', 'AC', 'TV', 'Kitchen', 'Living Room'],
                    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'],
                    rating: 4.8, available: true,
                  },
                  {
                    title: 'Beach Bungalow',
                    description: 'Private bungalow right on the beach with direct access.',
                    price: 25000, capacity: 3,
                    amenities: ['WiFi', 'AC', 'TV', 'Beach Access', 'Private Pool'],
                    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
                    rating: 5.0, available: true,
                  },
                  {
                    title: 'Standard Room',
                    description: 'Comfortable and affordable room with all basic amenities.',
                    price: 8000, capacity: 2,
                    amenities: ['WiFi', 'AC', 'TV', 'Mini Fridge'],
                    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'],
                    rating: 4.0, available: true,
                  },
                  {
                    title: 'Luxury Penthouse',
                    description: 'Ultimate luxury with panoramic ocean views.',
                    price: 35000, capacity: 6,
                    amenities: ['WiFi', 'AC', 'TV', 'Kitchen', 'Jacuzzi', 'Terrace'],
                    images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'],
                    rating: 5.0, available: true,
                  },
                  {
                    title: 'Garden View Room',
                    description: 'Peaceful room overlooking beautiful tropical gardens.',
                    price: 10000, capacity: 2,
                    amenities: ['WiFi', 'AC', 'TV', 'Garden View', 'Balcony'],
                    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'],
                    rating: 4.3, available: true,
                  },
                ])

                if (error) throw error
                toast.success('6 Sample rooms added! 🎉')
              } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Failed'
                toast.error(message)
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? 'Adding...' : '⚡ Add 6 Sample Rooms'}
          </button>
        </div>
      </div>
    </div>
  )
}