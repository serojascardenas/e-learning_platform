import {
	Card,
	Container,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
} from 'react-bootstrap';

import Mision from '../../assets/images/mision.png';
import Vision from '../../assets/images/vision.png';

const AboutUs = () => {
	return (
		<Container>
			<Row>
				<Col>
					<Card bg="light" style={{ width: '25rem', height: '30rem' }}>
						<Card.Img variant="top" src={Vision} />
						<Card.Body>
							<Card.Text style={{ textAlign: 'justify' }}>
								SER LA MANO DERECHA DEL EMPRESARIO EN EL NEA
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card style={{ width: '25rem', height: '30rem' }}>
						<Card.Img variant="top" src={Mision} />
						<Card.Body>
							<Card.Text style={{ textAlign: 'justify' }}>
								<ListGroup className="list-group-flush">
									<ListGroupItem>
										Brindar Servicios profesionales de comunicación promoción
										comercial y ventas/ListGroupItem
									</ListGroupItem>
									<ListGroupItem>
										Satisfacer al Cliente de tal manera que nos elijan día a día{' '}
									</ListGroupItem>
									<ListGroupItem>
										Recordar que la lealtad es la falta de algo MEJOR
									</ListGroupItem>
								</ListGroup>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default AboutUs;
