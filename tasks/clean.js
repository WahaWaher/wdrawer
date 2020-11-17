const del = require('del');

/**
 * Clean
 */
const clean = (paths = []) => del(paths);

module.exports = {
  clean,
};
