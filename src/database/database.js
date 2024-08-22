import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;
//ts @ignore
// Configurações de conexão com o banco de dados

  const pool = new Pool({
  user: process.env['POSTGRES_USER'],
  host: process.env['POSTGRES_HOST'], 
  password: process.env['POSTGRES_PASSWORD'], 
  // @ts-ignore
  port: process.env['POSTGRES_PORT'],
  database: process.env['POSTGRES_DATABASE'], 
 
});

export default pool;
