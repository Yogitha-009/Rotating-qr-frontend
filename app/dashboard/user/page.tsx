"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { User, Mail, LogOut ,ScanQrCode} from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const [showProfile, setShowProfile] = useState(false)
  const searchParams = useSearchParams()
  
  // Get username and email from query params
  const queryUsername = searchParams.get("username")
  const queryEmail = searchParams.get("email")
  
  // Use query params if available, otherwise fall back to localStorage or defaults
  const [username, setUsername] = useState("User")
  const [email, setEmail] = useState("user@example.com")
  
  useEffect(() => {
    if (queryUsername) {
      setUsername(queryUsername)
    }
    
    if (queryEmail) {
      setEmail(queryEmail)
    } else if (typeof window !== "undefined") {
      // Try to get from localStorage if not in query params
      const storedEmail = localStorage.getItem("userEmail")
      if (storedEmail) {
        setEmail(storedEmail)
      }
    }
  }, [queryUsername, queryEmail])

  function handleOnUserClick() {
    setShowProfile((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 p-4 text-slate-800 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm sm:mb-8 sm:rounded-2xl sm:px-5 sm:py-4">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Rotating QR
          </h1>

          {/* Profile dropdown container */}
          <div className="relative">
            <button
              type="button"
              onClick={handleOnUserClick}
              aria-label="Toggle admin profile"
              aria-expanded={showProfile}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Dropdown menu */}
            {showProfile && (
              <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl sm:top-14 sm:w-64 sm:rounded-xl">
                {/* Admin credentials */}
                <div className="border-b border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <User className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {username}
                      </p>
                      <p className="truncate text-sm text-slate-500">
                        User
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{email}</span>
                  </div>
                </div>

                {/* Dropdown actions */}
                <button
                  type="button"
                  onClick={() => setShowProfile(false)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <User className="h-4 w-4" />
                  Close profile
                </button>

                <button
                  type="button"
                  onClick={() => setShowProfile(false)}
                  className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:rounded-3xl sm:p-6 md:p-8">
          <div className="mb-6 sm:mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-indigo-600">
              Dashboard
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Scan QR Codes</h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">Point your camera at a QR code to get started</p>
          </div>

          <div className="flex justify-center">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500 hover:shadow-lg sm:w-auto sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-lg">
              <ScanQrCode className="h-5 w-5 sm:h-6 sm:w-6" />
                <Link
                href="/scan"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-white"
                >
                Scan QR Code
                </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}