import {
	AccordionItem,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import { ListGroup } from 'react-bootstrap';
import { isEmptyArray } from '../../utils';
import CustomAccordionItem from '../Section/CustomAccordionItem';
import CustomAccordionSection from '../Section/CustomAccordionSection';
import { StyledAccordionItemHeading, StyledPanel } from './StyledComponents';

const AccordionCard = props => {
	const { section, mantainSection, mantainItem, mode } = props;
	return (
		<AccordionItem>
			<StyledAccordionItemHeading>
				<AccordionItemButton>
					<CustomAccordionSection
						section={section}
						mantainSection={mantainSection}
						mantainItem={mantainItem}
						mode={mode}
					/>
				</AccordionItemButton>
			</StyledAccordionItemHeading>
			<AccordionItemPanel>
				<StyledPanel>
					<ListGroup variant="flush">
						{section.items || !isEmptyArray(section.items) ? (
							section.items.map((item, j) => (
								<ListGroup.Item key={j}>
									<CustomAccordionItem
										item={item}
										sectionId={section.id}
										mantainItem={mantainItem}
										mode={mode}
									/>
								</ListGroup.Item>
							))
						) : (
							<></>
						)}
					</ListGroup>
				</StyledPanel>
			</AccordionItemPanel>
		</AccordionItem>
	);
};

export default AccordionCard;
