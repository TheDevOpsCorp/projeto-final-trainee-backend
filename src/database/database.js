import pg from 'pg';

const { Pool } = pg;

//@ts-ignore
const poolConfig = {
    user: 'postgres',
    password: 'postgres',
    host: process.env['POSTGRES_HOST'],
    port: process.env['POSTGRES_PORT'],
    database: process.env['POSTGRES_DATABASE'],
};

//@ts-ignore
const pool = new Pool(poolConfig);

export { pool };
