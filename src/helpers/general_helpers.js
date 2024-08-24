/**
 *
 *
 * @param {Object} obj -
 * @returns {String}
 */
function formatObject(obj) {
    return JSON.stringify(
        obj,
    /** null keys value*/ null,
    /** space indentation*/ 2
    );
}

export { formatObject };
