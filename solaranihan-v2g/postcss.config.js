// Using ES modules format since package.json has "type": "module"
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
	plugins: [
		tailwindcss(),
		autoprefixer()
	]
};
