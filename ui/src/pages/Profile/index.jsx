import React from 'react';

import styled from 'styled-components';
import {
	Container as BaseContainer,
	Col,
	Row,
} from 'react-bootstrap';

import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileDetail from '../../components/Profile/ProfileDetail';

const Container = styled(BaseContainer)`
	width: 100%;
	height: 100%;
	padding: 4rem;
`;

const Profile = ({
	history,
}) => {

	return (
		<Container fluid>
			<Row>
				<Col md={12} xs={12} lg={3} className="my-4">
					<ProfileInfo />
				</Col>
				<Col md={12} xs={12} lg={9} className="my-4">
					<ProfileDetail history={history}/>
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;
