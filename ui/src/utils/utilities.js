import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { isEmptyArray } from '.';
import get from 'lodash/get';

const formatDecimal = value => {
	return (Math.round(value * 100) / 100).toFixed(2);
};
const formatPrice = value => {
	return `€ ${formatDecimal(value)}`;
};

const addStarsToScore = value => {
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
	if (diffStars > 0) {
		for (let i = 0; i < diffStars; i++) {
			icons.push(<FontAwesomeIcon icon={faRegularStar} />);
		}
	}

	return icons;
};

const concatInstructors = instructors => {
	if (isEmptyArray(instructors)) return '';

	const instructorsStr = instructors.reduce(
		(acc, instructor) => acc + `${instructor.name}, `, '');
	return instructorsStr.substring(0, instructorsStr.length - 2);
};

const averageRating = reviews => {
	if (isEmptyArray(reviews)) return 0;
	const rating = reviews.reduce((acc, review) => (acc += review.rating), 0);
	return rating / (reviews.length === 0 ? 1 : reviews.length);
};

const formatString = (values, property) => {
	if (isEmptyArray(values)) return '';
	const concatString = values.reduce((acc, value) => (acc += `${get(value, property)}, `), '');
	return concatString.substring(0, concatString.length - 2);
};

const formatDate = value => {
	const date = new Date(value);
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return date.toLocaleString('es-ES', options);
};

export {
	formatDecimal,
	formatPrice,
	addStarsToScore,
	concatInstructors,
	averageRating,
	formatDate,
	formatString,
};
