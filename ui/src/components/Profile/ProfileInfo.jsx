import React from 'react';
import { useSelector } from 'react-redux';

import {
	Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Img } from './StyledComponents';

const ProfileInfo = () => {
	const {
		userLogin: { userInfo },
	} = useSelector(state => state);

	return (
		<Card style={{ width: '15rem' }}>
			<Img variant="top" src={userInfo.avatar || '/images/not-found.jpg'} />
			<Card.Body>
				<Card.Title>{userInfo.name} {userInfo.lastName}</Card.Title>
				{userInfo.isInstructor &&
					<Card.Text>Instructor</Card.Text> &&
					<Link to='/courses/add/' >
						Nuevo Curso
					</Link>
				}
			</Card.Body>
		</Card>
	);
};

export default ProfileInfo;
