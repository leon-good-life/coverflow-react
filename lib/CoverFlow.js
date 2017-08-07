var _jsxFileName = '/Users/leon/coverflow-react/src/CoverFlow/CoverFlow.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import EmptyContainer from './Container/EmptyContainer';
import Container from './Container/Container';

var CoverFlow = function (_React$Component) {
  _inherits(CoverFlow, _React$Component);

  function CoverFlow() {
    _classCallCheck(this, CoverFlow);

    return _possibleConstructorReturn(this, (CoverFlow.__proto__ || Object.getPrototypeOf(CoverFlow)).apply(this, arguments));
  }

  _createClass(CoverFlow, [{
    key: 'render',
    value: function render() {
      var styles = {
        textAlign: 'center',
        perspective: '400px',
        margin: '0px',
        position: 'relative',
        height: this.props.height + 'px',
        width: this.props.width + 'px',
        display: 'inline-block',
        boxSizing: 'border-box',
        padding: '25px',
        outline: 'transparent',
        background: this.props.background,
        border: this.props.border,
        boxShadow: this.props.boxShadow
      };

      if (this.props.imagesArr.length === 0) {
        return React.createElement(EmptyContainer, {
          containerStyles: styles,
          emptyMessage: this.props.emptyMessage,
          height: this.props.height,
          width: this.props.width,
          background: this.props.background,
          border: this.props.border,
          boxShadow: this.props.boxShadow, __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          },
          __self: this
        });
      }
      return React.createElement(Container, {
        containerStyles: styles,
        imagesArr: this.props.imagesArr,
        itemRatio: this.props.itemRatio,
        zIndex: this.props.zIndex,
        handleSelect: this.props.handleSelect,
        height: this.props.height,
        width: this.props.width,
        background: this.props.background,
        border: this.props.border,
        boxShadow: this.props.boxShadow, __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      });
    }
  }]);

  return CoverFlow;
}(React.Component);

CoverFlow.propTypes = {
  imagesArr: PropTypes.array.isRequired,
  zIndex: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  background: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.string,
  emptyMessage: PropTypes.string,
  itemRatio: PropTypes.string,
  handleSelect: PropTypes.func
};

CoverFlow.defaultProps = {
  zIndex: 100,
  height: 250,
  width: document.body.offsetWidth,
  background: 'lightgray',
  border: 'none',
  boxShadow: 'none',
  emptyMessage: 'No items to show.',
  itemRatio: '8:5'
};

export default CoverFlow;