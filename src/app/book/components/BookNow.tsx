"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PaystackButton } from "react-paystack";

type TicketType = {
  id: string;
  name: string;
  adultPrice: number;
  childPrice: number;
  description: string;
};

const ticketTypes: TicketType[] = [
  {
    id: "Basic",
    name: "Basic Park Ticket",
    adultPrice: 2000,
    childPrice: 0,
    description: "Entry access to City Park and playground.",
  },
  {
    id: "Classic",
    name: "Classic Park Ticket",
    adultPrice: 3500,
    childPrice: 1500,
    description: "Includes guided park tour and free drink.",
  },
  {
    id: "Mangrove",
    name: "Mangrove Park Experience",
    adultPrice: 5000,
    childPrice: 2000,
    description:
      "Full park experience with access to games and private picnic area.",
  },
];

export default function BookNowForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    ticketType: "Basic",
    adultCount: 1,
    childCount: 0,
    visitDate: "",
  });
  const [errors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  const prices: Record<string, number> = {
    Basic: 2000,
    Classic: 3500,
    Mangrove: 5000,
  };

  const totalAmount =
    prices[form.ticketType] * form.adultCount +
    (form.ticketType === "Basic"
      ? 0
      : (ticketTypes.find((t) => t.id === form.ticketType)?.childPrice || 0) *
        form.childCount);

  const amountInKobo = totalAmount * 100;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "adultCount" || name === "childCount"
          ? Math.max(0, parseInt(value) || 0)
          : value,
    }));
  };

  // const validate = () => {
  //   const errs: typeof errors = {};
  //   if (!form.fullName.trim()) errs.fullName = "Name is required";
  //   if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
  //     errs.email = "Valid email required";
  //   if (!form.phone.trim()) errs.phone = "Phone is required";
  //   if (!form.visitDate) errs.visitDate = "Visit date is required";
  //   if (form.adultCount + form.childCount < 1)
  //     errs.childCount = "At least one ticket";
  //   setErrors(errs);
  //   return Object.keys(errs).length === 0;
  // };

  const onSuccess = (tx: {
    reference: string;
    transaction: string;
    status: string;
  }) => {
    const booking = {
      id: tx.reference,
      ...form,
      total: totalAmount,
      date: new Date().toISOString(),
    };
    localStorage.setItem(`booking_${tx.reference}`, JSON.stringify(booking));
    router.push(`/confirmation?reference=${tx.reference}`);
  };

  const paystackProps = {
    email: form.email,
    amount: amountInKobo,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "fullName",
          value: form.fullName,
        },
        { display_name: "Phone", variable_name: "phone", value: form.phone },
        {
          display_name: "Ticket Type",
          variable_name: "ticketType",
          value: form.ticketType,
        },
        {
          display_name: "Adult Count",
          variable_name: "adultCount",
          value: form.adultCount,
        },
        {
          display_name: "Child Count",
          variable_name: "childCount",
          value: form.childCount,
        },
        {
          display_name: "Visit Date",
          variable_name: "visitDate",
          value: form.visitDate,
        },
      ],
    },
    text: processing ? "Processing…" : "Proceed to Payment",
    onSuccess,
    onClose: () => setProcessing(false),
  };

  const [agree, setAgree] = useState(false);

  // const handlePayment = () => {
  //   if (!validate()) return;
  //   setProcessing(true);
  // };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Book Now – City Park</title>
      </Head>

      <header className="bg-green-700 text-white p-4">
        <Link href="/" className="font-bold">
          ← Back to Home
        </Link>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
          Book Your City Park Visit
        </h1>
        <div className="max-w-3xl mx-auto text-gray-800 bg-white rounded-lg shadow-lg p-8">
          {/* Form Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Full Name *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Email Address *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Phone Number *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+234 800 000 0000"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Visit Date *</label>
              <input
                name="visitDate"
                type="date"
                value={form.visitDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border px-3 py-2 rounded ${
                  errors.visitDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.visitDate && (
                <p className="text-red-500 text-sm">{errors.visitDate}</p>
              )}
            </div>
          </div>

          {/* Ticket Type Selection */}
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Choose Your Ticket</h2>
            {ticketTypes.map((t) => (
              <div key={t.id} className="flex items-start p-4 border rounded">
                <input
                  type="radio"
                  name="ticketType"
                  value={t.id}
                  checked={form.ticketType === t.id}
                  onChange={handleChange}
                  className="mt-1 mr-3"
                />
                <div>
                  <label className="font-medium cursor-pointer">{t.name}</label>
                  <p className="text-sm text-gray-600">{t.description}</p>
                  <p className="text-sm">
                    Adult: ₦{t.adultPrice.toLocaleString()}
                    {t.childPrice > 0 && (
                      <> • Child: ₦{t.childPrice.toLocaleString()}</>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Count */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium">Adults</label>
              <input
                name="adultCount"
                type="number"
                min={1}
                value={form.adultCount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
            </div>
            <div>
              <label className="block font-medium">Children</label>
              <input
                name="childCount"
                type="number"
                min={0}
                value={form.childCount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
              {errors.childCount && (
                <p className="text-red-500 text-sm">{errors.childCount}</p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 bg-green-50 p-4 rounded">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between">
              <span>Ticket Type:</span>
              <span>{form.ticketType}</span>
            </div>
            <div className="flex justify-between">
              <span>Adults x {form.adultCount}:</span>
              <span>
                ₦{(prices[form.ticketType] * form.adultCount).toLocaleString()}
              </span>
            </div>
            {form.childCount > 0 && (
              <div className="flex justify-between">
                <span>Children x {form.childCount}:</span>
                <span>
                  ₦
                  {(
                    (ticketTypes.find((t) => t.id === form.ticketType)
                      ?.childPrice || 0) * form.childCount
                  ).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold mt-2 border-t pt-2">
              <span>Total:</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-start mt-4 space-x-3">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I understand that tickets are <strong>non-refundable</strong> and
              must be used on the date booked. If unused, I have only{" "}
              <strong>24 hours grace</strong> after the booked date.
            </label>
          </div>

          {/* Pay Button */}
          <div className="mt-6 text-center">
            {!processing ? (
              <PaystackButton
                {...paystackProps}
                className="bg-green-600 text-white py-3 px-6 rounded w-full"
              />
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white py-3 px-6 rounded w-full cursor-not-allowed"
              >
                Processing...
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-green-700 text-white text-center p-4">
        &copy; {new Date().getFullYear()} City Park. All rights reserved.
      </footer>
    </div>
  );
}
