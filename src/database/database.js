import 'dotenv/config';
import pkg from "pg";
const { Pool } = pkg;

// Configurações de conexão com o banco de dados
const pool = new Pool({
  user: process.env['DB_USER'],         // Nome do usuário
  host: process.env['DB_HOST'],         // Host do banco de dados
  database: process.env['DB_DATABASE'], // Nome do banco de dados
  password: process.env['DB_PASSWORD'], // Senha do banco de dados
  port: process.env['DB_PORT'],         // Porta do banco de dados
});


export default pool;





