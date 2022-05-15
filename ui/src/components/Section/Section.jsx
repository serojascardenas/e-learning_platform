import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Accordion } from 'react-accessible-accordion';
import AccordionCard from '../Cards/AccordionCard';
import { isEmptyArray } from '../../utils';
import { Button } from '../Foundation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SectionModal from './SectionModal';
import ItemModal from './ItemModal';
import {
	EDIT_SECTION,
	CREATE_SECTION,
	UPDATE_SECTION,
	REMOVE_SECTION,
	CREATE_ITEM,
	EDIT_ITEM,
	REMOVE_ITEM,
	UPDATE_ITEM,
	CANCEL_SECTION,
	CANCEL_ITEM,
} from '../../constants/section';

const Section = props => {
	const { sections, setSections, disable } = props;

	const [section, setSection] = useState({});
	const [item, setItem] = useState({});
	const [showSectionModal, setShowSectionModal] = useState(false);
	const [showItemModal, setShowItemModal] = useState(false);
	const [sectionId, setSectionId] = useState(0);

	const handleSectionModal = () => {
		setShowSectionModal(true);
		setSection({ id: 0, title: '', order: sections.length });
	};

	const mantainSection = (section, operation) => {
		let tmpSections = [...sections];

		switch (operation) {
		case CREATE_SECTION: {
			tmpSections.push(section);
			setSections(tmpSections);
			setShowSectionModal(false);
			break;
		}
		case UPDATE_SECTION: {
			const sectionIdx = tmpSections.findIndex(obj => obj.id === section.id);
			if (sectionIdx > -1) {
				tmpSections[sectionIdx] = section;
			}
			setSections(tmpSections);
			setShowSectionModal(false);
			break;
		}
		case EDIT_SECTION: {
			setShowSectionModal(true);
			setSection(section);
			break;
		}
		case REMOVE_SECTION: {
			const index = sections.findIndex(obj => obj.id === section.id);
			if (index > -1) {
				tmpSections.splice(index, 1); // 2nd parameter means remove one item only
			}
			setSections(tmpSections);
			break;
		}
		case CANCEL_SECTION: {
			setShowSectionModal(false);
			break;
		}
		default:
			break;
		}
	};

	const mantainItem = (item, sectionId, operation) => {
		let tmpSections = [...sections];
		const sectionIdx = tmpSections.findIndex(obj => obj.id === sectionId);
		let items =
			tmpSections[sectionIdx].items === undefined
				? []
				: tmpSections[sectionIdx].items;

		switch (operation) {
		case CREATE_ITEM: {
			items.push(item);
			tmpSections[sectionIdx].items = items;
			setSections(tmpSections);
			setShowItemModal(false);
			break;
		}
		case UPDATE_ITEM: {
			const itemIdx = items.findIndex(obj => obj.id === item.id);
			if (itemIdx > -1) {
				tmpSections[sectionIdx].items[itemIdx] = item;
			}
			setSections(tmpSections);
			setShowItemModal(false);
			break;
		}
		case EDIT_ITEM: {
			setItem(item);
			setSectionId(sectionId);
			setShowItemModal(true);
			break;
		}
		case REMOVE_ITEM: {
			const index = items.findIndex(obj => obj.id === item.id);
			if (index > -1) {
				items.splice(index, 1); // 2nd parameter means remove one item only
				tmpSections[sectionIdx].items = items;
			}
			setSections(tmpSections);
			break;
		}
		case CANCEL_ITEM: {
			setShowItemModal(false);
			break;
		}
		default:
			break;
		}
	};

	return (
		<Container>
			{showSectionModal ? (
				<SectionModal
					section={section}
					show={showSectionModal}
					mantainSection={mantainSection}
				/>
			) : (
				<></>
			)}
			{showItemModal ? (
				<ItemModal
					item={item}
					show={showItemModal}
					sectionId={sectionId}
					mantainItem={mantainItem}
				/>
			) : (
				<></>
			)}
			<Row>
				<br />
			</Row>
			<Row>
				<Col></Col>
				<Col>
					<Button variant="secondary" onClick={handleSectionModal} disabled={disable}>
						<FontAwesomeIcon icon={faPlusCircle} /> Añadir Secciones
					</Button>
				</Col>
				<Col></Col>
			</Row>
			<Row>
				<br />
			</Row>
			<Row>
				<Col xs={12} md={12}>
					<Accordion>
						{!isEmptyArray(sections) &&
							sections.map((sect, i) => (
								<AccordionCard
									key={sect.id}
									section={sect}
									mantainSection={mantainSection}
									mantainItem={mantainItem}
									mode={1}
								></AccordionCard>
							))}
					</Accordion>
				</Col>
			</Row>
		</Container>
	);
};
export default Section;
