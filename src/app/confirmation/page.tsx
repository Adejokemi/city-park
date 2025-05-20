"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import BookingQRCode from "./components/BookingQR";

type Booking = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  ticketType: string;
  adultCount: number;
  childCount: number;
  visitDate: string;
  total: number;
  date: string;
};

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (reference) {
      const stored = localStorage.getItem(`booking_${reference}`);
      if (stored) {
        setBooking(JSON.parse(stored));
      }
    }
  }, [reference]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-green-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-green-100 rounded"></div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Booking Confirmation – City Park</title>
      </Head>

      <header className="bg-green-700 text-white p-4">
        <Link href="/" className="font-bold">
          ← Back to Home
        </Link>
      </header>

      <main className="flex-grow container mx-auto p-6 flex flex-col items-center">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white p-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
              <p className="mt-1 opacity-90">
                Your City Park adventure awaits...
              </p>
            </div>
            <div className="bg-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <p className="text-gray-700 text-lg">
                Thank you,{" "}
                <span className="font-semibold">{booking.fullName}</span>!
              </p>
              <p className="text-gray-700">
                Your booking for {booking.ticketType} on{" "}
                <span className="font-semibold">
                  {formatDate(booking.visitDate)}
                </span>{" "}
                is confirmed.
              </p>
            </div>

            <div className="md:flex md:gap-8">
              {/* Booking details */}
              <div className="flex-1 mb-8 md:mb-0">
                <h2 className="text-xl font-semibold mb-4 text-green-700 border-b pb-2">
                  Booking Details
                </h2>
                <div className="space-y-3">
                  <Detail label="Reference" value={booking.id} />
                  <Detail label="Name" value={booking.fullName} />
                  <Detail label="Email" value={booking.email} />
                  <Detail label="Phone" value={booking.phone} />
                  <Detail
                    label="Visit Date"
                    value={formatDate(booking.visitDate)}
                  />
                  <Detail label="Ticket Type" value={booking.ticketType} />
                  <Detail
                    label="Tickets"
                    value={`${booking.adultCount} Adult${
                      booking.adultCount !== 1 ? "s" : ""
                    }, ${booking.childCount} Child${
                      booking.childCount !== 1 ? "ren" : ""
                    }`}
                  />
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-700 font-semibold">
                      Total Paid
                    </span>
                    <span className="font-bold text-green-700 text-lg">
                      ₦{booking.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking QR Code */}
              <div className="flex-1 flex flex-col items-center">
                <BookingQRCode bookingId={booking.id} />
              </div>
            </div>

            <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-semibold text-green-700">
                Important Information
              </h3>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>• Please arrive 15 minutes before your scheduled time</li>
                <li>
                  • This booking confirmation has been sent to your email
                  address
                </li>
                <li>• For any questions, contact support@Citypark.com</li>
              </ul>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} City Park. All rights reserved.
      </footer>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
