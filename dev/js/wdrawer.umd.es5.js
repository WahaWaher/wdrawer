(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.WDrawer = factory());
}(this, (function () {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var defaults = {
    width: 275,
    // drawer width, px
    position: 'right',
    // drawer appearing from "left" or "right"
    prefix: null,
    // prefix for main classes
    page: null,
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
   * Utils: _getSingleNode
   */


  var _getSingleNode = function _getSingleNode(entity) {
    var output = null;

    if (typeof entity === 'string') {
      // is selector
      output = document.querySelector(entity);
    } else if (_typeof(entity) === 'object') {
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
    var _ = this;

    var drawerNode = _getSingleNode(entity);

    if (!drawerNode) return; // handle defaults/options

    _.defaults = defaults;
    _.settings = Object.assign({}, defaults, options || {}); // save/create main nodes

    _.nodes = {
      drawer: drawerNode,
      page: _getSingleNode(_.settings.page),
      backdrop: document.createElement('div')
    }; // create state object

    _.state = {};
    var _$settings = _.settings,
        prefix = _$settings.prefix,
        position = _$settings.position,
        width = _$settings.width,
        open = _$settings.open;
    var _$nodes = _.nodes,
        drawer = _$nodes.drawer,
        pageNode = _$nodes.page,
        backdrop = _$nodes.backdrop;
    backdrop.addEventListener('click', _.close.bind(_));

    _inserAfter(backdrop, drawer); // add classes


    _addClass(drawer, 'wdrawer', prefix && 'wdrawer-' + prefix);

    _addClass(backdrop, 'wdrawer-backdrop', prefix && 'wdrawer-' + prefix + '-backdrop');

    pageNode && _addClass(pageNode, 'wdrawer-page', prefix && 'wdrawer-' + prefix + '-page'); // set styles for drawer

    _setStyle(drawer, 'width', width + 'px');

    _setStyle(drawer, position, -width + 'px');

    _setStyle(drawer, 'display', ''); // put instance in drawer node


    drawer.drawer = _;
    if (open) _.open();
  }

  var method = WDrawer.prototype;
  /**
   * Open drawer
   */

  method.open = function () {
    var _ = this;

    var _$settings2 = _.settings,
        position = _$settings2.position,
        width = _$settings2.width;
    var _$nodes2 = _.nodes,
        drawer = _$nodes2.drawer,
        page = _$nodes2.page,
        backdrop = _$nodes2.backdrop;
    var pagePos = position === 'right' ? -width : width;

    _setStyle(document.documentElement, 'overflow', 'hidden');

    _addClass(drawer, 'is-open');

    _setStyle(drawer, position, '0');

    page && _setStyle(page, 'transform', 'translateX(' + pagePos + 'px)');

    _addClass(backdrop, 'is-active');

    drawer.dispatchEvent(new CustomEvent('wdrawer.open', {
      detail: {
        instance: _
      }
    }));
    _.state.open = true;
  };
  /**
   * Close drawer
   */


  method.close = function () {
    var _ = this;

    var _$settings3 = _.settings,
        position = _$settings3.position,
        width = _$settings3.width;
    var _$nodes3 = _.nodes,
        drawer = _$nodes3.drawer,
        page = _$nodes3.page,
        backdrop = _$nodes3.backdrop;

    _setStyle(document.documentElement, 'overflow', '');

    _removeClass(drawer, 'is-open');

    _removeClass(backdrop, 'is-active');

    _setStyle(drawer, position, -width + 'px');

    page && _setStyle(page, 'transform', 'translateX(0)');
    drawer.dispatchEvent(new CustomEvent('wdrawer.close', {
      detail: {
        instance: _
      }
    }));
    _.state.open = false;
  };
  /**
   * Switch drawer
   */


  method["switch"] = function () {
    var _ = this;

    _.state.open ? _.close() : _.open();
  };

  return WDrawer;

})));
