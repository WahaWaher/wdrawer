const path = require('path');
// Plugins
const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cssimport = require('gulp-cssimport');
const postcss = require('gulp-postcss');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
// Configs
const { mode } = require('../utils');
const { bannerPipes } = require('../utils/banners');
const pkg = require('../package.json');
const config = require('../config');
const postCssConfig = require('../postcss.config.js');
// Other
const { server, stream } = require('./server');
sass.compiler = require('node-sass');

/**
 * Styles
 */
const styles = () => {
  return (
    src(
      [
        `${config.src}/styles/**/*.scss`,
        mode.is('prod') && `!${config.src}/styles/demo.scss`,
      ].filter(Boolean),
    )
      .pipe(
        plumber({
          errorHandler: notify.onError('Error: <%= error.message %>'),
        }),
      )
      .pipe(gulpif(mode.is('dev'), sourcemaps.init()))
      .pipe(
        sass({ outputStyle: 'expanded', includePaths: ['./node_modules/'] }).on(
          'error',
          sass.logError,
        ),
      )
      .pipe(cssimport({ includePaths: ['./node_modules/'] }))
      .pipe(
        postcss(
          postCssConfig(mode(), {
            cssnano: false,
          }).plugins,
        ),
      )
      .pipe(gulpif(mode.is('prod'), bannerPipes(config.banners)))
      .pipe(gulpif(mode.is('dev'), sourcemaps.write()))
      .pipe(dest(mode.is('dev') ? `${config.dev}/css` : `${config.build}`))
      // double...
      .pipe(postcss(postCssConfig(mode()).plugins))
      .pipe(
        gulpif(
          mode.is('prod'),
          rename({
            suffix: '.min',
            extname: '.css',
          }),
        ),
      )
      .pipe(dest(mode.is('dev') ? `${config.dev}/css` : `${config.build}`))
      .pipe(gulpif(mode.is('dev'), stream()))
  );
};

module.exports = {
  styles,
};
