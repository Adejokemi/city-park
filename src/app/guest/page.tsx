"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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

export default function GuestCheckInPage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [alreadyLogged, setAlreadyLogged] = useState(false);

  useEffect(() => {
    if (ref) {
      const stored = localStorage.getItem(`booking_#{ref}`);
      if (stored) {
        const data: Booking = JSON.parse(stored);
        setBooking(data);

        // Log the visit to a local "guest log"
        const logKey = "guest_log";
        const currentLog = JSON.parse(localStorage.getItem(logKey) || "[]");

        const isAlreadyLogged = currentLog.some(
          (entry: { id: string }) => entry.id === ref
        );
        if (!isAlreadyLogged) {
          currentLog.push({
            ...data,
            checkedInAt: new Date().toISOString(),
          });
          localStorage.setItem(logKey, JSON.stringify(currentLog));
        } else {
          setAlreadyLogged(true);
        }
      }
    }
  }, [ref]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading guest details…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Guest Check-In</h1>
      <div className="bg-white shadow p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Guest Info</h2>
        <div className="space-y-2 text-gray-800">
          <p>
            <strong>Name:</strong> {booking.fullName}
          </p>
          <p>
            <strong>Email:</strong> {booking.email}
          </p>
          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>
          <p>
            <strong>Ticket Type:</strong> {booking.ticketType}
          </p>
          <p>
            <strong>Guests:</strong> {booking.adultCount} Adult(s),{" "}
            {booking.childCount} Child(ren)
          </p>
          <p>
            <strong>Visit Date:</strong> {booking.visitDate}
          </p>
          <p>
            <strong>Total Paid:</strong> ₦{booking.total.toLocaleString()}
          </p>
          {alreadyLogged && (
            <p className="text-red-500 font-medium mt-2">
              ⚠️ Guest already checked in
            </p>
          )}
        </div>
      </div>

      <Link
        href="/"
        className="mt-6 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
