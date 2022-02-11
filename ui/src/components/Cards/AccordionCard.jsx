import {
	AccordionItem,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import { ListGroup } from 'react-bootstrap';
import { isEmptyArray } from '../../utils';
import { StyledAccordionItemHeading, StyledPanel } from './StyledComponents';

const AccordionCard = section => {
	return (
		<AccordionItem>
			<StyledAccordionItemHeading>
				<AccordionItemButton>
					<h3>{section.title}</h3>
				</AccordionItemButton>
			</StyledAccordionItemHeading>
			<AccordionItemPanel>
				<StyledPanel>
					<ListGroup variant="flush">
						{section.items || !isEmptyArray(section.items) ? (
							section.items.map((item, j) => (
								<ListGroup.Item key={j}>{item.name}</ListGroup.Item>
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
