import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SIDES from './SIDES'
import CoverFlowItem from './CoverFlowItem';
import './CoverFlow.css';

class CoverFlow extends React.Component {
  constructor(props){
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.createItems = this.createItems.bind(this);
    this.fillSideAndDistance = this.fillSideAndDistance.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    const items = this.createItems(this.props.imagesArr);
    this.state = {
      items: items
    };
  }
  render(){
    if (this.state.items.length === 0) {
      return (
        <div className="coverflow coverflow-empty" />
      )
    }
    return(
      <div className="coverflow" tabIndex="0" onKeyDown={this.handleKeyDown}>
        {this.state.items.map((item, index)=>{
          return <CoverFlowItem 
                    side={item.side} 
                    distance={item.distance} 
                    imgUrl={item.imgUrl}
                    selectItem={this.selectItem}
                    index={index}
                    zIndex={this.props.zIndex}
                    key={index} />;
        })}
      </div>
    );
  }
  selectItem(index){
    this.setState((prevState)=>{
      let newClonedState = _.cloneDeep(prevState);
      this.fillSideAndDistance(newClonedState.items, index);
      return newClonedState;
    });
  }
  createItems(imagesArr){
    if (imagesArr.length === 0) {
      return [];
    }
    let items = imagesArr.map(imgUrl=>({imgUrl}));
    const index = parseInt(imagesArr.length / 2, 10);
    this.fillSideAndDistance(items, index);
    return items;
  }
  fillSideAndDistance(items, index){
    items[index].side = SIDES.CENTER;
    items[index].distance = 0;

    for(let i = 0; i < index; i++){
      items[i].side = SIDES.LEFT;
      items[i].distance = index - i;
    }

    for(let i = index + 1; i < items.length; i++){
      items[i].side = SIDES.RIGHT;
      items[i].distance = i - index;
    }
    return items;
  }
  handleKeyDown(e){
    let index = _.findIndex(this.state.items, {'side': SIDES.CENTER});
    if (e.keyCode === 37){
      // left
      if(index > 0){
        this.selectItem(index - 1);
      }
    } else if (e.keyCode === 39) {
      // right
      if(index + 1 < this.state.items.length){
        this.selectItem(index + 1);
      }
    }
  }
}

CoverFlowItem.propTypes = {
  zIndex: PropTypes.number
};

CoverFlowItem.defaultProps = {
  zIndex: 100
};

export default CoverFlow;