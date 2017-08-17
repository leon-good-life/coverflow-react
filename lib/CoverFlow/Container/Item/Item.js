'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SIDES = require('../SIDES');

var _SIDES2 = _interopRequireDefault(_SIDES);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _this.cssTransform = _this.cssTransform.bind(_this);
    _this.cssTransformVertical = _this.cssTransformVertical.bind(_this);
    _this.state = { tempTransform: '' };
    return _this;
  }

  _createClass(Item, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = {
        backgroundImage: 'url(\'' + this.props.imgUrl + '\')',
        left: 'calc(50% - ' + this.props.width + 'px / 2)',
        top: 'calc(50% - ' + this.props.height + 'px / 2)',
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        backgroundSize: this.props.width + 'px ' + this.props.height + 'px',
        display: 'inline-block',
        position: 'absolute',
        backgroundColor: 'greenyellow',
        transitionTimingFunction: 'ease-in-out',
        transition: 'transform 750ms',
        boxShadow: '30px 5px 15px -10px rgba(0,0,0,.15), -30px 5px 15px -10px rgba(0,0,0,.15)'
      };
      if (this.props.side !== _SIDES2.default.CENTER) {
        if (this.state.tempTransform !== '') {
          styles.transform = this.state.tempTransform;
        } else {
          if (this.props.direction === 'vertical') {
            styles.transform = this.cssTransformVertical(this.props.side, this.props.distance);
          } else {
            styles.transform = this.cssTransform(this.props.side, this.props.distance);
          }
        }
      }
      if (this.props.side === _SIDES2.default.CENTER) {
        styles.zIndex = this.props.zIndex;
      } else if (this.props.side === _SIDES2.default.RIGHT) {
        styles.zIndex = this.props.zIndex - this.props.distance;
      } else if (this.props.side === _SIDES2.default.REMOVED_RIGHT) {
        styles.zIndex = this.props.zIndex - this.props.distance - 1;
      }
      var labelJsx = '';
      if (this.props.label !== null) {
        labelJsx = _react2.default.createElement(
          'div',
          { style: {
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              padding: '5px',
              bottom: '0',
              position: 'absolute',
              width: '100%',
              boxSizing: 'border-box',
              userSelect: 'none'
            } },
          this.props.label
        );
      }
      return _react2.default.createElement(
        'div',
        {
          style: styles,
          onClick: function onClick() {
            _this2.props.selectItem(_this2.props.index);
          }
        },
        labelJsx
      );
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var tempTransform = void 0;
      if (this.props.direction === 'vertical') {
        if (this.props.side === _SIDES2.default.LEFT || this.props.side === _SIDES2.default.RIGHT) {
          tempTransform = this.cssTransformVertical(this.props.side, this.props.max);
        } else {
          tempTransform = '';
        }
      } else {
        if (this.props.side === _SIDES2.default.LEFT || this.props.side === _SIDES2.default.RIGHT) {
          tempTransform = this.cssTransform(this.props.side, this.props.max);
        } else {
          tempTransform = '';
        }
      }
      this.setState({ tempTransform: tempTransform });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.timeout = setTimeout(function () {
        _this3.setState({ tempTransform: '' });
      }, 100);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      var tempTransform = void 0;
      if (this.props.direction === 'vertical') {
        if (this.props.side === _SIDES2.default.LEFT || this.props.side === _SIDES2.default.RIGHT) {
          tempTransform = this.cssTransformVertical(this.props.side, this.props.max);
        } else {
          tempTransform = '';
        }
      } else {
        if (this.props.side === _SIDES2.default.LEFT || this.props.side === _SIDES2.default.RIGHT) {
          tempTransform = this.cssTransform(this.props.side, this.props.max);
        } else {
          tempTransform = '';
        }
      }
      this.setState({ tempTransform: tempTransform });
    }
  }, {
    key: 'cssTransform',
    value: function cssTransform(side, distance) {
      var template = function template(deg, x, z) {
        return 'rotateY(' + deg + 'deg) translate3d(' + x + 'px, 0px, ' + z + 'px)';
      };

      var a = Math.floor(this.props.width / 3);
      var z = (-1 * a * distance - a) * 1.08;

      var left = {
        deg: 45,
        x: -1 * a * distance,
        z: z
      };

      var right = {
        deg: -45,
        x: a * distance,
        z: z
      };

      if (side === _SIDES2.default.LEFT) {
        return template(left.deg, left.x, left.z);
      } else if (side === _SIDES2.default.RIGHT) {
        return template(right.deg, right.x, right.z);
      } else if (side === _SIDES2.default.REMOVED_LEFT) {
        return this.cssTransform(_SIDES2.default.LEFT, this.props.max);
      } else if (side === _SIDES2.default.REMOVED_RIGHT) {
        return this.cssTransform(_SIDES2.default.RIGHT, this.props.max);
      } else {
        throw 'Error: side is undefined or invalid.';
      }
    }
  }, {
    key: 'cssTransformVertical',
    value: function cssTransformVertical(side, distance) {
      var template = function template(deg, y, z) {
        return 'rotateX(' + deg + 'deg) translate3d(0px, ' + y + 'px, ' + z + 'px)';
      };

      var a = Math.floor(this.props.height / 3);
      var z = (-1 * a * distance - a) * 1.08;

      var up = {
        deg: -45,
        y: -1 * a * distance,
        z: z
      };

      var down = {
        deg: 45,
        y: a * distance,
        z: z
      };

      if (side === _SIDES2.default.LEFT) {
        return template(up.deg, up.y, up.z);
      } else if (side === _SIDES2.default.RIGHT) {
        return template(down.deg, down.y, down.z);
      } else if (side === _SIDES2.default.REMOVED_LEFT) {
        return this.cssTransformVertical(_SIDES2.default.LEFT, this.props.max);
      } else if (side === _SIDES2.default.REMOVED_RIGHT) {
        return this.cssTransformVertical(_SIDES2.default.RIGHT, this.props.max);
      } else {
        throw 'Error: side is undefined or invalid.';
      }
    }
  }]);

  return Item;
}(_react2.default.Component);

Item.propTypes = {
  side: _propTypes2.default.oneOf([_SIDES2.default.LEFT, _SIDES2.default.CENTER, _SIDES2.default.RIGHT, _SIDES2.default.REMOVED_RIGHT, _SIDES2.default.REMOVED_LEFT]).isRequired,
  zIndex: _propTypes2.default.number,
  height: _propTypes2.default.number.isRequired,
  width: _propTypes2.default.number.isRequired
};

Item.defaultProps = {
  zIndex: 100
};

exports.default = Item;