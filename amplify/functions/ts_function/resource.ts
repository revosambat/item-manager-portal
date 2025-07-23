import { defineFunction, secret } from "@aws-amplify/backend"

export const tsFunction = defineFunction({
	// name: "ts-hello-world",
	entry: "./handler.ts",
	runtime: 22, // Node.js 22 runtime
	// Optional: Add timeout, memory, etc.
	timeoutSeconds: 30,
	memoryMB: 512,
    environment: {
        MONGO_URI: secret('MONGO_URI'),
        MONGO_DB: secret('MONGO_DB')
    },
})
