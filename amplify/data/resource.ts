import { type ClientSchema, a, defineData } from "@aws-amplify/backend"
import { tsFunction } from "../functions/ts_function/resource"
const schema = a.schema({
	// Test mongodb connection
	testConnection: a
		.query()
		.returns(a.json())
		.authorization((allow) => [allow.publicApiKey()])
		.handler(a.handler.function(tsFunction)), 

	// Future MongoDB operations
	createDocument: a
		.mutation()
		.arguments({
			collection: a.string().required(),
			data: a.json().required(),
		})
		.returns(a.json())
		.authorization((allow) => [allow.publicApiKey()])
		.handler(a.handler.function(tsFunction)), 

	getDocuments: a
		.query()
		.arguments({
			collection: a.string().required(),
			filter: a.json(),
		})
		.returns(a.json())
		.authorization((allow) => [allow.publicApiKey()])
		.handler(a.handler.function(tsFunction)), 
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "apiKey",
		apiKeyAuthorizationMode: {
			expiresInDays: 30,
		},
	},
})