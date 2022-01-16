import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

const formatDecimal = (value) => {
	return (Math.round(value * 100) / 100).toFixed(2);
};
const formatPrice = (value) => {
	return `$ ${formatDecimal(value)}`;
};

const addStarsToScore = (value) => {
	console.log(`value: ${value}`);
	let stars = 1;
	let halfStar = 0;
	let icons = [];
	const maxStars = 5;

	if (value % 1 === 0) {
		stars = value;
	} else {
		stars = value - (value % 1);
		halfStar = 1;
	}

	for (let i = 1; i <= stars; i++) {
		icons.push(<FontAwesomeIcon icon={faStar} />);
	}

	if (halfStar > 0) {
		icons.push(<FontAwesomeIcon icon={faStarHalf} />);
	}

	let diffStars = Math.round(maxStars - value);
	console.log(`diffStars ${diffStars}`);
	if (diffStars > 0) {
		for (let i = 0; i < diffStars; i++) {
			icons.push(<FontAwesomeIcon icon={faRegularStar} />);
		}
	}

	return icons;
};

const concatInstructors = (instructors) => {
	let instructorsStr = '';
	instructors.map((instructor) => {
		instructorsStr = `${instructor.name},`;
	});
	return instructorsStr.substring(0, instructorsStr.length - 2);
};

const averageRating = (reviews) => {
	let rating = 0;
	reviews.map((review) => {
		rating += review.rating;
	});
	return rating / (reviews.length === 0 ? 1 : reviews.length);
};

export {
	formatDecimal,
	formatPrice,
	addStarsToScore,
	concatInstructors,
	averageRating,
};
