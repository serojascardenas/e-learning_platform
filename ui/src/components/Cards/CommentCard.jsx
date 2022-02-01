import { Card, Col, Row, Container } from 'react-bootstrap';
import Icon from '../Icons/index';
import styled from 'styled-components';
import Rating from '../Rating';
import { formatDate } from '../../utils';

const StyleCommentCard = styled(Card)`
	padding: 0.8rem;
	width: 100%;
`;

const CommentCard = review => {
	return (
		<div>
			<StyleCommentCard>
				<Container style={{ verticalAlign: 'middle' }}>
					<Row xs={1} md={1} className="g-4">
						<Col
							xs={2}
							md={2}
							style={{ paddingTop: '0.3rem', textAlign: 'center' }}
						>
							<Icon variant="avatar" text="" size="50px" />
						</Col>
						<Col
							xs={5}
							md={5}
							style={{
								paddingTop: '1rem',
								fontWeight: 'bold',
								fontSize: '18px',
							}}
						>
							{review.userName}
						</Col>
						<Col
							xs={5}
							md={5}
							style={{ paddingTop: '1rem', textAlign: 'right' }}
						>
							{formatDate(review.createdAt)}
						</Col>
					</Row>

					<Row>
						<Col xs={2} md={2} style={{ textAlign: 'center' }}>
							<Rating value={review.rating} fontSize="0.9rem" />
						</Col>
						<Col xs={10} md={10}>
							{review.comment}
						</Col>
					</Row>
				</Container>
			</StyleCommentCard>
		</div>
	);
};

export default CommentCard;
