import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { CANCEL_ITEM, CREATE_ITEM, UPDATE_ITEM } from '../../constants/section';

const ItemModal = props => {
	const { item, show, sectionId, mantainItem } = props;
	const [idAux, setIdAux] = useState(item ? item.id : 0);
	const [nameAux, setNameAux] = useState(item ? item.name : '');
	// const [videoAux, setVideoAux] = useState(item ? item.video : '');
	const [orderAux, setOrderAux] = useState(item ? item.order : 0);

	const cleanFields = () => {
		setIdAux(0);
		setNameAux('');
		// setVideoAux(null);
		setOrderAux(0);
	};

	const submitHandler = e => {
		e.preventDefault();
		if (idAux === null || idAux === 0) {
			mantainItem(
				{ id: uuidv4(), name: nameAux, order: orderAux },
				sectionId,
				CREATE_ITEM,
			);
		} else {
			mantainItem(
				{ id: idAux, name: nameAux, order: orderAux },
				sectionId,
				UPDATE_ITEM,
			);
		}
	};

	const handleClose = () => {
		mantainItem({}, sectionId, CANCEL_ITEM);
	};

	return (
		<Modal show={show} onHide={handleClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>Item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3">
						<Form.Control
							type="text"
							value={nameAux}
							placeholder="Título"
							required
							onChange={({ target }) => setNameAux(target.value)}
						/>
					</Form.Group>
					{/* <Form.Group className="mb-3">
						<Form.Control
							type='file'
							onChange={({ target }) => setVideoAux(target.files)}
						/>
					</Form.Group> */}
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

export default ItemModal;
