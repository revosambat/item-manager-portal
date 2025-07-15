# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			// Other configs...

			// Remove tseslint.configs.recommended and replace with this
			...tseslint.configs.recommendedTypeChecked,
			// Alternatively, use this for stricter rules
			...tseslint.configs.strictTypeChecked,
			// Optionally, add this for stylistic rules
			...tseslint.configs.stylisticTypeChecked,

			// Other configs...
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x"
import reactDom from "eslint-plugin-react-dom"

export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			// Other configs...
			// Enable lint rules for React
			reactX.configs["recommended-typescript"],
			// Enable lint rules for React DOM
			reactDom.configs.recommended,
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
])
```

# Overview

Installed using vite, as 'vite' is build tool that improves the dev server start time by first dividing the modules in an application into two categories: dependencies and source code. Also, 'create-vite' is a tool to quickly start a project from a basic template for popular frameworks. Much faster than Webpack in local development.

Typescript for type-related bugs at compile time. It helps to reduce the compile time and improves the code quality.

Tailwindcss used for styling and reason for using tailwindcss is it gives low-level utility classes (e.g., p-4, bg-blue-500, flex, text-center) to compose design directly in markup. This is faster than creating separate CSS files or styled components for simple styles. Also, Mobile-first responsive classes like sm:, md:, lg: make it effortless to build responsive UIs.

# How setup and installation carried on?

First Node -v v23.11.0(latest used on my device) and npm -v 11.4.2 (latest used on my device).

1. Creating a template with reactjs configuration with typescript

`npm create vite@latest <app-name> -- --template react-ts`
`cd <app-name>`
`npm -i`

2. Setting Up tailwindcss on the project

`npm install tailwindcss @tailwindcss/vite`

Inside **vite.config.ts**
`import tailwindcss from "@tailwindcss/vite"`

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    ...,
    tailwindcss(),
  ],
})
```

Inside **index.css**
`@import tailwindcss`
