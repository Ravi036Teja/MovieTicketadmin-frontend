import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group transition-transform hover:scale-105">
      {/* Poster */}
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      {/* Movie Title + Info */}
      <div className="absolute bottom-16 px-4 text-white w-full">
        <h2 className="text-lg font-bold truncate">{movie.title}</h2>
        <p className="text-sm text-gray-300">{movie.language} • {movie.duration}</p>
      </div>

      {/* Book Now Button */}
      <div className="absolute bottom-4 w-full px-4">
        <Link
          to={`/movie/${movie._id}`}
          className="block text-center bg-green-600 hover:bg-red-700 text-white py-2 rounded-full font-medium text-sm shadow-lg"
        >
          Book
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
