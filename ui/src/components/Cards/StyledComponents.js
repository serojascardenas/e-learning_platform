import styled from 'styled-components/macro';

const Card = styled.div`
	margin: 20px;
	display: flex;
	align-items: left;
	flex-direction: column;
	width: 20rem;
	height: 20rem;
	background-color: ${({ theme }) => theme.colors.whiteGray};
	justify-content: space-between;
	border-radius: 10px 10px 10px 10px;

`;

const CardSnapshot = styled.div`
	max-width: 100%;
	height: 60%
`;

const Snapshot = styled.img`
	margin: 1px;
	max-width: 100%;
	min-width: 100%;
	max-height: 100%;
	min-height: 100%;
	border-radius: 10px 10px 0px 0px;
`;

const CardDetail = styled.div`
	margin-top: 1rem;
	padding: 0 2rem;
	width: 100%;
	height: 40%
`;

const DetailCourseTittle = styled.div`
	width: 100%;
	height: 20%;
	color: ${({ theme }) => theme.colors.primary};
	font-size: 18px;
	font-weight: 900;
`;

const DetailCourseInstructor = styled.div`
	width: 100%;
	height: 20%;
	color: ${({ theme }) => theme.colors.black};
	font-size: 14px;
`;

const DetailCourseScore = styled.div`
	width: 100%;
	height: 20%;
	color: ${({ theme }) => theme.colors.wine};
	font-size: 18px;
	font-weight: 800;
	display: flex;
	flex-direction: row;
`;

const DetailPriceAndButtons = styled.div`
	width: 100%;
	height: 20%;
	color: ${({ theme }) => theme.colors.black};
	display: flex;
	flex-direction: row;
`;

const DetailPrice = styled.div`
	width: 50%;
	height: 100%;
	font-size: 24px;
	font-weight: 800;


`;

const DetailButtons= styled.div`
	width: 50%;
	height: 100%;
	justify-content: space-around;
	text-align: center;
	display: flex;
	flex-direction: row;
`;

const Icon= styled.div`
	margin-left: 2px;
`;

const StarsIcon= styled.div`
	padding-left: 0.5rem;
`;

const CourseCardWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;
export {
	Card,
	CardSnapshot,
	Snapshot,
	CardDetail,
	DetailCourseInstructor,
	DetailCourseTittle,
	DetailCourseScore,
	DetailPriceAndButtons,
	DetailPrice,
	DetailButtons, 
	Icon,
	StarsIcon,
	CourseCardWrapper
};