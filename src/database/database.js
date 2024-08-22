import 'dotenv/config';
import pkg from "pg";
const { Pool } = pkg;

// Configurações de conexão com o banco de dados
const pool = new Pool({
  user: process.env['POSTGRES_USER'],         // Nome do usuário
  host: process.env['POSTGRES_HOST'],         // Host do banco de dados
  database: process.env['POSTGRES_DATABASE'], // Nome do banco de dados
  password: process.env['POSTGRES_PASSWORD'], // Senha do banco de dados
  port: process.env['POSTGRES_PORT'],         // Porta do banco de dados
});


export default pool;





