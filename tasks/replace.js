const path = require('path');
const fs = require('fs');
const replaceInFile = require('replace-in-file');
const pkg = require('../package.json');
const config = require('../config');

/**
 * File Renamer
 */
const rename = (from, to) =>
  new Promise((resolve, reject) => {
    fs.rename(from, to, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });

/**
 * Prepare template
 */
const replace = (done) => {
  replaceInFile({
    files: [path.resolve(process.cwd(), `${config.dev}/**/*.html`)],
    from: [/libraryName/g, /front-lib-template/g],
    to: [pkg.lib.file, pkg.lib.title],
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
    .then(() =>
      rename(
        path.resolve(process.cwd(), `${config.src}/styles/libraryName.scss`),
        path.resolve(
          process.cwd(),
          `${config.src}/styles/${pkg.lib.file}.scss`,
        ),
      ),
    )
    .catch((err) => console.error(err))
    .finally(() => done());
};

module.exports = {
  replace,
};
