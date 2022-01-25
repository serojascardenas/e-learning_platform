import React from 'react';

import {
	Label,
	StyledSwitch,
	Knob,
	SwitchInput,
	Content,
} from './StyledComponents';

const Switch = ({
	handleChange,
	isChecked,
	children,
	...rest
}) => {
	return (
		<Label>
			<SwitchInput 
				onChange={handleChange}
				checked={isChecked}
				type="checkbox"
				{...rest}
			/>
			<StyledSwitch>
				<Knob 
					iChecked={isChecked}/>
			</StyledSwitch>
			<Content>{children}</Content>
		</Label>
	);
};

export default Switch;
