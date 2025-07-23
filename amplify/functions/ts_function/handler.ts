import type { Handler } from "aws-lambda"
import { MongoClient } from "mongodb"
import { env } from "$amplify/env/handler"

// Global variable to reuse connection across Lambda invocations
let cachedClient: MongoClient | null = null

async function connectToDatabase(): Promise<MongoClient> {
	if (cachedClient) {
		return cachedClient
	}

	const mongoUri = env.MONGO_URI
	if (!mongoUri) {
		throw new Error("MONGO_URI environment variable is not set")
	}

	try {
		const client = new MongoClient(mongoUri)
		await client.connect()

		// Test the connection
		await client.db("admin").command({ ping: 1 })
		console.log("Successfully connected to MongoDB")

		cachedClient = client
		return client
	} catch (error) {
		console.error("MongoDB connection failed:", error)
		throw error
	}
}

export const handler: Handler = async (event, context) => {
	try {
		const client = await connectToDatabase()
		const dbName = env.MONGO_DB || "test"
		const db = client.db(dbName)

		// Handle different operations based on GraphQL field name
		const fieldName = event.info?.fieldName

		switch (fieldName) {
			case "testConnection":
				return await testConnection(db, event)

			case "createDocument":
				return await createDocument(db, event.arguments)

			case "getDocuments":
				return await getDocuments(db, event.arguments)

			default:
				// Default test operation for direct Lambda invocation
				return await testConnection(db, event)
		}
	} catch (error) {
		console.error("Handler error:", error)

		return {
			statusCode: 500,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
				{
					success: false,
					error: error instanceof Error ? error.message : "Unknown error",
					stack: error instanceof Error ? error.stack : undefined,
				},
				null,
				2
			),
		}
	}
}

const testConnection = async (db: any, event: any) => {
	const testCollection = db.collection("test")

	const insertResult = await testCollection.insertOne({
		message: "Hello from lambda",
		timestamp: new Date(),
		event: event,
	})

	const foundDoc = await testCollection.findOne({
		_id: insertResult.insertedId,
	})

	const stats = await db.stats()

	return {
		success: true,
		message: "MongoDB connection successful!",
		database: db.databaseName,
		insertedDocument: foundDoc,
		databaseStats: {
			collections: stats.collections,
			dataSize: stats.dataSize,
			storageSize: stats.storageSize,
		},
	}
}

const createDocument = async (db: any, args: any) => {
	const collection = db.collection(args.collection)
	const result = await collection.insertOne(args.data)

	return {
		success: true,
		insertedId: result.insertedId,
		collection: args.collection,
	}
}

async function getDocuments(db: any, args: any) {
	const collection = db.collection(args.collection)
	const filter = args.filter || {}
	const documents = await collection.find(filter).limit(10).toArray()

	return {
		success: true,
		documents,
		count: documents.length,
		collection: args.collection,
	}
}
