var _jsxFileName = '/Users/leon/coverflow-react/src/CoverFlow/Container/Container.js';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SIDES from './SIDES';
import Item from './Item/Item';

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.selectItem = _this.selectItem.bind(_this);
    _this.prepareItems = _this.prepareItems.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.calcIndex = _this.calcIndex.bind(_this);
    _this.calcItemDimensions = _this.calcItemDimensions.bind(_this);
    _this.calcItemsAmountToRender = _this.calcItemsAmountToRender.bind(_this);
    var index = _this.calcIndex();
    _this.state = {
      selectedIndex: index,
      prevIndex: index
    };
    return _this;
  }

  _createClass(Container, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var itemWidth = void 0,
          itemHeight = void 0;

      var _calcItemDimensions = this.calcItemDimensions();

      var _calcItemDimensions2 = _slicedToArray(_calcItemDimensions, 2);

      itemWidth = _calcItemDimensions2[0];
      itemHeight = _calcItemDimensions2[1];

      var items = this.prepareItems();
      return React.createElement(
        'div',
        { tabIndex: '0',
          onKeyDown: this.handleKeyDown,
          style: this.props.containerStyles,
          ref: function ref(coverflow) {
            _this2.coverflow = coverflow;
          }, __source: {
            fileName: _jsxFileName,
            lineNumber: 27
          },
          __self: this
        },
        items.map(function (item) {
          return React.createElement(Item, {
            side: item.side,
            max: Math.floor(_this2.calcItemsAmountToRender() / 2),
            distance: item.distance,
            imgUrl: item.imgUrl,
            selectItem: _this2.selectItem,
            index: item.index,
            zIndex: _this2.props.zIndex,
            height: itemHeight,
            width: itemWidth,
            key: item.index, __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: _this2
          });
        })
      );
    }
  }, {
    key: 'selectItem',
    value: function selectItem(index) {
      this.setState(function (prevState) {
        return {
          selectedIndex: index,
          prevIndex: prevState.selectedIndex
        };
      });
      if (this.props.handleSelect) {
        this.props.handleSelect(index);
      }
    }
  }, {
    key: 'prepareItems',
    value: function prepareItems() {
      if (this.props.imagesArr.length === 0) {
        return [];
      }
      var AMOUNT_TO_RENDER = this.calcItemsAmountToRender(); //9;
      var SIDE_AMOUNT = Math.floor(AMOUNT_TO_RENDER / 2);

      var index = this.state.selectedIndex;
      var imagesArr = _.cloneDeep(this.props.imagesArr);
      var items = imagesArr.map(function (imgUrl, index) {
        return { imgUrl: imgUrl, index: index };
      });

      items[index].side = SIDES.CENTER;
      items[index].distance = 0;

      var fromIndex = Math.max(0, index - SIDE_AMOUNT);
      var untilIndex = Math.min(imagesArr.length, index + SIDE_AMOUNT + 1);

      for (var i = fromIndex; i < index; i++) {
        items[i].side = SIDES.LEFT;
        items[i].distance = index - i;
      }

      for (var _i = index + 1; _i < untilIndex; _i++) {
        items[_i].side = SIDES.RIGHT;
        items[_i].distance = _i - index;
      }

      if (items.length <= AMOUNT_TO_RENDER) {
        return items;
      }

      // calc removed items, in order to animate them.
      var amount = index - this.state.prevIndex;
      if (amount > 0 && fromIndex > SIDE_AMOUNT) {
        for (var _i2 = fromIndex - amount; _i2 < fromIndex; _i2++) {
          items[_i2].side = SIDES.REMOVED_LEFT;
          items[_i2].distance = index - _i2;
        }
        fromIndex -= amount;
      } else if (amount < 0) {
        amount *= -1;
        if (untilIndex + amount < items.length) {
          for (var _i3 = untilIndex; _i3 < untilIndex + amount; _i3++) {
            if (!items[_i3]) {
              debugger;
            }
            items[_i3].side = SIDES.REMOVED_RIGHT;
            items[_i3].distance = _i3 - index;
          }
          untilIndex += amount;
        }
      }

      return items.slice(fromIndex, untilIndex);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var index = this.state.selectedIndex;
      if (e.keyCode === 37) {
        // left
        if (index > 0) {
          this.selectItem(index - 1);
        }
      } else if (e.keyCode === 39) {
        // right
        if (index + 1 < this.props.imagesArr.length) {
          this.selectItem(index + 1);
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.coverflow.focus();
    }
  }, {
    key: 'calcIndex',
    value: function calcIndex() {
      var length = this.props.imagesArr.length;
      if (length === 0) {
        return -1;
      }
      if (length > 10) {
        return 4;
      }
      return parseInt(this.props.imagesArr.length / 2, 10);
    }
  }, {
    key: 'calcItemDimensions',
    value: function calcItemDimensions() {
      var ratio = {};

      var _props$itemRatio$spli = this.props.itemRatio.split(':').map(function (x) {
        return parseFloat(x);
      });

      var _props$itemRatio$spli2 = _slicedToArray(_props$itemRatio$spli, 2);

      ratio.x = _props$itemRatio$spli2[0];
      ratio.y = _props$itemRatio$spli2[1];

      var itemHeight = this.props.height - 60;
      var itemWidth = itemHeight * ratio.x / ratio.y;
      return [itemWidth, itemHeight];
    }
  }, {
    key: 'calcItemsAmountToRender',
    value: function calcItemsAmountToRender() {
      var containerWidth = this.props.width;
      var itemWidth = void 0;

      var _calcItemDimensions3 = this.calcItemDimensions();

      var _calcItemDimensions4 = _slicedToArray(_calcItemDimensions3, 1);

      itemWidth = _calcItemDimensions4[0];

      var amount = Math.floor(containerWidth / itemWidth) * 2 - 3;
      if (amount < 3) {
        amount = 3;
      } else if (amount > 11) {
        amount = 11;
      }
      return amount;
    }
  }]);

  return Container;
}(React.Component);

Container.propTypes = {
  imagesArr: PropTypes.array.isRequired,
  zIndex: PropTypes.number,
  height: PropTypes.number,
  background: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.string,
  itemRatio: PropTypes.string,
  handleSelect: PropTypes.func
};

export default Container;