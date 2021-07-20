import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export default async function ConnectDatabase() {
  if (!client.isConnected) await client.connect()

  const db = client.db('DailyMusic')
  return { db, client }
}