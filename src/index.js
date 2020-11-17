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
 * Utils: _getSingleNode
 */
const _getSingleNode = function (entity) {
  let output = null;

  if (typeof entity === 'string') {
    // is selector
    output = document.querySelector(entity);
  } else if (typeof entity === 'object') {
    if (Node.prototype.isPrototypeOf(entity)) {
      // is single node
      output = entity;
    }
    if (NodeList.prototype.isPrototypeOf(entity)) {
      // is node list
      output = entity[0] || null;
    }
  }

  return output;
};

/**
 * Construnctor
 */
function WDrawer(entity, options) {
  const _ = this;
  const drawerNode = _getSingleNode(entity);

  if (!drawerNode) return;

  // handle defaults/options
  _.defaults = defaults;
  _.settings = Object.assign({}, defaults, options || {});

  // save/create main nodes
  _.nodes = {
    drawer: drawerNode,
    page: _getSingleNode(_.settings.page),
    backdrop: document.createElement('div'),
  };

  // create state object
  _.state = {};

  const { prefix, position, width, open } = _.settings;
  const { drawer, page: pageNode, backdrop } = _.nodes;

  backdrop.addEventListener('click', _.close.bind(_));
  _inserAfter(backdrop, drawer);

  // add classes
  _addClass(drawer, 'wdrawer', prefix && 'wdrawer-' + prefix);
  _addClass(
    backdrop,
    'wdrawer-backdrop',
    prefix && 'wdrawer-' + prefix + '-backdrop',
  );
  pageNode &&
    _addClass(
      pageNode,
      'wdrawer-page',
      prefix && 'wdrawer-' + prefix + '-page',
    );

  // set styles for drawer
  _setStyle(drawer, 'width', width + 'px');
  _setStyle(drawer, position, -width + 'px');
  _setStyle(drawer, 'display', '');

  // put instance in drawer node
  drawer.drawer = _;
  if (open) _.open();
}

const method = WDrawer.prototype;

/**
 * Open drawer
 */
method.open = function () {
  const _ = this;
  const { position, width } = _.settings;
  const { drawer, page, backdrop } = _.nodes;
  const pagePos = position === 'right' ? -width : width;

  _setStyle(document.documentElement, 'overflow', 'hidden');
  _addClass(drawer, 'is-open');
  _setStyle(drawer, position, '0');
  page && _setStyle(page, 'transform', 'translateX(' + pagePos + 'px)');
  _addClass(backdrop, 'is-active');

  drawer.dispatchEvent(
    new CustomEvent('wdrawer.open', {
      detail: {
        instance: _,
      },
    }),
  );

  _.state.open = true;
};

/**
 * Close drawer
 */
method.close = function () {
  const _ = this;
  const { position, width } = _.settings;
  const { drawer, page, backdrop } = _.nodes;

  _setStyle(document.documentElement, 'overflow', '');
  _removeClass(drawer, 'is-open');
  _removeClass(backdrop, 'is-active');
  _setStyle(drawer, position, -width + 'px');
  page && _setStyle(page, 'transform', 'translateX(0)');

  drawer.dispatchEvent(
    new CustomEvent('wdrawer.close', {
      detail: {
        instance: _,
      },
    }),
  );

  _.state.open = false;
};

/**
 * Switch drawer
 */
method.switch = function () {
  const _ = this;

  _.state.open ? _.close() : _.open();
};

export default WDrawer;
