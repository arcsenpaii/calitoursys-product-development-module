import { databasePath, openDatabase } from '../database/connection.js'
import { runMigrations } from '../database/runMigrations.js'

let database

export function getDatabase() {
  if (!database) {
    database = openDatabase()
    runMigrations(database)
  }

  return database
}

export async function testDatabaseConnection() {
  const db = getDatabase()
  const row = db.prepare('SELECT 1 AS ok').get()

  return {
    connected: row.ok === 1,
    type: 'sqlite',
    path: databasePath,
  }
}
