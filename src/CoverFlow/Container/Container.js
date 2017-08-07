import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SIDES from './SIDES'
import Item from './Item/Item';

class Container extends React.Component {
  constructor(props){
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.prepareItems = this.prepareItems.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.calcIndex = this.calcIndex.bind(this);
    this.calcItemDimensions = this.calcItemDimensions.bind(this);
    this.calcItemsAmountToRender = this.calcItemsAmountToRender.bind(this);
    let index = this.calcIndex();
    this.state = {
      selectedIndex: index,
      prevIndex: index,
      xDown: null,
      yDown: null,
      pauseWheelEvent: false
    };
  }
  render(){
    let itemWidth, itemHeight;
    [itemWidth, itemHeight] = this.calcItemDimensions();
    let items = this.prepareItems();
    return(
      <div tabIndex="0" 
           onKeyDown={this.handleKeyDown} 
           style={this.props.containerStyles} 
           onTouchStart={this.handleTouchStart}
           onTouchMove={this.handleTouchMove}
           onWheel={this.handleWheel}
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
                    key={item.index} />;
        })}
      </div>
    );
  }
  componentWillUnmount(){
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
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
    const items = imagesArr.map((imgUrl, index)=>({imgUrl, index}));

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
  handleKeyDown(e){
    let index = this.state.selectedIndex;
    if (e.keyCode === 37){
      // left
      if(index > 0){
        this.selectItem(index - 1);
      }
    } else if (e.keyCode === 39) {
      // right
      if(index + 1 < this.props.imagesArr.length){
        this.selectItem(index + 1);
      }
    }
  }
  handleWheel(e){
      if (this.state.pauseWheelEvent) {
        return;
      }
      let index = this.state.selectedIndex;
      if (e.deltaX < 0) {
        if(index + 1 < this.props.imagesArr.length){
          this.selectItem(index + 1);
        }
      } else if (e.deltaX > 0) {
        if(index > 0){
          this.selectItem(index - 1);
        }
      }
      this.setState({pauseWheelEvent: true});
      this.timeout = setTimeout(()=>{
        this.setState({pauseWheelEvent: false});
      }, 200);
  }
  handleTouchStart(e){
    this.setState({
      xDown: e.touches[0].clientX,
      yDown: e.touches[0].clientY,
    });
  }
  handleTouchMove(e){

    if (this.state.xDown === null || this.state.yDown === null) {
        return;
    }

    let index = this.state.selectedIndex;

    let xUp = e.touches[0].clientX;                                    
    let yUp = e.touches[0].clientY;

    let xDiff = this.state.xDown - xUp;
    let yDiff = this.state.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0){
          if(index + 1 < this.props.imagesArr.length){
            this.selectItem(index + 1);
          }
        } else{
          if(index > 0){
            this.selectItem(index - 1);
          }
        }                       
    } else {
        if (yDiff > 0) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    this.setState({
      xDown: null,
      yDown: null,
    });
  }
  componentDidMount(){
    this.coverflow.focus();
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
    const itemHeight = this.props.height - 60;
    const itemWidth = itemHeight * ratio.x / ratio.y;
    return [itemWidth, itemHeight];
  }
  calcItemsAmountToRender(){
    const containerWidth = this.props.width;
    let itemWidth;
    [itemWidth,] = this.calcItemDimensions();
    let amount = Math.floor(containerWidth / itemWidth) * 2 - 3;
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