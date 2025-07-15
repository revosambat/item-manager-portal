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

## Tech Stack

- **React** (Functional components with hooks)
- **React Hook Form** (form state management)
- **Yup** (form schema validation)
- **TypeScript** (type safety and form inference)
- **Context API** (for managing items)
- **TailwindCSS** (UI styling)
- **Lucide Icons** (icons)

## Setup and Run Instruction

### 1. Clone the repo

```bash
git clone git@github.com:revosambat/item-manager-portal.git (for ssh)
git clone https://github.com/revosambat/item-manager-portal.git (for https)

cd item-manager-portal
```

### 2. Install Dependencies

`npm install`

### 3. Run the dev server

`npm run dev`

App will be available at _http://localhost:5173/_

# Architectural Decisions and Tradeoff

1. React Hook Form + Yup

- Pros: Great performance with uncontrolled components, flexible schema validation, type inference via Yup.InferType.

- Trade-off: Slightly tricky TypeScript inference edge cases with optional/nullable fields (resolved using default value as empty string inside schema).

2. Context API

- Used to manage item list (createItem, updateItem, etc.) without the overhead of Redux or external state libraries.

- Trade-off: Fine for small apps; for large-scale apps, state libraries (like Zustand, Jotai, or Redux Toolkit) may offer better separation of concerns and dev tooling.

3. React Error Boundary

- Used as a fallback UI to catch runtime errors and prevent blank screens.

- Provides a "TRY AGAIN" option to reload the context and re-fetch data (from JSON), improving UX resilience against failures.




## Extra Features I'd Add With More Time

- API Integration: Hook into a real backend for item creation and updates.
- Success/error messages on form submission.
- Use utility types to auto-sync Yup and form values more strictly (e.g., using zod for better TS support).

