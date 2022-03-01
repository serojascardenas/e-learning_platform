import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { Wrapper, FooterContainer, List, ListItem } from './StyledComponents';

const Footer = () => (
	<Wrapper>
		<FooterContainer fluid>
			<Row>
				<Col md={6}>
					<List>
						<ListItem>
							<i className={'fa fa-map'} style={{ paddingRight: '0.8em' }}></i>{' '}
							Padre Patiño 474 - Formosa Argentina.
						</ListItem>
						<ListItem>
							<i
								className={'fa fa-phone'}
								style={{ paddingRight: '0.8em' }}
							></i>{' '}
							Tel. +54/370-4423827/4426178
						</ListItem>
					</List>
				</Col>

				<hr className="clearfix w-100 d-md-none pb-0" />

				<Col md={6}>
					<List>
						<ListItem>
							<i
								className={'fa fa-globe'}
								style={{ paddingRight: '0.8em' }}
							></i>{' '}
							www.lamanoderecha.com.ar
						</ListItem>
						<ListItem>
							<i
								className={'fa fa-envelope'}
								style={{ paddingRight: '0.8em' }}
							></i>{' '}
							lml@lamanoderecha.com.ar
						</ListItem>
					</List>
				</Col>
			</Row>
		</FooterContainer>

		<div className="footer-copyright text-center my-1">
			© 2022 Copyright:
			<a href="https://mdbootstrap.com/"> THREEPOINTS | The Digital Business School</a>
		</div>
	</Wrapper>
);

export default Footer;
