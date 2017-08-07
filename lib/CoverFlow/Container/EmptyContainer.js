'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmptyContainer = function (_React$Component) {
  _inherits(EmptyContainer, _React$Component);

  function EmptyContainer() {
    _classCallCheck(this, EmptyContainer);

    return _possibleConstructorReturn(this, (EmptyContainer.__proto__ || Object.getPrototypeOf(EmptyContainer)).apply(this, arguments));
  }

  _createClass(EmptyContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.props.containerStyles },
        _react2.default.createElement(
          'div',
          { style: {
              display: 'inline-block',
              position: 'absolute',
              left: '50%',
              top: '50%'
            } },
          this.props.emptyMessage
        )
      );
    }
  }]);

  return EmptyContainer;
}(_react2.default.Component);

EmptyContainer.propTypes = {
  emptyMessage: _propTypes2.default.string,
  height: _propTypes2.default.number,
  background: _propTypes2.default.string,
  border: _propTypes2.default.string,
  boxShadow: _propTypes2.default.string
};

exports.default = EmptyContainer;