import React from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

export default function BookingConfirmation() {
  const { bookingId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">🎉 Booking Confirmed!</h1>
        <p className="mb-4">Here’s your QR code. Show it at the theater.</p>
        <QRCode value={bookingId} />
        <p className="mt-4 text-gray-500">Booking ID: {bookingId}</p>
      </div>
    </div>
  );
}
