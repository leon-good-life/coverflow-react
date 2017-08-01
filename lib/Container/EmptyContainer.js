var _jsxFileName = '/Users/leon/coverflow-react/src/CoverFlow/Container/EmptyContainer.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var EmptyContainer = function (_React$Component) {
  _inherits(EmptyContainer, _React$Component);

  function EmptyContainer() {
    _classCallCheck(this, EmptyContainer);

    return _possibleConstructorReturn(this, (EmptyContainer.__proto__ || Object.getPrototypeOf(EmptyContainer)).apply(this, arguments));
  }

  _createClass(EmptyContainer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: this.props.containerStyles, __source: {
            fileName: _jsxFileName,
            lineNumber: 7
          },
          __self: this
        },
        React.createElement(
          'div',
          { style: {
              display: 'inline-block',
              position: 'absolute',
              left: '50%',
              top: '50%'
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 8
            },
            __self: this
          },
          this.props.emptyMessage
        )
      );
    }
  }]);

  return EmptyContainer;
}(React.Component);

EmptyContainer.propTypes = {
  emptyMessage: PropTypes.string,
  height: PropTypes.number,
  background: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.string
};

export default EmptyContainer;