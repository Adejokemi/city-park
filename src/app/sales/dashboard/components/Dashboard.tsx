"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipboardCheck, Home, LogOut, Menu, X } from "lucide-react";

type TicketType = "Classic" | "Premium";

type CheckIn = {
  fullName: string;
  checkInTime: string;
  ticketType: TicketType;
  adultCount: number;
  childrenCount: number;
};

export default function SalesDashboard() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [summaryStats, setSummaryStats] = useState({
    totalCheckIns: 0,
    classicTickets: 0,
    premiumTickets: 0,
    totalAdults: 0,
    totalChildren: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("sales_logged_in") === "true";
    if (!isLoggedIn) {
      router.push("/sales/login");
    } else {
      // Fetch check-in data from Google Sheets or localStorage
      // For demo purposes, we'll use enhanced dummy data
      const dummyData: CheckIn[] = [
        {
          fullName: "John Doe",
          checkInTime: "2025-05-19T10:00:00Z",
          ticketType: "Premium",
          adultCount: 2,
          childrenCount: 1,
        },
        {
          fullName: "Jane Smith",
          checkInTime: "2025-05-19T11:00:00Z",
          ticketType: "Classic",
          adultCount: 1,
          childrenCount: 0,
        },
        {
          fullName: "Michael Johnson",
          checkInTime: "2025-05-19T11:30:00Z",
          ticketType: "Premium",
          adultCount: 2,
          childrenCount: 2,
        },
        {
          fullName: "Sarah Williams",
          checkInTime: "2025-05-19T12:15:00Z",
          ticketType: "Classic",
          adultCount: 1,
          childrenCount: 1,
        },
      ];

      setCheckIns(dummyData);

      // Calculate summary statistics
      const stats = dummyData.reduce(
        (acc, checkIn) => {
          return {
            totalCheckIns: acc.totalCheckIns + 1,
            classicTickets:
              acc.classicTickets + (checkIn.ticketType === "Classic" ? 1 : 0),
            premiumTickets:
              acc.premiumTickets + (checkIn.ticketType === "Premium" ? 1 : 0),
            totalAdults: acc.totalAdults + checkIn.adultCount,
            totalChildren: acc.totalChildren + checkIn.childrenCount,
          };
        },
        {
          totalCheckIns: 0,
          classicTickets: 0,
          premiumTickets: 0,
          totalAdults: 0,
          totalChildren: 0,
        }
      );

      setSummaryStats(stats);
    }
  }, [router]);

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timeString: string) => {
    return new Date(timeString).toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

  const getTicketBadgeColor = (ticketType: TicketType) => {
    return ticketType === "Premium"
      ? "bg-purple-100 text-purple-800"
      : "bg-blue-100 text-blue-800";
  };

  const handleLogout = () => {
    localStorage.removeItem("sales_logged_in");
    router.push("/sales/login");
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
              className="flex items-center px-4 py-3 text-emerald-100 hover:bg-emerald-700 rounded-md"
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
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">
              Sales Rep Dashboard
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Total Check-Ins
              </h2>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-blue-600">
                  {summaryStats.totalCheckIns}
                </span>
                <span className="ml-2 text-sm text-gray-500">today</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Ticket Types
              </h2>
              <div className="flex justify-between">
                <div>
                  <span className="text-3xl font-bold text-emerald-600">
                    {summaryStats.classicTickets}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">Classic</span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-purple-600">
                    {summaryStats.premiumTickets}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">Premium</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Visitors
              </h2>
              <div className="flex justify-between">
                <div>
                  <span className="text-3xl font-bold text-amber-600">
                    {summaryStats.totalAdults}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">Adults</span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-pink-600">
                    {summaryStats.totalChildren}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">Children</span>
                </div>
              </div>
            </div>
          </div>

          {/* Check-ins Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-emerald-700 text-white">
              <h2 className="text-xl font-semibold">Recent Check-ins</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adults
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Children
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {checkIns.map((checkIn, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        {checkIn.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(checkIn.checkInTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatTime(checkIn.checkInTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTicketBadgeColor(
                            checkIn.ticketType
                          )}`}
                        >
                          {checkIn.ticketType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {checkIn.adultCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {checkIn.childrenCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {checkIns.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No check-ins found for today.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
