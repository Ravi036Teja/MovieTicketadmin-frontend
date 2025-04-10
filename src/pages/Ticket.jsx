import { useParams } from "react-router-dom";

const Ticket = () => {
  const { bookingId } = useParams();
  return <div className="p-4">Your Ticket Booking ID: {bookingId}</div>;
};
export default Ticket;
