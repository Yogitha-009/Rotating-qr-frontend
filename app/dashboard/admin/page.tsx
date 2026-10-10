"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { User, Mail, LogOut } from "lucide-react"

export default function AdminDashboard() {
  const [showProfile, setShowProfile] = useState(false)
  const searchParams = useSearchParams()
  
  // Get username and email from query params
  const queryUsername = searchParams.get("username")
  const queryEmail = searchParams.get("email")
  
  // Use query params if available, otherwise fall back to localStorage or defaults
  const [username, setUsername] = useState("Admin")
  const [email, setEmail] = useState("admin@example.com")
  
  useEffect(() => {
    if (queryUsername) {
      setUsername(queryUsername)
    }
    
    if (queryEmail) {
      setEmail(queryEmail)
    } else if (typeof window !== "undefined") {
      // Try to get from localStorage if not in query params
      const storedEmail = localStorage.getItem("adminEmail")
      if (storedEmail) {
        setEmail(storedEmail)
      }
    }
  }, [queryUsername, queryEmail])

  function handleOnUserClick() {
    setShowProfile((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 p-6 text-slate-800">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
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
              <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
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
                        Admin
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

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-indigo-600">
              Dashboard
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Admin Controls
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500 hover:shadow-lg">
              Start QR
            </button>

            <button className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100">
              Stop QR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}