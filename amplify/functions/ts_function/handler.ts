import type { Handler } from "aws-lambda"
import { MongoClient } from "mongodb"

// Global variable to reuse connection across Lambda invocations
let cachedClient: MongoClient | null = null

export const handler: Handler = async (event, context) => {
	try {
		const client = await connectToDatabase()
		const dbName = process.env.MONGO_DB || "test"
		const db = client.db(dbName)
		const fieldName = event.info?.fieldName

		switch (fieldName) {
			case "testConnection":
				return await testConnection(db, event)
			
			case "createDocument":
				return await createDocument(db, event.arguments)
			
			case "getDocuments":
				return await getDocuments(db, event.arguments)
			
			default:
				return await testConnection(db, event)
		}
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

async function connectToDatabase(): Promise<MongoClient> {
	if (cachedClient) {
		return cachedClient
	}

	const mongoUri = process.env.MONGO_URI
	if (!mongoUri) {
		throw new Error("MONGO_URI environment variable is not set")
	}

	try {
		const client = new MongoClient(mongoUri, {
			tls: true,
			tlsInsecure: true,
			connectTimeoutMS: 15000,
			maxPoolSize: 1,
		})

		await client.connect()
		cachedClient = client
		return client
	} catch (error) {
		throw error
	}
}

const testConnection = async (db: any, event: any) => {
	try {
		const os = require('os')
		const process = require('process')

		// Test database operations
		const testCollection = db.collection("test")
		const insertResult = await testCollection.insertOne({
			message: "Hello from lambda",
			timestamp: new Date(),
			requestId: event.requestContext?.requestId || 'unknown',
		})

		const foundDoc = await testCollection.findOne({
			_id: insertResult.insertedId,
		})

		const stats = await db.stats()

		return {
			success: true,
			message: "MongoDB connection successful!",
			database: db.databaseName,
			timestamp: new Date().toISOString(),
			systemInfo: {
				platform: os.platform(),
				architecture: os.arch(),
				osRelease: os.release(),
				osType: os.type(),
				hostname: os.hostname(),
				nodeVersion: process.version,
				nodeVersions: process.versions,
				awsRegion: process.env.AWS_REGION,
				lambdaFunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
				lambdaFunctionVersion: process.env.AWS_LAMBDA_FUNCTION_VERSION,
				lambdaMemorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
				totalMemory: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
				freeMemory: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
				memoryUsage: process.memoryUsage(),
				cpuInfo: os.cpus(),
				loadAverage: os.loadavg(),
				uptime: `${Math.round(os.uptime())} seconds`,
			},
			mongoInfo: {
				insertedDocument: foundDoc,
				databaseStats: {
					collections: stats.collections,
					dataSize: stats.dataSize,
					storageSize: stats.storageSize,
					indexes: stats.indexes,
					indexSize: stats.indexSize,
				}
			},
			networkInterfaces: os.networkInterfaces(),
		}
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
			systemInfo: {
				platform: require('os').platform(),
				architecture: require('os').arch(),
				nodeVersion: process.version,
				awsRegion: process.env.AWS_REGION,
				lambdaFunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
			}
		}
	}
}

const createDocument = async (db: any, args: any) => {
	try {
		const { collection: collectionName, data } = args
		
		if (!collectionName) {
			throw new Error("Collection name is required")
		}
		
		if (!data) {
			throw new Error("Data is required")
		}

		// Parse JSON string to object
		const parsedData = typeof data === 'string' ? JSON.parse(data) : data
		const collection = db.collection(collectionName)
		
		// Add metadata to the document
		const documentToInsert = {
			...parsedData,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		
		const result = await collection.insertOne(documentToInsert)
		const insertedDocument = await collection.findOne({ _id: result.insertedId })

		return {
			success: true,
			message: "Document created successfully",
			collection: collectionName,
			insertedId: result.insertedId,
			document: insertedDocument,
		}
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

const getDocuments = async (db: any, args: any) => {
	try {
		const { collection: collectionName, filter } = args
		
		if (!collectionName) {
			throw new Error("Collection name is required")
		}

		const collection = db.collection(collectionName)
		
		// Parse filter if it's a JSON string, otherwise use empty object
		let queryFilter = {}
		if (filter) {
			queryFilter = typeof filter === 'string' ? JSON.parse(filter) : filter
		}
		
		// Get documents with limit for performance
		const documents = await collection.find(queryFilter).limit(50).toArray()
		const count = await collection.countDocuments(queryFilter)

		return {
			success: true,
			message: "Documents retrieved successfully",
			collection: collectionName,
			filter: queryFilter,
			count: count,
			documents: documents,
			returned: documents.length,
		}
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}