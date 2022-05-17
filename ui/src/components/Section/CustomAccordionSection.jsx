import {
	faEdit,
	faPen,
	faPlusCircle,
	faTrash,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';
import {
	EDIT_ITEM,
	EDIT_SECTION,
	REMOVE_SECTION,
} from '../../constants/section';
import { Icon, IconTools } from './StyledComponent';

const CustomAccordionSection = props => {
	const { section, mantainSection, mantainItem, mode } = props;
	const editSection = () => {
		mantainSection(section, EDIT_SECTION);
	};
	const deleteSection = () => {
		mantainSection(section, REMOVE_SECTION);
	};
	const addItem = () => {
		mantainItem(
			{
				id: 0,
				name: '',
				video: '',
				order:
					section.items === null || section.items === undefined
						? 0
						: section.items.length,
			},
			section.id,
			EDIT_ITEM
		);
	};

	return (
		<Container>
			<Row id={section.id}>
				<Col xs={9} md={9}>
					{mode === 1 ? <h5>{section.title}</h5> : <h2>{section.title}</h2>}
				</Col>
				{mode === 1 ? (
					<Col xs={3} md={3}>
						<IconTools>
							<Icon onClick={addItem}>
								<FontAwesomeIcon icon={faPlusCircle} />
							</Icon>
							<Icon onClick={editSection}>
								<FontAwesomeIcon icon={faPen} />
							</Icon>
							<Icon onClick={deleteSection}>
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

export default CustomAccordionSection;
