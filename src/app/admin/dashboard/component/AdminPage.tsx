"use client";
import { useState } from "react";
import {
  Users,
  Ticket,
  LayoutDashboard,
  LogOut,
  DollarSign,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [tickets, setTickets] = useState([
    { id: 1, type: "Standard", price: 50, available: 150, sold: 50 },
    { id: 2, type: "Premium", price: 100, available: 75, sold: 25 },
    { id: 3, type: "VIP", price: 200, available: 30, sold: 20 },
  ]);

  const [salesReps, setSalesReps] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      ticketsSold: 35,
      active: true,
    },
    {
      id: 2,
      name: "Sarah Jones",
      email: "sarah@example.com",
      ticketsSold: 42,
      active: true,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      ticketsSold: 18,
      active: true,
    },
  ]);

  const [newTicketType, setNewTicketType] = useState("");
  const [newTicketPrice, setNewTicketPrice] = useState("");
  const [newTicketQuantity, setNewTicketQuantity] = useState("");

  const [newRepName, setNewRepName] = useState("");
  const [newRepEmail, setNewRepEmail] = useState("");

  // Analytics data for dashboard
  const totalRevenue = tickets.reduce(
    (sum, ticket) => sum + ticket.sold * ticket.price,
    0
  );
  const totalTickets = tickets.reduce(
    (sum, ticket) => sum + ticket.available + ticket.sold,
    0
  );
  const soldTickets = tickets.reduce((sum, ticket) => sum + ticket.sold, 0);

  const handleAddTicket = () => {
    if (!newTicketType || !newTicketPrice || !newTicketQuantity) return;

    const newTicket = {
      id: tickets.length + 1,
      type: newTicketType,
      price: parseInt(newTicketPrice),
      available: parseInt(newTicketQuantity),
      sold: 0,
    };

    setTickets([...tickets, newTicket]);
    setNewTicketType("");
    setNewTicketPrice("");
    setNewTicketQuantity("");
  };

interface TicketType {
    id: number;
    type: string;
    price: number;
    available: number;
    sold: number;
}

type TicketField = "price" | "available";

const handleUpdateTicket = (
    id: number,
    field: TicketField,
    value: string
) => {
    setTickets(
        tickets.map((ticket: TicketType) =>
            ticket.id === id ? { ...ticket, [field]: parseInt(value) || 0 } : ticket
        )
    );
};

interface DeleteTicketFn {
    (id: number): void;
}

const handleDeleteTicket: DeleteTicketFn = (id) => {
    setTickets(tickets.filter((ticket: TicketType) => ticket.id !== id));
};

  const handleAddSalesRep = () => {
    if (!newRepName || !newRepEmail) return;

    const newRep = {
      id: salesReps.length + 1,
      name: newRepName,
      email: newRepEmail,
      ticketsSold: 0,
      active: true,
    };

    setSalesReps([...salesReps, newRep]);
    setNewRepName("");
    setNewRepEmail("");
  };


interface SalesRep {
    id: number;
    name: string;
    email: string;
    ticketsSold: number;
    active: boolean;
}

const handleToggleRepStatus = (id: number) => {
    setSalesReps(
        salesReps.map((rep: SalesRep) =>
            rep.id === id ? { ...rep, active: !rep.active } : rep
        )
    );
};

interface DeleteRepFn {
    (id: number): void;
}

const handleDeleteRep: DeleteRepFn = (id) => {
    setSalesReps(salesReps.filter((rep: SalesRep) => rep.id !== id));
};

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <DollarSign size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl font-semibold">${totalRevenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Ticket size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Tickets</p>
              <p className="text-xl font-semibold">{totalTickets}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Activity size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Tickets Sold</p>
              <p className="text-xl font-semibold">
                {soldTickets} ({Math.round((soldTickets / totalTickets) * 100)}
                %)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Sales Reps</p>
              <p className="text-xl font-semibold">{salesReps.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Ticket Sales Overview</h3>
          <div className="h-64 flex items-end space-x-4 border-b border-l">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex flex-col items-center">
                <div
                  className="w-16 bg-blue-500 rounded-t"
                  style={{
                    height: `${
                      (ticket.sold / (ticket.available + ticket.sold)) * 200
                    }px`,
                  }}
                ></div>
                <p className="text-xs mt-2">{ticket.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">
            Top Sales Representatives
          </h3>
          <div className="space-y-4">
            {salesReps
              .sort((a, b) => b.ticketsSold - a.ticketsSold)
              .slice(0, 5)
              .map((rep) => (
                <div key={rep.id} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    {rep.name.charAt(0)}
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="font-medium">{rep.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (rep.ticketsSold / soldTickets) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-700 font-medium">{rep.ticketsSold}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTicketManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ticket Management</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Ticket Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Ticket Type"
            className="border rounded p-2"
            value={newTicketType}
            onChange={(e) => setNewTicketType(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price ($)"
            className="border rounded p-2"
            value={newTicketPrice}
            onChange={(e) => setNewTicketPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border rounded p-2"
            value={newTicketQuantity}
            onChange={(e) => setNewTicketQuantity(e.target.value)}
          />
          <button
            onClick={handleAddTicket}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Ticket
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    className="border rounded p-1 w-20"
                    value={ticket.price}
                    onChange={(e) =>
                      handleUpdateTicket(ticket.id, "price", e.target.value)
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    className="border rounded p-1 w-20"
                    value={ticket.available}
                    onChange={(e) =>
                      handleUpdateTicket(ticket.id, "available", e.target.value)
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.sold}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSalesRepManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sales Rep Management</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          Add New Sales Representative
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border rounded p-2"
            value={newRepName}
            onChange={(e) => setNewRepName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded p-2"
            value={newRepEmail}
            onChange={(e) => setNewRepEmail(e.target.value)}
          />
          <button
            onClick={handleAddSalesRep}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Rep
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tickets Sold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesReps.map((rep) => (
              <tr key={rep.id}>
                <td className="px-6 py-4 whitespace-nowrap">{rep.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{rep.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rep.ticketsSold}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      rep.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {rep.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button
                    onClick={() => handleToggleRepStatus(rep.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {rep.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDeleteRep(rep.id)}
                    className="text-red-600 hover:text-red-900 ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "tickets":
        return renderTicketManagement();
      case "salesreps":
        return renderSalesRepManagement();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Event Admin</h1>
        </div>

        <nav className="mt-6">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`flex items-center px-4 py-3 w-full ${
              activeSection === "dashboard"
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="ml-3">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSection("tickets")}
            className={`flex items-center px-4 py-3 w-full ${
              activeSection === "tickets" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            <Ticket size={18} />
            <span className="ml-3">Ticket Management</span>
          </button>

          <button
            onClick={() => setActiveSection("salesreps")}
            className={`flex items-center px-4 py-3 w-full ${
              activeSection === "salesreps"
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
          >
            <Users size={18} />
            <span className="ml-3">Sales Reps</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-64 p-4">
          <Link href="/admin/login">
          <button className="flex items-center text-gray-400 hover:text-white" >
            <LogOut size={18} />
            <span className="ml-3">Logout</span>
          </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">{renderContent()}</div>
    </div>
  );
}
