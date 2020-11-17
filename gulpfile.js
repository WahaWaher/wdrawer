const { series, parallel } = require('gulp');
// Tasks
const { styles } = require('./tasks/styles');
const { scripts } = require('./tasks/scripts');
const { watcher } = require('./tasks/watch');
const { server } = require('./tasks/server');
const { clean } = require('./tasks/clean');
const { replace } = require('./tasks/replace');
// Config
const { dev, build } = require('./config');

/**
 * Development Server
 * @cli yarn dev
 */
exports.dev = series(
  clean.bind(null, [`${dev}/css/**`, `${dev}/js/**`]),
  parallel(scripts, styles),
  parallel(watcher, server),
);

/**
 * Production build
 * @cli yarn build
 */
exports.build = series(
  clean.bind(null, [`${build}/**`]),
  parallel(scripts, styles),
);

/**
 * Prepare files
 * @cli yarn first
 */
exports.first = series(
  replace,
  clean.bind(null, [`${dev}/css/**`, `${dev}/js/**`, `${build}/**`]),
);
