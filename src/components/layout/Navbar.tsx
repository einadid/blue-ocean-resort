"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean to-ocean-dark rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">BO</span>
              </div>
              <span className="text-2xl font-bold text-ocean">
                Blue Ocean Resort
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-ocean transition"
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className="text-gray-700 hover:text-ocean transition"
            >
              Rooms
            </Link>

            <Link
              href="/bookings"
              className="text-gray-700 hover:text-ocean transition"
            >
              My Bookings
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-ocean transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-ocean transition"
            >
              Contact
            </Link>
            {user && (
              <>
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-ocean transition"
                >
                  Profile
                </Link>
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-ocean transition"
                >
                  Admin
                </Link>
              </>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium">
                    {profile?.username || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-ocean hover:text-ocean-dark font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-ocean text-white rounded-lg hover:bg-ocean-dark transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-ocean"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:bg-ocean-50 rounded"
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className="block px-3 py-2 text-gray-700 hover:bg-ocean-50 rounded"
            >
              Rooms
            </Link>
            <Link
              href="/bookings"
              className="block px-3 py-2 text-gray-700 hover:bg-ocean-50 rounded"
            >
              My Bookings
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-ocean-50 rounded"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:bg-ocean-50 rounded"
            >
              Contact
            </Link>

            {user ? (
              <>
                <div className="px-3 py-2 text-gray-700 font-medium">
                  👤 {profile?.username || "User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-ocean hover:bg-ocean-50 rounded"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 bg-ocean text-white hover:bg-ocean-dark rounded text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
