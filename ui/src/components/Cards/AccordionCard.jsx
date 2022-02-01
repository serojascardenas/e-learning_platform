import {
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { isEmptyArray } from '../../utils';

const StyledAccordionItemHeading = styled(AccordionItemHeading)`
	background-color: rgba(0, 0, 0, 0.03);
	padding: 0.75rem 1.25rem;
	border: 1px solid rgba(0, 0, 0, 0.125);
`;

const StyledPanel = styled.p`
	padding: 0.75rem 1.25rem;
`;

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
