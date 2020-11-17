const yargs = require('yargs');

/**
 * Get mode
 */
let mode = () => yargs.argv.env || 'development';

/**
 * Check mode
 */
mode.is = (arg) => {
  if (arg === 'dev') {
    return mode() === 'development' ? true : false;
  }
  if (arg === 'prod') {
    return mode() === 'production' ? true : false;
  }
};

module.exports = {
  mode,
};
