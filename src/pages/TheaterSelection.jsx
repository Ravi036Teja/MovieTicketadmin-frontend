import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SelectTheaterAndShowtime() {
  // Extract the movieId from the URL (make sure your router uses ':movieId')
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState(null);
  const [theater, setTheater] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call your backend API which returns: { movie, theater, showtimes }
        const res = await axios.get(`https://movieticketadmin-backend.onrender.com/api/movies/${movieId}/showtimes`);
        setMovie(res.data.movie);
        setTheater(res.data.theater);
        setShowtimes(res.data.showtimes);
        setError("");
      } catch (err) {
        console.error("Error fetching movie data:", err.response?.data || err.message);
        setError("Something went wrong while loading the data.");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchData();
    } else {
      setError("No movie ID found in URL.");
      setLoading(false);
    }
  }, [movieId]);

  if (loading) {
    return <div className="ml-0 md:ml-64 p-6">Loading...</div>;
  }
  if (error) {
    return <div className="ml-0 md:ml-64 p-6 text-red-600">{error}</div>;
  }
  if (!movie || !theater) {
    return <div className="ml-0 md:ml-64 p-6">Movie or theater not found.</div>;
  }

  return (
    <div className="ml-0 md:ml-64 p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-2">🎬 {movie.title}</h1>
        <h2 className="text-lg text-gray-700 mb-4">📍 Theater: {theater.name}</h2>

        <h3 className="text-md font-semibold mb-2">Select Showtime:</h3>
        <div className="flex flex-wrap gap-3">
          {showtimes.length > 0 ? (
            showtimes.map((show) => {
              const isSelected = selectedShowtime === show._id;
              let showTimeFormatted = "Invalid Time";
              if (show.startTime) {
                const parsedTime = new Date(show.startTime);
                if (!isNaN(parsedTime.getTime())) {
                  showTimeFormatted = parsedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }
              }
              return (
                <button
                  key={show._id}
                  onClick={() => setSelectedShowtime(show._id)}
                  className={`px-4 py-2 rounded-full border ${
                    isSelected ? "bg-red-600 text-white" : "bg-white text-gray-800"
                  }`}
                >
                  🕒 {showTimeFormatted}
                </button>
              );
            })
          ) : (
            <p className="text-gray-600">No showtimes available.</p>
          )}
        </div>

        {selectedShowtime && (
          <button
            onClick={() =>
              navigate(`/movie/${movieId}/select-seat?showtimeId=${selectedShowtime}`)
            }
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg"
          >
            🎟️ Continue to Seat Selection
          </button>
        )}
      </div>
    </div>
  );
}
