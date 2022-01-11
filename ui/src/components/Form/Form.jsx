import React from 'react';

import {
	Container,
	Error,
	Base,
	Row,
	Title,
	Text,
	TextSmall,
	Link,
	Input,
	Submit,
	Bottom,
} from './StyledComponents';

const Form = ({ 
	className,
	children,
	...rest
}) => (
	<Container 
		className={className}
		{...rest}	
	>
		{children}
	</Container>
);

Form.Error = function FormError({ children, ...rest }) {
	return <Error {...rest}>{children}</Error>;
};

Form.Title = function FormTitle({ children, ...rest }) {
	return <Title {...rest}>{children}</Title>;
};

Form.Base = function FormBase({ children, ...rest }) {
	return <Base {...rest}>{children}</Base>;
};

Form.Text = function FormText({ children, ...rest }) {
	return <Text {...rest}>{children}</Text>;
};

Form.TextSmall = function FormTextSmall({ children, ...rest }) {
	return <TextSmall {...rest}>{children}</TextSmall>;
};

Form.Link = function FormLink({ children, ...rest }) {
	return <Link {...rest}>{children}</Link>;
};

Form.Input = function FormInput({ children, ...rest }) {
	return <Input {...rest}>{children}</Input>;
};

Form.Bottom = function FormBottom({ children, ...rest }) {
	return <Bottom {...rest}>{children}</Bottom>;
};

Form.Submit = function FormSubmit({ children, ...rest }) {
	return <Submit {...rest}>{children}</Submit>;
};

Form.Row = function FormRow({ children, ...rest }) {
	return <Row {...rest}>{children}</Row>;
};

export default Form;
