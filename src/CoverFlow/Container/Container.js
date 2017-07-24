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
    this.calcIndex = this.calcIndex.bind(this);
    let index = this.calcIndex();
    this.state = {
      selectedIndex: index,
      prevIndex: index
    };
  }
  render(){
    let ratio = {};
    [ratio.x, ratio.y] = this.props.itemRatio.split(':').map(x=>parseFloat(x));
    const itemHeight = this.props.height - 60;
    const itemWidth = itemHeight * ratio.x / ratio.y;

    let items = this.prepareItems();
    return(
      <div tabIndex="0" 
           onKeyDown={this.handleKeyDown} 
           style={this.props.containerStyles} 
           ref={(coverflow) => { 
             this.coverflow = coverflow; 
           }}>
        {items.map((item)=>{
          return <Item 
                    side={item.side} 
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
    const index = this.state.selectedIndex;
    const imagesArr = _.cloneDeep(this.props.imagesArr);
    const items = imagesArr.map((imgUrl, index)=>({imgUrl, index}));

    items[index].side = SIDES.CENTER;
    items[index].distance = 0;

    let fromIndex = Math.max(0, index - 4);
    let untilIndex = Math.min(imagesArr.length, index + 5);

    for(let i = fromIndex; i < index; i++){
      items[i].side = SIDES.LEFT;
      items[i].distance = index - i;
    }

    for(let i = index + 1; i < untilIndex; i++){
      items[i].side = SIDES.RIGHT;
      items[i].distance = i - index;
    }

    if (items.length < 10){
      return items;
    }

    // calc removed items, in order to animate them.
    let amount = index - this.state.prevIndex;
    if (amount > 0 && fromIndex > 4) {
      for(let i = fromIndex - amount; i < fromIndex; i++){
        items[i].side = SIDES.REMOVED_LEFT;
        items[i].distance = index - i;
      }
      fromIndex -= amount;
    } else if (amount < 0 && untilIndex + amount < items.length - 5) {
      amount *= -1;
      for(let i = untilIndex; i < untilIndex + amount; i++){
        items[i].side = SIDES.REMOVED_RIGHT;
        items[i].distance = i - index;
      }
      untilIndex += amount;
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