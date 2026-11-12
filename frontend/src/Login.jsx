
import React, { useState } from 'react'
import { 
  Mail, LockKeyhole, Eye, EyeOff, 
  ArrowRight, Sparkles 
} from 'lucide-react'
import api from './utils/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submitData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/auth/login', data)

      const token = response.data.accesstoken

      localStorage.setItem('accessToken', token)

      console.log('Logged in successfully')

    } catch (error) {
      setError(
        error.response?.data?.message || 'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080D1B] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] top-0 left-0" />
      <div className="absolute w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] bottom-0 right-0" />

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-[#111827]/90 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center">
            <Sparkles size={28} className="text-blue-400" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome back
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                name="email"
                value={data.email}
                onChange={submitData}
                placeholder="you@example.com"
                required
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={data.password}
                onChange={submitData}
                placeholder="Enter your password"
                required
                className="w-full bg-[#0B1220] border border-gray-700 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
          >
            {loading ? 'Signing in...' : 'Sign in'}

            {!loading && <ArrowRight size={18} />}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs">
            Secure authentication · Your account is protected
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login
