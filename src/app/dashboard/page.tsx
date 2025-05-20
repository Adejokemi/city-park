"use client";

import { useEffect, useState } from "react";

type Guest = {
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
  checkedInAt: string;
};

const MAX_TICKETS_PER_DAY = 100; // Adjust this as needed

export default function DashboardPage() {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("guest_log") || "[]");
    setGuests(data.reverse());
  }, []);

  // Group by date
  const groupedByDate: Record<string, Guest[]> = guests.reduce((acc, guest) => {
    const day = guest.visitDate;
    if (!acc[day]) acc[day] = [];
    acc[day].push(guest);
    return acc;
  }, {} as Record<string, Guest[]>);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Guest Dashboard
      </h1>

      {Object.entries(groupedByDate).map(([date, entries]) => {
        const totalBooked = entries.reduce(
          (sum, g) => sum + g.adultCount + g.childCount,
          0
        );
        const ticketsLeft = MAX_TICKETS_PER_DAY - totalBooked;

        return (
          <div key={date} className="mb-8">
            <div className="mb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {date} – {totalBooked} Tickets Sold / {ticketsLeft} Remaining
              </h2>
            </div>
            <div className="overflow-x-auto rounded border">
              <table className="min-w-full table-auto text-sm bg-white">
                <thead className="bg-green-100 text-gray-800">
                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Ticket</th>
                    <th className="p-2 text-left"># Adults</th>
                    <th className="p-2 text-left"># Children</th>
                    <th className="p-2 text-left">Checked In</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((guest) => (
                    <tr key={guest.id} className="border-t">
                      <td className="p-2">{guest.fullName}</td>
                      <td className="p-2">{guest.email}</td>
                      <td className="p-2">{guest.phone}</td>
                      <td className="p-2">{guest.ticketType}</td>
                      <td className="p-2">{guest.adultCount}</td>
                      <td className="p-2">{guest.childCount}</td>
                      <td className="p-2">
                        {new Date(guest.checkedInAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
