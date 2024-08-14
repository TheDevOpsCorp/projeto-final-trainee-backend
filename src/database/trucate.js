import { pool } from "./databse.js";

/**
 * @param {String} table
 * */
function truncateTable(table) {
    return `TRUNCATE TABLE ${table}`;
}

async function truncateUsersTable() {
    const query = truncateTable('users');
    
    await pool.query(query)
}

export { truncateUsersTable };
