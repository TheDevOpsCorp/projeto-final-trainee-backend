import pg from 'pg'
const {Pool} = pg

let pool  = new Pool({
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
})

export default pool