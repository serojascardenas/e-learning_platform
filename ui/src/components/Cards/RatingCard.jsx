import { Card } from 'react-bootstrap';
import { averageRating } from '../../utils/utilities';
import Rating from '../Rating';
import { DetailCourseScore } from './StyledComponents';

const RatingCard = ({ reviews }) => {
	return (
		<Card className="h-100">
			<DetailCourseScore>
				<Rating value={averageRating(reviews)} />
			</DetailCourseScore>
		</Card>
	);
};
export default RatingCard;
