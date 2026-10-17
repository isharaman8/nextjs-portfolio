import { Db, MongoClient } from 'mongodb'

// Reuse one client across hot reloads in dev and across invocations of a warm serverless function
const globalForMongo = globalThis as unknown as {
    mongoClientPromise?: Promise<MongoClient>
}

const getClient = (uri: string) => {
    if (!globalForMongo.mongoClientPromise) {
        globalForMongo.mongoClientPromise = new MongoClient(uri).connect()
    }
    return globalForMongo.mongoClientPromise
}

// Returns null when MONGODB_URI is unset so the site still builds (with an empty blog)
export async function getDb(): Promise<Db | null> {
    const uri = process.env.MONGODB_URI
    if (!uri) return null

    const client = await getClient(uri)
    return client.db(process.env.MONGODB_DB || 'portfolio')
}
