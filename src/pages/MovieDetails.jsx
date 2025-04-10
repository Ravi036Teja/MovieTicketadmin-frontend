import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Helper function to extract YouTube video ID from various URL formats
const getYoutubeVideoId = (url) => {
  const regExp = /^.*(youtu\.be\/|v=|\/v\/|embed\/)([^#&?]*).*/;
  const match = url.match(regExp);
  // Check if the extracted string is exactly 11 characters (YouTube video IDs are 11 characters long)
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function MovieDetails() {
  const { id } = useParams(); // Movie identifier (can be any unique id from your backend)
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchMovie();
    } else {
      setError("No movie ID found in URL.");
    }
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`https://movieticketadmin-backend.onrender.com/api/movies/${id}`);
      setMovie(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch movie:", err.response?.data || err.message);
      setError("Failed to load movie. Please try again.");
    }
  };

  if (error) {
    return <div className="p-6 text-red-600 font-semibold">{error}</div>;
  }

  if (!movie) {
    return <div className="p-6">Loading...</div>;
  }

  // Prepare embedded trailer URL if available
  const videoId = movie.trailerUrl ? getYoutubeVideoId(movie.trailerUrl) : null;
  const trailerEmbedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : null;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-start py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl relative">
        {/* Trailer Section: Embed the trailer video if available */}
        {trailerEmbedUrl && (
          <div className="relative h-56 w-full">
            <iframe
              className="w-full h-full object-cover"
              src={trailerEmbedUrl}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Poster and Movie Info */}
        <div className="relative px-4 -mt-12">
          <div className="w-32 h-48 rounded-xl overflow-hidden shadow-md border-4 border-white">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="px-4 pt-4 space-y-2">
          <h1 className="text-xl font-semibold">{movie.title}</h1>
          <p className="text-gray-500 text-sm">{movie.genre || "Action"}</p>
          <p className="text-gray-500 text-sm">{movie.duration} Hrs</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{movie.rating}/10</span>
            <span className="bg-yellow-400 text-black font-bold text-xs px-2 py-0.5 rounded">
              IMDb
            </span>
          </div>
          <p className="text-gray-700 text-sm pt-2">{movie.description}</p>
        </div>

        {/* Cast list: This will be displayed on the Movie Details page */} 
        <div className="px-4 pt-4">
          <h2 className="font-semibold text-gray-800 mb-2">Cast</h2>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {(movie.cast || []).map((actor, index) => (
              <div key={index} className="flex-shrink-0 w-20 text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-1 border">
                  <img
                    src={actor.image}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium">{actor.name}</p>
                {actor.role && (  // If role exists, display it
                  <p className="text-[10px] text-gray-500">{actor.role}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <div className="px-4 pt-6 pb-4">
          <button
            onClick={() => navigate(`/movie/${id}/select-theater`)}
            className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition"
          >
            Book the Show
          </button>
        </div>
      </div>
    </div>
  );
}
