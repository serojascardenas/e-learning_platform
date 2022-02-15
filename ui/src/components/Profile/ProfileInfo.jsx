import React from 'react';
import { useSelector } from 'react-redux';

import {
	Container,
	Card,
} from 'react-bootstrap';

const ProfileInfo = () => {
	const { 
		userLogin: {
			userInfo,
		}, 
	} = useSelector(state => state);

	return (
		<Container fluid>
			<Card style={{ width: '12rem' }}>
				<Card.Img variant="top" src="https://picsum.photos/id/237/200/300" />
				<Card.Body>
					<Card.Title>{userInfo.name}</Card.Title>
					<Card.Text>Instructor</Card.Text>
				</Card.Body>
			</Card>
		</Container>
);};

export default ProfileInfo;
