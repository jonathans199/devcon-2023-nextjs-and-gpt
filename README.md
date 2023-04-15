
## Set up Next.js project

```bash
# create Next.js app to be used with Typescript and Eslint template
$ npx create-next-app@latest PROJECT-NAME --typescript --eslint

$ cd PROJECT-NAME

# install tailwind, postcss, autoprefixer
$ npm install -D tailwindcss postcss autoprefixer

# Initialize tailwind
$ npx tailwindcss init -p
```

## Configure Tailwind with Next js project

```javascript
// in tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
}
```

## add Tailwind directive to CSS

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Reference [here](https://tailwindcss.com/docs/guides/nextjs)
