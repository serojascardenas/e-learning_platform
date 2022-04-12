import {
	faEdit,
	faPen,
	faPlusCircle,
	faTrash,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';
import { EDIT_ITEM, REMOVE_ITEM } from '../../constants/section';
import { Icon, IconTools } from './StyledComponent';

const CustomAccordionItem = props => {
	const { item, sectionId, mantainItem, mode } = props;
	const editItem = () => {
		mantainItem(item, sectionId, EDIT_ITEM);
	};
	const deleteItem = () => {
		mantainItem(item, sectionId, REMOVE_ITEM);
	};

	return (
		<Container>
			<Row id={item.id}>
				<Col xs={9} md={9}>
					<h5>{item.name}</h5>
				</Col>
				{mode === 1 ? (
					<Col xs={3} md={3}>
						<IconTools>
							<Icon onClick={editItem}>
								<FontAwesomeIcon icon={faPen} />
							</Icon>
							<Icon onClick={deleteItem}>
								<FontAwesomeIcon icon={faTrash} />
							</Icon>
						</IconTools>
					</Col>
				) : (
					<></>
				)}
			</Row>
		</Container>
	);
};

export default CustomAccordionItem;
