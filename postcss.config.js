const sortMediaQueries = require('postcss-sort-media-queries');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = (mode, plugs = {}) => {
  switch (mode) {
    case 'development':
      return {
        plugins: [
          plugs.autoprefixer !== false &&
            autoprefixer({
              overrideBrowserslist: ['> 0.1%', 'ie 11'],
              ...(plugs.autoprefixer || {}),
            }),
        ].filter(Boolean),
      };
    case 'production':
      return {
        plugins: [
          plugs.sortMediaQueries !== false &&
            sortMediaQueries({
              sort: 'desctop-first',
              ...(plugs.sortMediaQueries || {}),
            }),
          plugs.autoprefixer !== false &&
            autoprefixer({
              overrideBrowserslist: ['> 0.1%', 'ie 11'],
              ...(plugs.autoprefixer || {}),
            }),
          plugs.cssnano !== false &&
            cssnano({
              preset: ['default'],
              ...(plugs.cssnano || {}),
            }),
        ].filter(Boolean),
      };
  }
};
