import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://movieticketadmin-backend.onrender.com/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Failed to fetch movies", err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 bg-white shadow sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center text-gray-800">🎬 Now Showing</h1>
      </header>

      {/* Movie Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="relative rounded-xl overflow-hidden shadow-md group"
          >
            {/* Poster */}
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

            {/* Movie Info */}
            <div className="absolute bottom-12 px-2 text-white w-full">
              <h2 className="text-sm font-bold truncate">{movie.title}</h2>
              <p className="text-xs text-gray-200">{movie.language} • {movie.duration}</p>
            </div>

            {/* Book Now Button */}
            <div className="absolute bottom-2 w-full px-2">
              <Link
                to={`/movie/${movie._id}`}
                className="block text-center bg-red-600 hover:bg-red-700 text-white py-1.5 rounded-full text-xs font-medium shadow-md"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
