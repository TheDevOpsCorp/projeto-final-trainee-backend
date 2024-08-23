import pg from 'pg'
const {Pool} = pg

let pool = new Pool({
    database: process.env["POSTGRES_DATABASE"],
    user: process.env["POSTGRES_USER"],
    password: process.env["POSTGRES_PASSWORD"],
    host:process.env["POSTGRES_HOST"],
    // @ts-ignore
    port: process.env["POSTGRES_PORT"],
    
  })

export default pool
