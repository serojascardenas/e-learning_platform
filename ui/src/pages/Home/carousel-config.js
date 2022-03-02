export const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 2560 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 2560, min: 1024 },
		items: 4,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 550 },
		items: 3,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 550, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

