import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movieId");

  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShowtimeDetails = async () => {
      try {
        const res = await axios.get(
          `https://movieticketadmin-backend.onrender.com/api/showtimes/${showtimeId}`
        );
        setShowtime(res.data);
      } catch (err) {
        console.error("Failed to fetch showtime details:", err);
        setError("Unable to fetch showtime details.");
      } finally {
        setLoading(false);
      }
    };

    if (showtimeId) {
      fetchShowtimeDetails();
    }
  }, [showtimeId]);

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  if (loading) return <div className="text-center p-4">Loading seats...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;
  if (!showtime || !showtime.seatLayout)
    return <div className="text-center p-4">Showtime not found or no seats.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Seat Selection</h2>
      <p className="mb-4 text-gray-600">
        <strong>Movie ID:</strong> {movieId} <br />
        <strong>Showtime:</strong> {new Date(showtime.startTime).toLocaleString()}
      </p>

      <div className="grid grid-cols-10 gap-2">
        {showtime.seatLayout.map((seat, idx) => (
          <div
            key={idx}
            className={`border rounded p-2 text-center cursor-pointer text-sm ${
              seat.isBooked
                ? "bg-gray-400 text-white cursor-not-allowed"
                : selectedSeats.includes(seat.seatNumber)
                ? "bg-green-500 text-white"
                : "bg-white"
            }`}
            onClick={() => !seat.isBooked && toggleSeat(seat.seatNumber)}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Selected Seats:</h3>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</p>
      </div>
    </div>
  );
};

export default SeatSelection;
