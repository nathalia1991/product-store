import sqlite3, { Database } from 'sqlite3';
import { open, Database as SqliteDatabase } from 'sqlite';

export let initialDataSet = false;

let db: SqliteDatabase<sqlite3.Database, sqlite3.Statement>;

export async function openDB(): Promise<SqliteDatabase<sqlite3.Database, sqlite3.Statement>> {
  db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  if (initialDataSet) {
    return db;
  }


  await db.exec("CREATE TABLE IF NOT EXISTS  users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, address TEXT, phone TEXT)");

  await db.exec("CREATE TABLE IF NOT EXISTS  user_auth (id_user INTEGER PRIMARY KEY, password TEXT)");
  
  await db.exec("CREATE TABLE IF NOT EXISTS  orders (id INTEGER PRIMARY KEY AUTOINCREMENT, order_date DATE DEFAULT CURRENT_DATE, id_user INTEGER)");

  await db.exec("CREATE TABLE IF NOT EXISTS  order_item (id INTEGER PRIMARY KEY AUTOINCREMENT, id_order INTEGER, id_product INTEGER, quantity INTEGER, unit_price DOUBLE)");

  initialDataSet = true;
  return db;
}



