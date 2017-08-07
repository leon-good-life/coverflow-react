var _jsxFileName = '/Users/leon/coverflow-react/src/CoverFlow/Container/Item/Item.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import SIDES from '../SIDES';
import './transition.css';

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _this.cssTransform = _this.cssTransform.bind(_this);
    _this.state = { tempClassName: '' };
    return _this;
  }

  _createClass(Item, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = {
        backgroundImage: 'url(\'' + this.props.imgUrl + '\')',
        left: 'calc(50% - ' + this.props.width + 'px / 2)',
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
      if (this.props.side === SIDES.LEFT || this.props.side === SIDES.RIGHT || this.props.side === SIDES.REMOVED_LEFT || this.props.side === SIDES.REMOVED_RIGHT) {
        styles.transform = this.cssTransform(this.props.side, this.props.distance);
      }
      if (this.props.side === SIDES.CENTER) {
        styles.zIndex = this.props.zIndex;
      } else if (this.props.side === SIDES.RIGHT) {
        styles.zIndex = this.props.zIndex - this.props.distance;
      } else if (this.props.side === SIDES.REMOVED_RIGHT) {
        styles.zIndex = this.props.zIndex - this.props.distance - 1;
      }
      return React.createElement('div', {
        style: styles,
        className: this.state.tempClassName,
        onClick: function onClick() {
          _this2.props.selectItem(_this2.props.index);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var tempClassName = void 0;
      if (this.props.side === SIDES.LEFT) {
        tempClassName = 'initial-left-' + this.props.max;
      } else if (this.props.side === SIDES.RIGHT) {
        tempClassName = 'initial-right-' + this.props.max;
      } else {
        tempClassName = '';
      }
      this.setState({ tempClassName: tempClassName });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.timeout = setTimeout(function () {
        _this3.setState({ tempClassName: '' });
      }, 100);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      var tempClassName = void 0;
      if (this.props.side === SIDES.LEFT) {
        tempClassName = 'initial-left-' + this.props.max;
      } else if (this.props.side === SIDES.RIGHT) {
        tempClassName = 'initial-right-' + this.props.max;
      } else {
        tempClassName = '';
      }
      this.setState({ tempClassName: tempClassName });
    }
  }, {
    key: 'cssTransform',
    value: function cssTransform(side, distance) {
      var template = function template(deg, x, z) {
        return 'rotateY(' + deg + 'deg) translate3d(' + x + 'px, 0px, ' + z + 'px)';
      };

      var z = -100 * distance - 100;

      var left = {
        deg: 45,
        x: -100 * distance,
        z: z
      };

      var right = {
        deg: -45,
        x: 100 * distance,
        z: z
      };

      if (side === SIDES.LEFT) {
        return template(left.deg, left.x, left.z);
      } else if (side === SIDES.RIGHT) {
        return template(right.deg, right.x, right.z);
      } else if (side === SIDES.REMOVED_LEFT) {
        return this.cssTransform(SIDES.LEFT, this.props.max);
      } else if (side === SIDES.REMOVED_RIGHT) {
        return this.cssTransform(SIDES.RIGHT, this.props.max);
      } else {
        throw 'Error: side is undefined or invalid.';
      }
    }
  }]);

  return Item;
}(React.Component);

Item.propTypes = {
  side: PropTypes.oneOf([SIDES.LEFT, SIDES.CENTER, SIDES.RIGHT, SIDES.REMOVED_RIGHT, SIDES.REMOVED_LEFT]).isRequired,
  zIndex: PropTypes.number,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

Item.defaultProps = {
  zIndex: 100
};

export default Item;