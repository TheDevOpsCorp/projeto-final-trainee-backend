import { pool } from '../database/database.js';

/**
 * @param {String} table
 * */

function truncateTable(table) {
  return `TRUNCATE TABLE ${table} CASCADE;`;
}

async function truncateUsersTable() {
  const query = truncateTable('users');

  await pool.query(query);
}

export { truncateUsersTable };
