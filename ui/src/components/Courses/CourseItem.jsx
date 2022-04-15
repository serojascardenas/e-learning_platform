import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, ListGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { H2, Button } from '../../components/Foundation';

import {
	Icon,
} from './StyledComponents';

import {
	removeCourse,
	getMyCreatedCourses,
} from '../../actions';

import { COURSE_UPDATE_RESET } from '../../constants';

const CourseItem = ({
	key,
	course,
}) => {
	const history = useHistory();

	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const openModal = () => {
		setShowModal(true);
	};

	const confirmRemove = courseId => {
		dispatch(removeCourse(courseId));
		dispatch(getMyCreatedCourses());
		setShowModal(false);
	};

	const editCourse = () => {
		dispatch({ type: COURSE_UPDATE_RESET });
		history.push(`/update-course/${course.id}`);

	};
	return (
		<div>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header>
					<Modal.Title>Remover curso</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Estas seguro que deseas remover este curso ?
					<H2>{course.title}</H2>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={() => confirmRemove(course.id)}>
						Si
					</Button>
				</Modal.Footer>
			</Modal>
			<ListGroup.Item key={key}>
				<Row>
					<Col>{course.title}</Col>
					<Col md={1}>
						<Icon onClick={() => editCourse(course)}>
							<FontAwesomeIcon icon={faPenSquare} />	
						</Icon></Col>
					<Col md={1}>
						<Icon onClick={() => openModal(course)} >
							<FontAwesomeIcon icon={faTrash} />	
						</Icon></Col>
				</Row>
			</ListGroup.Item>
		</div>
	);
};

export default CourseItem;