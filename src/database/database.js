import { Pool } from "pg";
let pool = new Pool({
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    host:'localhost',
    port: 5432,
    
  })

export default pool
