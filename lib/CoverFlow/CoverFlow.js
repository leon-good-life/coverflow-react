'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EmptyContainer = require('./Container/EmptyContainer');

var _EmptyContainer2 = _interopRequireDefault(_EmptyContainer);

var _Container = require('./Container/Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoverFlow = function (_React$Component) {
  _inherits(CoverFlow, _React$Component);

  function CoverFlow() {
    _classCallCheck(this, CoverFlow);

    return _possibleConstructorReturn(this, (CoverFlow.__proto__ || Object.getPrototypeOf(CoverFlow)).apply(this, arguments));
  }

  _createClass(CoverFlow, [{
    key: 'render',
    value: function render() {

      var width = void 0,
          height = void 0;
      if (this.props.direction === 'vertical') {
        width = isNaN(this.props.width) ? 250 : this.props.width;
        height = isNaN(this.props.height) ? document.body.offsetHeight : this.props.height;
      } else {
        height = isNaN(this.props.height) ? 250 : this.props.height;
        width = isNaN(this.props.width) ? document.body.offsetWidth : this.props.width;
      }

      var styles = {
        textAlign: 'center',
        perspective: '400px',
        margin: '0px',
        position: 'relative',
        height: height + 'px',
        width: width + 'px',
        display: 'inline-block',
        boxSizing: 'border-box',
        padding: '25px',
        outline: 'transparent',
        background: this.props.background,
        border: this.props.border,
        boxShadow: this.props.boxShadow
      };

      if (this.props.imagesArr.length === 0) {
        return _react2.default.createElement(_EmptyContainer2.default, {
          containerStyles: styles,
          emptyMessage: this.props.emptyMessage,
          height: this.props.height,
          width: this.props.width,
          background: this.props.background,
          border: this.props.border,
          boxShadow: this.props.boxShadow });
      }
      return _react2.default.createElement(_Container2.default, {
        containerStyles: styles,
        imagesArr: this.props.imagesArr,
        labelsArr: this.props.labelsArr,
        itemRatio: this.props.itemRatio,
        zIndex: this.props.zIndex,
        handleSelect: this.props.handleSelect,
        height: height,
        width: width,
        background: this.props.background,
        border: this.props.border,
        boxShadow: this.props.boxShadow,
        direction: this.props.direction });
    }
  }]);

  return CoverFlow;
}(_react2.default.Component);

CoverFlow.propTypes = {
  imagesArr: _propTypes2.default.array.isRequired,
  zIndex: _propTypes2.default.number,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  background: _propTypes2.default.string,
  border: _propTypes2.default.string,
  boxShadow: _propTypes2.default.string,
  emptyMessage: _propTypes2.default.string,
  itemRatio: _propTypes2.default.string,
  handleSelect: _propTypes2.default.func,
  labelsArr: _propTypes2.default.array
};

CoverFlow.defaultProps = {
  zIndex: 100,
  direction: 'horizontal',
  background: '#333333',
  border: 'none',
  boxShadow: 'none',
  emptyMessage: 'No items to show.',
  itemRatio: '8:5',
  labelsArr: []
};

exports.default = CoverFlow;