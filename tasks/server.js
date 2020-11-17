const browserSync = require('browser-sync').create();
const config = require('../config');

/**
 * BrowserSync DevServer
 */
const server = () => browserSync.init(config.server);

module.exports = {
  server,
  browserSync,
  reload: browserSync.reload,
  stream: browserSync.stream,
};
