(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.WDrawer = factory());
}(this, (function () {
  var defaults = {
    width: 275,
    // drawer width, px
    position: 'right',
    // drawer appearing from "left" or "right"
    prefix: null,
    // prefix for main classes
    page: '.app',
    // selector for page content node
    open: false
  };

  /**
   * Utils: _addClass
   */

  var _addClass = function _addClass(node) {
    var classes = Array.prototype.slice.call(arguments, 1).filter(Boolean);
    var nodeClassList = node.classList;
    nodeClassList.add.apply(nodeClassList, classes);
  };
  /**
   * Utils: _removeClass
   */


  var _removeClass = function _removeClass(node, className) {
    node.classList.remove(className);
  };
  /**
   * Utils: _setStyle
   */


  var _setStyle = function _setStyle(node, prop, value) {
    node.style[prop] = value;
  };
  /**
   * Utils: _inserAfter
   */


  var _inserAfter = function _inserAfter(node, target) {
    target.parentNode.insertBefore(node, target.nextSibling);
  };
  /**
   * Construnctor
   */


  var WDrawer = function WDrawer(selector, options) {
    var _ = this;

    var state = _.state = {};
    var sets; // handle options

    _.defaults = defaults;
    _.settings = sets = Object.assign({}, defaults, options || {}); // save/create main nodes

    _.nodes = {
      drawer: document.querySelector(selector),
      page: document.querySelector(sets.page),
      backdrop: document.createElement('div')
    };
    var prefix = sets.prefix;
    var _$nodes = _.nodes;
    var drawer = _$nodes.drawer;
    var page = _$nodes.page;
    var backdrop = _$nodes.backdrop;
    backdrop.addEventListener('click', _.close.bind(_));

    _inserAfter(backdrop, drawer); // add classes


    _addClass(drawer, 'wdrawer', prefix && 'wdrawer-' + prefix);

    _addClass(backdrop, 'wdrawer-backdrop', prefix && 'wdrawer-' + prefix + '-backdrop');

    page && _addClass(page, 'wdrawer-page', prefix && 'wdrawer-' + prefix + '-page'); // set styles for drawer

    _setStyle(drawer, 'width', sets.width + 'px');

    _setStyle(drawer, sets.position, -sets.width + 'px');

    _setStyle(drawer, 'display', ''); // put instance in drawer node


    drawer.drawer = _;
    if (sets.open) _.open();
  };

  var meth = WDrawer.prototype;
  /**
   * Open drawer
   */

  meth.open = function () {
    var _ = this;

    var sets = _.settings;
    var _$nodes = _.nodes;
    var drawer = _$nodes.drawer;
    var page = _$nodes.page;
    var backdrop = _$nodes.backdrop;
    var pagePos = sets.position === 'right' ? -sets.width : sets.width;

    _setStyle(document.documentElement, 'overflow', 'hidden');

    _addClass(drawer, 'is-open');

    _setStyle(drawer, sets.position, '0');

    page && _setStyle(page, 'transform', 'translateX(' + pagePos + 'px)');

    _addClass(backdrop, 'is-active');

    var wdrawerOpen = new CustomEvent('wdrawer.open', {
      detail: {
        instance: _
      }
    });
    drawer.dispatchEvent(wdrawerOpen);
    _.state.open = true;
  };
  /**
   * Close drawer
   */


  meth.close = function () {
    var _ = this;

    var sets = _.settings;
    var _$nodes = _.nodes;
    var drawer = _$nodes.drawer;
    var page = _$nodes.page;
    var backdrop = _$nodes.backdrop;

    _setStyle(document.documentElement, 'overflow', '');

    _removeClass(drawer, 'is-open');

    _removeClass(backdrop, 'is-active');

    _setStyle(drawer, sets.position, -sets.width + 'px');

    page && _setStyle(page, 'transform', 'translateX(0)');
    var wdrawerClose = new CustomEvent('wdrawer.close', {
      detail: {
        instance: _
      }
    });
    drawer.dispatchEvent(wdrawerClose);
    _.state.open = false;
  };
  /**
   * Switch drawer
   */


  meth["switch"] = function () {
    var _ = this;

    _.state.open ? _.close() : _.open();
  };

  return WDrawer;

})));
