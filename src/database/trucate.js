import { pool } from './database.js';

/**
 * @param {String} table
 * */

function truncateTable(table) {
    return `TRUNCATE TABLE ${table}`;
}

async function truncateUsersTable() {
    const query = truncateTable('users');

    await pool.query(query);
}

export { truncateUsersTable };
