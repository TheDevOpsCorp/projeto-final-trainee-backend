/**
 * @param {String} table
 * */
function truncateTable(table) {
    return `TRUNCATE TABLE ${table}`;
}

async function truncateUsersTable() {
    const query = truncateTable('users');
}

export { truncateUsersTable };
