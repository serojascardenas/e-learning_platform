import styled from 'styled-components/macro';

import { Card as BaseCard } from 'react-bootstrap';
import { getMediaMinWidth } from '../../utils';

const Card = styled(BaseCard)`
	position: relative;
	height: 11.5rem;
	display: flex;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colors.whiteGray};
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	border-radius: 10px 10px 10px 10px;
	margin-bottom: 1.5rem;

	${getMediaMinWidth('sm')} {
		height: 13rem;
	}

	${getMediaMinWidth('md')} {
		height: 12rem;
	}
`;

const Img = styled.img`
	height: 100%;
	min-width: 25%;
	max-width: 30%;
`;

const CardDetail = styled.div`
	padding: 0 2rem;
	width: 100%;
	height: 100%;
`;

const CardFilterDetail = styled.div`
	padding: 0.5rem 1rem;
	width: 100%;
	height: 100%;
`;

const DetailCourseTittle = styled(Card.Text)`
	width: 100%;
	display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
	height: 24%;
	font-size: 14px;
	font-weight: 900;
`;

const DetailCourseInstructor = styled(Card.Text)`
	width: 100%;
	height: 20%;
	margin-top: 1rem;
	display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
	color: ${({ theme }) => theme.colors.black};
	font-size: 14px;
`;

const DetailCourseScore = styled.div`
	height: 20%;
	width: 100%;
`;

const DetailPriceAndButtons = styled(Card.Text)`
	width: 10rem;
	height: 20%;
	display: flex;
	flex-direction: row;
`;

const DetailPrice = styled.div`
	position: absolute;
	width: 50%;
	height: 100%;
	font-size: 16px;
	font-weight: 800;
	color: ${({ theme }) => theme.colors.black};
`;

const DetailButtons = styled.div`
	position: absolute;
	right: 1rem;
	height: 100%;
	text-align: right;
	display: flex;
	flex-direction: row;
`;

const Icon = styled.div`
	width: 100%;
	height: 100%;
	padding: 0.2rem;
	color: ${({ theme }) => theme.colors.turquoise};
`;

const CourseCardWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;
export {
	Card,
	Img,
	CardDetail,
	CardFilterDetail,
	DetailCourseInstructor,
	DetailCourseTittle,
	DetailCourseScore,
	DetailPriceAndButtons,
	DetailPrice,
	DetailButtons,
	Icon,
	CourseCardWrapper,
};
