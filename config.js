const { getBanner } = require('./utils/banners');
const pkg = require('./package.json');

module.exports = {
  /**
   * Base dirs
   */
  src: './src',
  dev: './dev',
  build: './dist',
  /**
   * Global exports
   */
  globals: {
    core: pkg.lib.global,
  },
  /**
   * DevServer (BrowserSync)
   */
  server: {
    server: './dev',
    port: 3000,
    open: false,
    notify: false,
  },
  /**
   * Comment banners
   */
  banners: [
    {
      base: `${pkg.lib.file}.css`,
      template: getBanner({
        afterTitle: ' — core styles',
      }),
    },
    {
      base: `${pkg.lib.file}.min.css`,
      template: getBanner({
        afterTitle: ' — core styles',
        lastLineBreak: true,
      }),
    },
    {
      base: `${pkg.lib.file}.umd.es5.js`,
      template: getBanner({
        afterTitle: ' — core ES5 scripts',
        lastLineBreak: false,
      }),
    },
    {
      base: `${pkg.lib.file}.umd.es5.min.js`,
      template: getBanner({
        afterTitle: ' — core ES5 scripts',
        lastLineBreak: false,
      }),
    },
  ],
};
