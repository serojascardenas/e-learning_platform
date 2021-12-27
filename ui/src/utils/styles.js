import { isNumber } from './core';

const breakpoints = {
	xsm: 480,
	sm: 768,
	md: 1024,
	lg: 1300,
};

const toPixel = value => (isNumber(value) ? `${value}px` : value);
const mediaMinWidth = size => `@media only screen and (min-width: ${toPixel(size)})`;

const getMediaMinWidth = size => mediaMinWidth((breakpoints && breakpoints[size]) || size);

export {
	toPixel,
	mediaMinWidth,
	getMediaMinWidth,
};