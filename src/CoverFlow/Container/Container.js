import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SIDES from './SIDES'
import Item from './Item/Item';
import SwipeReact from 'swipe-react';
import WheelReact from 'wheel-react';
import ArrowKeysReact from 'arrow-keys-react';

class Container extends React.Component {
  constructor(props){
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.prepareItems = this.prepareItems.bind(this);
    this.calcIndex = this.calcIndex.bind(this);
    this.calcItemDimensions = this.calcItemDimensions.bind(this);
    this.calcItemsAmountToRender = this.calcItemsAmountToRender.bind(this);
    let index = this.calcIndex();
    this.state = {
      selectedIndex: index,
      prevIndex: index,
      pauseWheelEvent: false
    };
    let next = () => {
      let index = this.state.selectedIndex;
      if(index + 1 < this.props.imagesArr.length){
        this.selectItem(index + 1);
      }
    };
    let previous = () => {
      let index = this.state.selectedIndex;
      if(index > 0){
        this.selectItem(index - 1);
      }
    };
    let keysConfig = {
      left: previous,
      right: next,
      up: next,
      down: previous
    };
    let touchConfig = {
      left: next,
      right: previous,
      up: next,
      down: previous
    };
    SwipeReact.config(touchConfig);
    WheelReact.config(touchConfig);
    ArrowKeysReact.config(keysConfig);
  }
  render(){
    let itemWidth, itemHeight;
    [itemWidth, itemHeight] = this.calcItemDimensions();
    let items = this.prepareItems();
    return(
      <div tabIndex="0" 
           style={this.props.containerStyles} 
           {...SwipeReact.events}
           {...WheelReact.events}
           {...ArrowKeysReact.events}
           ref={(coverflow) => { 
             this.coverflow = coverflow; 
           }}>
        {items.map((item)=>{
          return <Item 
                    side={item.side} 
                    max={Math.floor(this.calcItemsAmountToRender()/2)}
                    distance={item.distance} 
                    imgUrl={item.imgUrl}
                    selectItem={this.selectItem}
                    index={item.index}
                    zIndex={this.props.zIndex}
                    height={itemHeight}
                    width={itemWidth}
                    label={item.label}
                    direction={this.props.direction}
                    key={item.index} />;
        })}
      </div>
    );
  }
  componentDidMount(){
    this.coverflow.focus();
  }
  componentWillUnmount(){
    WheelReact.clearTimeout();
  }
  selectItem(index){
    this.setState((prevState)=>({
      selectedIndex: index,
      prevIndex: prevState.selectedIndex
    }));
    if (this.props.handleSelect) {
      this.props.handleSelect(index);
    }
  }
  prepareItems(){
    if (this.props.imagesArr.length === 0){
      return [];
    }
    const AMOUNT_TO_RENDER = this.calcItemsAmountToRender();
    const SIDE_AMOUNT = Math.floor(AMOUNT_TO_RENDER / 2);

    const index = this.state.selectedIndex;
    const imagesArr = _.cloneDeep(this.props.imagesArr);
    const items = imagesArr.map((imgUrl, index)=>({imgUrl, index, label: null}));

    for (let i = 0; i < this.props.labelsArr.length; i++) {
      items[i].label = this.props.labelsArr[i];
    }
    items[index].side = SIDES.CENTER;
    items[index].distance = 0;

    let fromIndex = Math.max(0, index - SIDE_AMOUNT);
    let untilIndex = Math.min(imagesArr.length, index + SIDE_AMOUNT+1);

    for(let i = fromIndex; i < index; i++){
      items[i].side = SIDES.LEFT;
      items[i].distance = index - i;
    }

    for(let i = index + 1; i < untilIndex; i++){
      items[i].side = SIDES.RIGHT;
      items[i].distance = i - index;
    }

    if (items.length < AMOUNT_TO_RENDER){
      return items;
    }

    // calc removed items, in order to animate them.
    let amount = index - this.state.prevIndex;
    if (amount > 0 && fromIndex > SIDE_AMOUNT) {
      for(let i = fromIndex - amount; i < fromIndex; i++){
        items[i].side = SIDES.REMOVED_LEFT;
        items[i].distance = index - i;
      }
      fromIndex -= amount;
    } else if (amount < 0) {
      amount *= -1;
      if(untilIndex + amount < items.length){
        for(let i = untilIndex; i < untilIndex + amount; i++){
          if(!items[i]){
            debugger;
          }
          items[i].side = SIDES.REMOVED_RIGHT;
          items[i].distance = i - index;
        }
        untilIndex += amount;
      }
    }

    return items.slice(fromIndex, untilIndex);
  }
  calcIndex(){
    const length = this.props.imagesArr.length;
    if (length === 0) {
      return -1;
    }
    if (length > 10) {
      return 4;
    }
    return parseInt(this.props.imagesArr.length / 2, 10);
  }
  calcItemDimensions(){
    let ratio = {};
    [ratio.x, ratio.y] = this.props.itemRatio.split(':').map(x=>parseFloat(x));
    let itemWidth, itemHeight;
    if (this.props.direction === 'vertical') {
      itemWidth = this.props.width - 70;
      itemHeight = itemWidth * ratio.y / ratio.x;
    } else {
      itemHeight = this.props.height - 60;
      itemWidth = itemHeight * ratio.x / ratio.y;
    }
    return [itemWidth, itemHeight];
  }
  calcItemsAmountToRender(){
    let amount;
    if (this.props.direction === 'vertical') {
      const containerHeight = this.props.height;
      let itemHeight;
      [,itemHeight] = this.calcItemDimensions();
      amount = Math.floor(containerHeight / itemHeight) * 2 - 4;
    } else {
      const containerWidth = this.props.width;
      let itemWidth;
      [itemWidth,] = this.calcItemDimensions();
      amount = Math.floor(containerWidth / itemWidth) * 2 - 3;
    }
    if (amount < 3) {
      amount = 3;
    } else if (amount > 11) {
      amount = 11;
    }
    return Math.min(amount, this.props.imagesArr.length);
  }
}

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