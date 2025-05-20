"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ClipboardCheck,
  Home,
  LogOut,
  Menu,
  X,
  Camera,
  CheckCircle,
} from "lucide-react";

// Define the shape of the booking data
interface Booking {
  fullName: string;
  email: string;
  phone: string;
  visitDate: string;
  ticketType: "Classic" | "Premium";
  adultCount: number;
  childrenCount: number;
  total: number;
}

// Dummy bookings for demo purposes
const dummyBookings: Record<string, Booking> = {
  TICKET123: {
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+234 801 234 5678",
    visitDate: "2025-05-20",
    ticketType: "Premium",
    adultCount: 2,
    childrenCount: 1,
    total: 35000,
  },
  TICKET456: {
    fullName: "Emily Johnson",
    email: "emily.j@example.com",
    phone: "+234 802 345 6789",
    visitDate: "2025-05-20",
    ticketType: "Classic",
    adultCount: 1,
    childrenCount: 0,
    total: 15000,
  },
  TICKET789: {
    fullName: "David & Stella Brown",
    email: "dbrown@example.com",
    phone: "+234 803 456 7890",
    visitDate: "2025-05-20",
    ticketType: "Premium",
    adultCount: 2,
    childrenCount: 2,
    total: 45000,
  },
};

export default function CheckInPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  // Simulate camera scanning
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLines, setScanLines] = useState(0);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("sales_logged_in") === "true";
    if (!isLoggedIn) {
      router.push("/sales/login");
    }
  }, [router]);

  // Simulate scanning effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (scanning && !scanned) {
      interval = setInterval(() => {
        setScanLines((prev) => (prev + 1) % 3);
        setScanProgress((prev) => {
          const newProgress = prev + 2;

          // When scan reaches 100%, simulate finding a ticket
          if (newProgress >= 100) {
            clearInterval(interval);
            handleScanComplete();
            return 100;
          }
          return newProgress;
        });
      }, 50);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [scanning, scanned]);

  const startScanning = () => {
    setScanning(true);
    setScanned(false);
    setCheckInSuccess(false);
    setScanProgress(0);
    setBooking(null);
  };

  const handleScanComplete = () => {
    // For demo purposes, randomly select one of the dummy tickets
    const ticketKeys = Object.keys(dummyBookings);
    const randomTicket =
      dummyBookings[ticketKeys[Math.floor(Math.random() * ticketKeys.length)]];

    setTimeout(() => {
      setBooking(randomTicket);
      setScanned(true);
      setScanning(false);
    }, 500);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim()) return;

    // Check if the ticket ID exists in our dummy data
    const ticket = dummyBookings[searchInput.toUpperCase()];

    if (ticket) {
      setBooking(ticket);
      setScanned(true);
    } else {
      alert("Booking not found. Try TICKET123, TICKET456, or TICKET789");
    }
  };

  const handleCheckIn = () => {
    if (!booking) return;

    // Simulate API call with a timeout
    setTimeout(() => {
      // In a real app, you would send this data to your backend
      const checkInData = {
        ...booking,
        checkInTime: new Date().toISOString(),
        salesRep: localStorage.getItem("sales_username") || "Demo User",
      };

      console.log("Check-in data:", checkInData);

      // Add to local storage for demonstration
      const existingCheckIns = JSON.parse(
        localStorage.getItem("check_ins") || "[]"
      );
      existingCheckIns.push(checkInData);
      localStorage.setItem("check_ins", JSON.stringify(existingCheckIns));

      setCheckInSuccess(true);
    }, 1000);
  };

  const resetCheckIn = () => {
    setBooking(null);
    setScanned(false);
    setCheckInSuccess(false);
    setSearchInput("");
  };

  const handleLogout = () => {
    localStorage.removeItem("sales_logged_in");
    router.push("/sales/login");
  };

  const getTicketBadgeColor = (ticketType: "Classic" | "Premium") => {
    return ticketType === "Premium"
      ? "bg-purple-100 text-purple-800"
      : "bg-blue-100 text-blue-800";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed -top-3 right-2 z-20 m-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-emerald-800 text-white transform transition-transform duration-300 ease-in-out #{
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-auto lg:h-screen`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-emerald-700">
            <h2 className="text-2xl font-bold">Ticket System</h2>
            <p className="text-sm text-emerald-200">Sales Portal</p>
          </div>

          <nav className="flex-1 py-4 px-3 space-y-1">
            <Link
              href="/sales/dashboard"
              className="flex items-center px-4 py-3 text-emerald-100 hover:bg-emerald-700 rounded-md"
            >
              <Home className="mr-3" size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/sales/check-in"
              className="flex items-center px-4 py-3 bg-emerald-700 text-white rounded-md"
            >
              <ClipboardCheck className="mr-3" size={20} />
              <span>Check-In Visitors</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-emerald-700">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 w-full text-emerald-100 hover:bg-emerald-700 rounded-md"
            >
              <LogOut className="mr-3" size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center flex-col md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">
              Visitor Check-In
            </h1>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          {/* Manual Search */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Manual Ticket Lookup</h2>
            <form
              onSubmit={handleManualSearch}
              className="flex flex-col md:flex-row  gap-2"
            >
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g., TICKET123)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Search
              </button>
            </form>
          </div>

          {/* QR Scanner Area */}
          {!scanned && !checkInSuccess && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Scan Visitor Ticket
                </h2>
                <p className="text-gray-600">
                  Position the QR code within the frame to scan
                </p>
              </div>

              <div className="relative mx-auto" style={{ maxWidth: "400px" }}>
                {/* Camera preview simulation */}
                <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden relative">
                  {/* Scanner animation effect */}
                  {scanning && (
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                      <div
                        className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 opacity-70"
                        style={{ transform: `translateY(#{scanProgress}%)` }}
                      ></div>

                      {/* Scan lines */}
                      <div className="text-emerald-500 mb-4">
                        {Array(scanLines + 1)
                          .fill("")
                          .map(() => "|")
                          .join(" ")}
                      </div>

                      <div className="text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                        Scanning... {scanProgress}%
                      </div>
                    </div>
                  )}

                  {/* Camera icon placeholder when not scanning */}
                  {!scanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera size={80} className="text-gray-600" />
                    </div>
                  )}

                  {/* Scanner border effect */}
                  <div className="absolute inset-0 border-2 border-emerald-500 rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={startScanning}
                    disabled={scanning}
                    className={`px-6 py-3 rounded-md #{
                      scanning
                        ? "bg-gray-500"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    } text-white font-medium flex items-center`}
                  >
                    <Camera className="mr-2" size={20} />
                    {scanning ? "Scanning..." : "Start Scanning"}
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  For demo purposes: Will simulate scanning and find a random
                  ticket
                </p>
              </div>
            </div>
          )}

          {/* Ticket Details */}
          {scanned && booking && !checkInSuccess && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="bg-emerald-700 text-white p-4">
                <h2 className="text-xl font-semibold">
                  Visitor Ticket Information
                </h2>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-4 text-emerald-800">
                      Personal Details
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="font-medium w-24 text-gray-700">
                          Name:
                        </span>
                        <span className="text-gray-900">
                          {booking.fullName}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium w-24 text-gray-700">
                          Email:
                        </span>
                        <span className="text-gray-900">{booking.email}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium w-24 text-gray-700">
                          Phone:
                        </span>
                        <span className="text-gray-900">{booking.phone}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-4 text-emerald-800">
                      Ticket Details
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="font-medium w-24 text-gray-700">
                          Date:
                        </span>
                        <span className="text-gray-900">
                          {new Date(booking.visitDate).toLocaleDateString()}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium w-24 text-gray-700">
                          Type:
                        </span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTicketBadgeColor(
                            booking.ticketType
                          )}`}
                        >
                          {booking.ticketType}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium w-24 text-gray-700">
                          Adults:
                        </span>
                        <span className="text-gray-900">
                          {booking.adultCount}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium w-24 text-gray-700">
                          Children:
                        </span>
                        <span className="text-gray-900">
                          {booking.childrenCount}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium w-24 text-gray-700">
                          Total:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          ₦{booking.total.toLocaleString()}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={resetCheckIn}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCheckIn}
                    className="px-6 py-2 bg-emerald-600 whitespace-nowrap text-white rounded-md hover:bg-emerald-700 flex items-center"
                  >
                    <ClipboardCheck className="mr-2" size={20} />
                    Check In Visitor
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {checkInSuccess && booking && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Check-In Successful!
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  {booking.fullName} has been checked in.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {new Date().toLocaleTimeString()} •{" "}
                  {new Date().toLocaleDateString()}
                </p>

                <div className="bg-gray-100 rounded-lg p-4 w-full max-w-sm mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Ticket Type:</span>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full #{getTicketBadgeColor(
                        booking.ticketType
                      )}`}
                    >
                      {booking.ticketType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Visitors:</span>
                    <span className="text-gray-900">
                      {booking.adultCount} Adults, {booking.childrenCount}{" "}
                      Children
                    </span>
                  </div>
                </div>

                <button
                  onClick={resetCheckIn}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Check In Another Visitor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
