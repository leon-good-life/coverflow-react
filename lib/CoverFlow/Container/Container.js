'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SIDES = require('./SIDES');

var _SIDES2 = _interopRequireDefault(_SIDES);

var _Item = require('./Item/Item');

var _Item2 = _interopRequireDefault(_Item);

var _swipeReact = require('swipe-react');

var _swipeReact2 = _interopRequireDefault(_swipeReact);

var _wheelReact = require('wheel-react');

var _wheelReact2 = _interopRequireDefault(_wheelReact);

var _arrowKeysReact = require('arrow-keys-react');

var _arrowKeysReact2 = _interopRequireDefault(_arrowKeysReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.selectItem = _this.selectItem.bind(_this);
    _this.prepareItems = _this.prepareItems.bind(_this);
    _this.calcIndex = _this.calcIndex.bind(_this);
    _this.calcItemDimensions = _this.calcItemDimensions.bind(_this);
    _this.calcItemsAmountToRender = _this.calcItemsAmountToRender.bind(_this);
    var index = _this.calcIndex();
    _this.state = {
      selectedIndex: index,
      prevIndex: index,
      pauseWheelEvent: false
    };
    var next = function next() {
      var index = _this.state.selectedIndex;
      if (index + 1 < _this.props.imagesArr.length) {
        _this.selectItem(index + 1);
      }
    };
    var previous = function previous() {
      var index = _this.state.selectedIndex;
      if (index > 0) {
        _this.selectItem(index - 1);
      }
    };
    var keysConfig = {
      left: previous,
      right: next,
      up: next,
      down: previous
    };
    var touchConfig = {
      left: next,
      right: previous,
      up: next,
      down: previous
    };
    _swipeReact2.default.config(touchConfig);
    _wheelReact2.default.config(touchConfig);
    _arrowKeysReact2.default.config(keysConfig);
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
      return _react2.default.createElement(
        'div',
        _extends({ tabIndex: '0',
          style: this.props.containerStyles
        }, _swipeReact2.default.events, _wheelReact2.default.events, _arrowKeysReact2.default.events, {
          ref: function ref(coverflow) {
            _this2.coverflow = coverflow;
          } }),
        items.map(function (item) {
          return _react2.default.createElement(_Item2.default, {
            side: item.side,
            max: Math.floor(_this2.calcItemsAmountToRender() / 2),
            distance: item.distance,
            imgUrl: item.imgUrl,
            selectItem: _this2.selectItem,
            index: item.index,
            zIndex: _this2.props.zIndex,
            height: itemHeight,
            width: itemWidth,
            label: item.label,
            direction: _this2.props.direction,
            key: item.index });
        })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.coverflow.focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _wheelReact2.default.clearTimeout();
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
      var AMOUNT_TO_RENDER = this.calcItemsAmountToRender();
      var SIDE_AMOUNT = Math.floor(AMOUNT_TO_RENDER / 2);

      var index = this.state.selectedIndex;
      var imagesArr = JSON.parse(JSON.stringify(this.props.imagesArr));
      var items = imagesArr.map(function (imgUrl, index) {
        return { imgUrl: imgUrl, index: index, label: null };
      });

      for (var i = 0; i < this.props.labelsArr.length; i++) {
        items[i].label = this.props.labelsArr[i];
      }
      items[index].side = _SIDES2.default.CENTER;
      items[index].distance = 0;

      var fromIndex = Math.max(0, index - SIDE_AMOUNT);
      var untilIndex = Math.min(imagesArr.length, index + SIDE_AMOUNT + 1);

      for (var _i = fromIndex; _i < index; _i++) {
        items[_i].side = _SIDES2.default.LEFT;
        items[_i].distance = index - _i;
      }

      for (var _i2 = index + 1; _i2 < untilIndex; _i2++) {
        items[_i2].side = _SIDES2.default.RIGHT;
        items[_i2].distance = _i2 - index;
      }

      if (items.length < AMOUNT_TO_RENDER) {
        return items;
      }

      // calc removed items, in order to animate them.
      var amount = index - this.state.prevIndex;
      if (amount > 0 && fromIndex > SIDE_AMOUNT) {
        for (var _i3 = fromIndex - amount; _i3 < fromIndex; _i3++) {
          items[_i3].side = _SIDES2.default.REMOVED_LEFT;
          items[_i3].distance = index - _i3;
        }
        fromIndex -= amount;
      } else if (amount < 0) {
        amount *= -1;
        if (untilIndex + amount < items.length) {
          for (var _i4 = untilIndex; _i4 < untilIndex + amount; _i4++) {
            if (!items[_i4]) {
              debugger;
            }
            items[_i4].side = _SIDES2.default.REMOVED_RIGHT;
            items[_i4].distance = _i4 - index;
          }
          untilIndex += amount;
        }
      }

      return items.slice(fromIndex, untilIndex);
    }
  }, {
    key: 'calcIndex',
    value: function calcIndex() {
      var length = this.props.imagesArr.length;
      if (length === 0) {
        return -1;
      }
      if (length > 10) {
        return 5;
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

      var itemWidth = void 0,
          itemHeight = void 0;
      if (this.props.direction === 'vertical') {
        itemWidth = this.props.width - 70;
        itemHeight = itemWidth * ratio.y / ratio.x;
      } else {
        itemHeight = this.props.height - 60;
        itemWidth = itemHeight * ratio.x / ratio.y;
      }
      return [itemWidth, itemHeight];
    }
  }, {
    key: 'calcItemsAmountToRender',
    value: function calcItemsAmountToRender() {
      var amount = void 0;
      if (this.props.direction === 'vertical') {
        var containerHeight = this.props.height;
        var itemHeight = void 0;

        var _calcItemDimensions3 = this.calcItemDimensions();

        var _calcItemDimensions4 = _slicedToArray(_calcItemDimensions3, 2);

        itemHeight = _calcItemDimensions4[1];

        amount = Math.floor(containerHeight / itemHeight) * 2 - 4;
      } else {
        var containerWidth = this.props.width;
        var itemWidth = void 0;

        var _calcItemDimensions5 = this.calcItemDimensions();

        var _calcItemDimensions6 = _slicedToArray(_calcItemDimensions5, 1);

        itemWidth = _calcItemDimensions6[0];

        amount = Math.floor(containerWidth / itemWidth) * 2 - 3;
      }
      if (amount < 3) {
        amount = 3;
      } else if (amount > 11) {
        amount = 11;
      }
      return Math.min(amount, this.props.imagesArr.length);
    }
  }]);

  return Container;
}(_react2.default.Component);

Container.propTypes = {
  imagesArr: _propTypes2.default.array.isRequired,
  zIndex: _propTypes2.default.number,
  height: _propTypes2.default.number,
  background: _propTypes2.default.string,
  border: _propTypes2.default.string,
  boxShadow: _propTypes2.default.string,
  itemRatio: _propTypes2.default.string,
  handleSelect: _propTypes2.default.func
};

exports.default = Container;