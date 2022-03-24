import React, { useState } from 'react';
import {
	Row,
	Col,
	Form,
	Container,
} from 'react-bootstrap';

import {
	Icon,
} from './StyledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ContentInput = ({
    contentChaptersList, 
    setIpuntContentChapters,
}) => {
    
    const handleSectionDescriptionChange = async (e, chapterPosition, sectionPosition) => {
		contentChaptersList[chapterPosition].items[sectionPosition].name = e.target.value;
		setIpuntContentChapters([...contentChaptersList]);
	};

	const removeSectionClick = async (chapterPosition, sectionPosition) => {
		contentChaptersList[chapterPosition].items.pop(sectionPosition);
		setIpuntContentChapters([...contentChaptersList]);
	};

	const addSectionClick = async chapterPosition => {
		contentChaptersList[chapterPosition].items.push({ name: '', order: 0 });
		setIpuntContentChapters([...contentChaptersList]);
	};

	const handleChapterTitleChange = async (e, chapterPosition) => {
		contentChaptersList[chapterPosition].title = e.target.value;
		setIpuntContentChapters([...contentChaptersList]);
	};

	const removeChapterClick = async chapterPosition => {
		contentChaptersList.pop(chapterPosition);
		setIpuntContentChapters([...contentChaptersList]);
	};

	const addChapterClick = async () => {
		contentChaptersList.push({ title: '', order: 0, items: [{ name: '', order: 0 }] });
		setIpuntContentChapters([...contentChaptersList]);
	};
	return (
		<div>
			{contentChaptersList.map((chapter, chapterPosition) => (
				<><Row className='mb-1' key={chapterPosition}>
					<Col sm md lg={9}>
						<Form.Control
							value={chapter.title}
                            placeholder='Ingresa el título del capitulo'
							onChange={e => handleChapterTitleChange(e, chapterPosition)} />
					</Col>
					<Col>
						{contentChaptersList.length !== 1 &&
                            <Icon onClick={() => removeChapterClick(chapterPosition)}><FontAwesomeIcon icon={faMinusCircle} />
                            </Icon>
						}
					</Col>
					<Col>
						{contentChaptersList.length - 1 === chapterPosition &&
                            <Icon onClick={() => addChapterClick()}><FontAwesomeIcon icon={faPlusCircle} />
                            </Icon>
						}
					</Col>
				</Row><Container>
					{chapter.items.map((section, sectionPosition) => (
						<Row className='mb-1 d-flex justify-content-between' key={sectionPosition}>
							<Col sm md lg={9}>
								<Form.Control
									value={section.name}
                                    placeholder='Descriccíon de la sección'
									onChange={e => handleSectionDescriptionChange(e, chapterPosition, sectionPosition)} />
							</Col>
							<Col>
								{chapter.items.length !== 1 &&
                                        <Icon onClick={() => removeSectionClick(chapterPosition, sectionPosition)}><FontAwesomeIcon icon={faMinusCircle} />
                                        </Icon>}
							</Col>
							<Col>
								{chapter.items.length - 1 === sectionPosition &&
                                        <Icon onClick={() => addSectionClick(chapterPosition)}><FontAwesomeIcon icon={faPlusCircle} />
                                        </Icon>}
							</Col>
						</Row>
					))}
				</Container></>
			))}
		</div>
	);
};

export default ContentInput;