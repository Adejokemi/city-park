// components/BookingQRCode.tsx

import { QRCodeSVG } from "qrcode.react";
import React from "react";

type BookingQRCodeProps = {
  bookingId: string;
};

const BookingQRCode: React.FC<BookingQRCodeProps> = ({ bookingId }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Booking QR Code</h2>
      <QRCodeSVG
        value={bookingId}
        size={200}
        level="H"
        // includeMargin={true}
        bgColor="#ffffff"
        fgColor="#000000"
      />
      <p className="mt-4 text-sm text-gray-600 break-all">
        Booking ID: {bookingId}
      </p>
    </div>
  );
};

export default BookingQRCode;
