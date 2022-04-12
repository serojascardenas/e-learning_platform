import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import {
	CANCEL_SECTION,
	CREATE_SECTION,
	UPDATE_SECTION,
} from '../../constants/section';

const SectionModal = (props) => {
	const { key, section, show, mantainSection } = props;
	const [idAux, setIdAux] = useState(section ? section.id : 0);
	const [titleAux, setTitleAux] = useState(section ? section.title : '');
	const [orderAux, setOrderAux] = useState(section ? section.order : 0);
	const [items, setItems] = useState(section ? section.items :[]);


 
	const cleanFields = () => {
		setIdAux(0);
		setTitleAux('');
		setOrderAux(0);
	};

	const submitHandler = e => {
		e.preventDefault();
		if (idAux === null || idAux === 0) {
			mantainSection(
				{ id: uuidv4(), title: titleAux, order: orderAux, items },
				CREATE_SECTION
			);
		} else {
			mantainSection(
				{ id: idAux, title: titleAux, order: orderAux, items },
				UPDATE_SECTION
			);
		}
	};

	const handleClose = () => {
		mantainSection({}, CANCEL_SECTION);
	};

	return (
		<Modal show={show} onHide={handleClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>Seccion</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3">
						<Form.Control
							type="text"
							value={titleAux}
							placeholder="Título"
							required
							onChange={({ target }) => setTitleAux(target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Control
							type="number"
							value={orderAux}
							placeholder="Orden"
							onChange={({ target }) => setOrderAux(target.value)}
							disabled
						/>
					</Form.Group>
					<Row>
						<Col xs={6} md={6}>
							<Button
								size="md"
								className="w-100 mt-3"
								type="submit"
								variant="secondary"
								onClick={handleClose}
							>
								Cancelar
							</Button>
						</Col>
						<Col xs={6} md={6}>
							<Button
								size="md"
								className="w-100 mt-3"
								type="submit"
								variant="primary"
							>
								Guardar
							</Button>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default SectionModal;
