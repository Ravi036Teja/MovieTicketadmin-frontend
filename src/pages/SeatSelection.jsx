import React, { useEffect, useState } from "react";
import axios from "axios";

const SeatSelection = ({ showtimeId }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userId, setUserId] = useState("user123"); // replace with actual logged-in user

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.get(`https://movieticketadmin-backend.onrender.com/api/seats/${showtimeId}`);
        setSeats(res.data);
      } catch (err) {
        console.error("Error fetching seats:", err);
      }
    };

    if (showtimeId) {
      fetchSeats();
    }
  }, [showtimeId]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return alert("Select at least one seat!");

    try {
      const res = await axios.post("https://movieticketadmin-backend.onrender.com/api/bookings", {
        showtimeId,
        seatIds: selectedSeats,
        userId,
      });

      alert("Booking successful!");
      console.log("Booking Response:", res.data);
      setSelectedSeats([]); // reset after booking
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
      <div className="grid grid-cols-10 gap-2">
        {seats.map((seat) => (
          <div
            key={seat._id}
            onClick={() => !seat.isBooked && toggleSeat(seat._id)}
            className={`p-2 text-center cursor-pointer rounded ${
              seat.isBooked
                ? "bg-gray-400 cursor-not-allowed"
                : selectedSeats.includes(seat._id)
                ? "bg-green-500 text-white"
                : "bg-blue-200"
            }`}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Selected Seats:</h3>
        <p>{selectedSeats.join(", ")}</p>

        <button
          onClick={handleBooking}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
