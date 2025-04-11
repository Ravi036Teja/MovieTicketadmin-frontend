import { useParams } from 'react-router-dom';
import SeatSelection from './SeatSelection';

const SeatSelectionWrapper = () => {
  const { showtimeId } = useParams();
  return <SeatSelection showtimeId={showtimeId} />;
};

export default SeatSelectionWrapper;
