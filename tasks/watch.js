const { watch } = require('gulp');
// Tasks
const { scripts } = require('./scripts');
const { styles } = require('./styles');
const { server, reload } = require('./server');

const cfg = require('../config');

/**
 * Watcher
 */
const watcher = () => {
  watch([`${cfg.src}/styles/**/*.scss`], styles);
  watch([`${cfg.dev}/**/*.js`]).on('change', reload);
  watch([`${cfg.dev}/**/*.html`]).on('all', reload);
};

module.exports = {
  watcher,
};
