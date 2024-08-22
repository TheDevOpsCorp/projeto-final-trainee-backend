/**
 *
 *
 * @param {Object} obj -
 * @returns {String}
 */
function formatObject(obj) {
    return JSON.stringify(obj, null, 2);
}

export { formatObject };
