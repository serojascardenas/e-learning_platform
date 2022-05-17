import React from 'react';

const variants = {
	hours: { icon: 'far fa-clock', color: '#0D9F9A' },
	articles: { icon: 'far fa-newspaper', color: '#0D9F9A' },
	practiceTests: { icon: 'fas fa-vials', color: '#0D9F9A' },
	lifetimeAccess: { icon: 'fas fa-infinity', color: '#0D9F9A' },
	hasCertificate: { icon: 'fas fa-graduation-cap', color: '#0D9F9A' },
	avatar: { icon: 'fas fa-user-circle', color: '#0D9F9A' },
	delete: { icon: 'fas fa-pen-to-square', color: '#0D9F9A' },
	edit: { icon: 'fas fa-trash', color: '#0D9F9A' },
};

const Icon = ({ variant, text, size = '18px' }) => (
	<p>
		<span style={{ paddingLeft: '0.5rem' }}>
			<i
				style={{ color: variants[variant].color, paddingLeft: '0.25rem', fontSize: size }}
				className={variants[variant].icon}
			></i>
		</span>
		<span style={{ paddingLeft: '0.5rem' }}>{text}</span>
	</p>
);
export default Icon;
