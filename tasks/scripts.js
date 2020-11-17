const { src, dest } = require('gulp');
const path = require('path');
const loadConfigFile = require('rollup/dist/loadConfigFile');
const rollup = require('rollup');
const { mode } = require('../utils');

/**
 * Scripts
 */
const scripts = (done) => {
  // load the config file next to the current script;
  // the provided config object has the same effect as passing "--format es"
  // on the command line and will override the format of all outputs
  loadConfigFile(
    path.resolve(
      process.cwd(),
      `rollup.config.${mode.is('dev') ? 'dev' : 'prod'}.js`,
    ) /* ,
    { format: 'es' } */,
  ).then(async ({ options: opts, warnings }) => {
    // "warnings" wraps the default `onwarn` handler passed by the CLI.
    // This prints all warnings up to this point:
    // console.log(`We currently have ${warnings.count} warnings`);

    // This prints all deferred warnings
    warnings.flush();

    await Promise.all(
      opts.map(async (options) => {
        // Create a bundle
        const bundle = await rollup.rollup(options);
        // Write the bundle to disk
        await Promise.all(options.output.map(bundle.write));
        // You can also pass this directly to "rollup.watch"
        mode.is('dev') && rollup.watch(options);
      }),
    );

    done();
  });
};

module.exports = {
  scripts,
};
