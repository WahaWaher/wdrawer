import defaults from './config/defaults';

/**
 * Utils: _addClass
 */
const _addClass = function (node) {
  const classes = Array.prototype.slice.call(arguments, 1).filter(Boolean);
  const nodeClassList = node.classList;

  nodeClassList.add.apply(nodeClassList, classes);
};

/**
 * Utils: _removeClass
 */
const _removeClass = (node, className) => {
  node.classList.remove(className);
};

/**
 * Utils: _setStyle
 */
const _setStyle = (node, prop, value) => {
  node.style[prop] = value;
};

/**
 * Utils: _inserAfter
 */
const _inserAfter = (node, target) => {
  target.parentNode.insertBefore(node, target.nextSibling);
};

/**
 * Construnctor
 */
const WDrawer = function WDrawer(selector, options) {
  const _ = this;
  const state = (_.state = {});
  let sets, nodes;

  // handle options
  _.defaults = defaults;
  _.settings = sets = Object.assign({}, defaults, options || {});

  // save/create main nodes
  _.nodes = {
    drawer: document.querySelector(selector),
    page: document.querySelector(sets.page),
    backdrop: document.createElement('div'),
  };

  const prefix = sets.prefix;
  const _$nodes = _.nodes;
  const drawer = _$nodes.drawer;
  const page = _$nodes.page;
  const backdrop = _$nodes.backdrop;

  backdrop.addEventListener('click', _.close.bind(_));
  _inserAfter(backdrop, drawer);

  // add classes
  _addClass(drawer, 'wdrawer', prefix && 'wdrawer-' + prefix);
  _addClass(
    backdrop,
    'wdrawer-backdrop',
    prefix && 'wdrawer-' + prefix + '-backdrop',
  );
  page &&
    _addClass(page, 'wdrawer-page', prefix && 'wdrawer-' + prefix + '-page');

  // set styles for drawer
  _setStyle(drawer, 'width', sets.width + 'px');
  _setStyle(drawer, sets.position, -sets.width + 'px');
  _setStyle(drawer, 'display', '');

  // put instance in drawer node
  drawer.drawer = _;
  if (sets.open) _.open();
};

const meth = WDrawer.prototype;

/**
 * Open drawer
 */
meth.open = function () {
  const _ = this;
  const sets = _.settings;
  const _$nodes = _.nodes;
  const drawer = _$nodes.drawer;
  const page = _$nodes.page;
  const backdrop = _$nodes.backdrop;
  const pagePos = sets.position === 'right' ? -sets.width : sets.width;

  _setStyle(document.documentElement, 'overflow', 'hidden');
  _addClass(drawer, 'is-open');
  _setStyle(drawer, sets.position, '0');
  page && _setStyle(page, 'transform', 'translateX(' + pagePos + 'px)');
  _addClass(backdrop, 'is-active');

  const wdrawerOpen = new CustomEvent('wdrawer.open', {
    detail: {
      instance: _,
    },
  });

  drawer.dispatchEvent(wdrawerOpen);

  _.state.open = true;
};

/**
 * Close drawer
 */
meth.close = function () {
  const _ = this;
  const sets = _.settings;
  const _$nodes = _.nodes;
  const drawer = _$nodes.drawer;
  const page = _$nodes.page;
  const backdrop = _$nodes.backdrop;

  _setStyle(document.documentElement, 'overflow', '');
  _removeClass(drawer, 'is-open');
  _removeClass(backdrop, 'is-active');
  _setStyle(drawer, sets.position, -sets.width + 'px');
  page && _setStyle(page, 'transform', 'translateX(0)');

  const wdrawerClose = new CustomEvent('wdrawer.close', {
    detail: {
      instance: _,
    },
  });
  drawer.dispatchEvent(wdrawerClose);

  _.state.open = false;
};

/**
 * Switch drawer
 */
meth.switch = function () {
  const _ = this;

  _.state.open ? _.close() : _.open();
};

export default WDrawer;
