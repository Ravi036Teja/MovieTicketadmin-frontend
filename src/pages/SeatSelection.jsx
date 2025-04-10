// ✅ UPDATED CODE

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SeatLayout = () => {
  const { movieId, showtimeId } = useParams();
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    axios
      .get(`https://movieticketadmin-backend.onrender.com/api/movies/${movieId}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Movie load failed", err));

    axios
      .get(`https://movieticketadmin-backend.onrender.com/api/seats/${showtimeId}`)
      .then((res) => {
        console.log("Seats:", res.data.seats);
        setSeats(res.data.slice(0, 50)); // ✅ res.data is already an array
      })
      .catch((err) => console.error("Seat load failed", err));
  }, [movieId, showtimeId]);

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeats((prev) =>
      prev.some((s) => s._id === seat._id)
        ? prev.filter((s) => s._id !== seat._id)
        : [...prev, seat]
    );
  };

  const getSeatPrice = (seat) => {
    if (seat.price) return Number(seat.price);
    if (seat.category === "Gold") return 250;
    if (seat.category === "Silver") return 180;
    return 150;
  };

  const totalPrice = selectedSeats.reduce(
    (acc, seat) => acc + getSeatPrice(seat),
    0
  );

  const confirmBooking = () => {
    const seatIds = selectedSeats.map((s) => s._id);
    axios
      .post("https://movieticketadmin-backend.onrender.com/api/seats/book", {
        showtimeId,
        seatIds,
      })
      .then(() => {
        alert("Booking Confirmed!");
        setSelectedSeats([]);
        return axios.get(`https://movieticketadmin-backend.onrender.com/api/seats/${showtimeId}`);
      })
      .then((res) => setSeats(res.data.seats.slice(0, 50)))
      .catch(() => alert("Booking failed"));
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {movie && (
        <div className="max-w-4xl mx-auto mb-6 flex gap-4 items-center">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-24 h-36 object-cover rounded shadow-md"
          />
          <div>
            <h1 className="text-xl font-bold">{movie.title}</h1>
            <p className="text-sm text-gray-600">
              {movie.genre} | {movie.language}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{movie.rating}/10</span>
              <span className="bg-yellow-400 text-black font-bold text-xs px-2 py-0.5 rounded">
                IMDb
              </span>
            </div>
            <p className="text-xs text-gray-500">
              🎬 {new Date(movie.releaseDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div>
          <h1 className="text-center text-2xl font-semibold text-blue-500">
            Screen Here
          </h1>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-center">
          Choose your seats
        </h2>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 p-2 bg-gray-100 rounded-md shadow-inner">
          {seats.map((seat) => {
            const isSelected = selectedSeats.some((s) => s._id === seat._id);
            const price = getSeatPrice(seat);
            return (
              <div
                key={seat._id}
                onClick={() => toggleSeat(seat)}
                className={`text-sm sm:text-base rounded p-2 text-center cursor-pointer transition-all
                  ${
                    seat.isBooked
                      ? "bg-black text-white"
                      : isSelected
                      ? "bg-yellow-400 text-white"
                      : seat.category === "Gold"
                      ? "bg-red-500 text-black"
                      : "bg-blue-400 text-white"
                  }
                `}
              >
                {seat.label}
                <div className="text-xs mt-1">₹{price}</div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center flex-wrap gap-2 text-xs mt-4">
          <span className="bg-yellow-300 px-3 py-1 rounded">Gold ₹250</span>
          <span className="bg-blue-200 px-3 py-1 rounded">Silver ₹180</span>
          <span className="bg-gray-400 text-white px-3 py-1 rounded">Booked</span>
          <span className="bg-green-500 text-white px-3 py-1 rounded">Selected</span>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t p-4 flex justify-between items-center z-10">
          <div>
            <p className="text-sm font-medium">
              Seats:{" "}
              <span className="text-green-600">
                {selectedSeats.map((s) => s.label).join(", ")}
              </span>
            </p>
            <p className="text-base font-bold">Total: ₹{totalPrice}</p>
          </div>
          <button
            onClick={confirmBooking}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
