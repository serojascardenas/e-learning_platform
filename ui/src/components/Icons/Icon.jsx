import React from 'react';

const variants = {
	hours: { icon: 'far fa-clock', color: '#0D9F9A' },
	articles: { icon: 'far fa-newspaper', color: '#0D9F9A' },
	practiceTests: { icon: 'fas fa-vials', color: '#0D9F9A' },
	lifetimeAccess: { icon: 'fas fa-infinity', color: '#0D9F9A' },
	hasCertificate: { icon: 'fas fa-infinity', color: '#0D9F9A' },
};

const Icon = ({ variant, text }) => (
	<p>
		<span style={{ paddingLeft: '0.5rem' }}>
			<i
				style={{ color: variants[variant].color, paddingLeft: '0.25rem' }}
				className={variants[variant].icon}
			></i>
		</span>
		<span style={{ paddingLeft: '0.5rem' }}>{text}</span>
	</p>
);
export default Icon;
