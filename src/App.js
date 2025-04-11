import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import SelectTheaterAndShowtime from "./pages/TheaterSelection";
import BookingConfirmation from "./pages/BookingConfirmation";
import SeatSelection from "./pages/SeatSelection";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route
          path="/movie/:movieId/select-theater"
          element={<SelectTheaterAndShowtime />}
        />
       {/* <Route path="/seat-layout/:showtimeId" element={<SeatSelection/>} /> */}
       <Route path="/select-seat/:showtimeId" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket/:bookingId" element={<Ticket />} />
        <Route
          path="/booking-confirmation/:bookingId"
          element={<BookingConfirmation />}
        />
      </Routes>
    </div>
  );
}

export default App;
