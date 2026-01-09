import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB_NAME || 'ecme_lite'

let client
let db

export async function connectMongo() {
    if (db) return db
    client = new MongoClient(uri, {
        maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 10),
        minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE || 0),
        connectTimeoutMS: Number(process.env.MONGO_CONNECT_TIMEOUT_MS || 10000),
    })
    await client.connect()
    db = client.db(dbName)
    return db
}

export function getDb() {
    if (!db) throw new Error('mongo_not_connected')
    return db
}

export function getCollection(name) {
    return getDb().collection(name)
}

export async function disconnectMongo() {
    if (client) {
        await client.close()
        client = undefined
        db = undefined
    }
}

export async function ensureIndexes() {
    const eventsCol = getCollection(process.env.MONGODB_COLLECTION_EVENTS || 'agent_events')
    await eventsCol.createIndexes([
        { key: { correlationId: 1 }, name: 'correlationId_idx' },
        { key: { 'subject.id': 1 }, name: 'subjectId_idx' },
        { key: { actorId: 1 }, name: 'actorId_idx' },
        { key: { timestamp: -1 }, name: 'timestamp_idx' },
    ])
}
