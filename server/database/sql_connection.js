import mysql from 'mysql2'
import dotenv from 'dotenv'

const pool = mysql.createPool({
  host: 'host',
  user: 'user',
  password: 'password',
  database: 'database'
}).promise();

