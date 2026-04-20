'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const { signUp } = useAuth()

  // Real-time username check
  const checkUsername = async (username: string) => {
    if (username.length < 3) {
      setUsernameAvailable(null)
      return
    }

    setCheckingUsername(true)
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single()

    setUsernameAvailable(!data)
    setCheckingUsername(false)
  }

  const handleUsernameChange = (username: string) => {
    setFormData({ ...formData, username })
    
    // Debounce username check
    const timer = setTimeout(() => {
      checkUsername(username)
    }, 500)

    return () => clearTimeout(timer)
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    return /^01[0-9]{9}$/.test(phone) // Bangladesh phone format
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validations
    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters')
      return
    }

    if (!validateEmail(formData.email)) {
      toast.error('Invalid email format')
      return
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      toast.error('Invalid phone number (use 01XXXXXXXXX)')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!usernameAvailable) {
      toast.error('Username is not available')
      return
    }

    setLoading(true)

    try {
      await signUp(formData.email, formData.password, formData.username)
      toast.success('Registration successful! Please login.')
      window.location.href = '/login'
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-2">Username *</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
            required
            minLength={3}
          />
          {checkingUsername && (
            <p className="text-sm text-gray-500 mt-1">Checking...</p>
          )}
          {usernameAvailable === true && (
            <p className="text-sm text-green-600 mt-1">✓ Username available</p>
          )}
          {usernameAvailable === false && (
            <p className="text-sm text-red-600 mt-1">✗ Username taken</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Password *</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
            required
            minLength={6}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password *</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !usernameAvailable}
          className="w-full bg-ocean text-white py-2 rounded-lg hover:bg-ocean-dark disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-ocean hover:underline">
          Login here
        </a>
      </p>
    </div>
  )
}