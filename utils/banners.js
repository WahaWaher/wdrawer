const path = require('path');
const gulpif = require('gulp-if');
const header = require('gulp-header');
const Combine = require('stream-combiner');

const pkg = require('../package.json');

/**
 * Basic banner template
 */
const getBanner = ({ afterTitle = '', lastLineBreak = true }) => {
  return (
    [
      `/*!`,
      ` * ${(pkg.lib.title + afterTitle).trim()}`,
      ` * Version: ${pkg.version}`,
      ` * Repo: ${pkg.repository.url}`,
      ` * Author: ${pkg.author.name}`,
      ` * Contacts: ${pkg.author.email}`,
      ` * License: ${pkg.license}`,
      ` */`,
    ]
      .filter(Boolean)
      .join('\n') + (lastLineBreak ? '\n' : '')
  );
};

/**
 * Combine banner pipes
 */
const bannerPipes = (banners) =>
  Combine(
    banners.map(({ base, template }) =>
      gulpif((file) => path.parse(file.path).base === base, header(template)),
    ),
  );

module.exports = {
  getBanner,
  bannerPipes,
};
