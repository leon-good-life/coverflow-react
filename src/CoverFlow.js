import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SIDES from './SIDES'
import CoverFlowItem from './CoverFlowItem';
import './CoverFlow.css';

class CoverFlow extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.createItems = this.createItems.bind(this);
    this.fillSideAndDistance = this.fillSideAndDistance.bind(this);
    const items = this.createItems(this.props.imagesArr);
    this.state = {
      items: items
    };
  }
  render(){
    return(
      <div className="coverflow">
        {this.state.items.map((item, index)=>{
          return <CoverFlowItem 
                    side={item.side} 
                    distance={item.distance} 
                    imgUrl={item.imgUrl}
                    handleClick={this.handleClick}
                    index={index}
                    zIndex={this.props.zIndex}
                    key={index} />;
        })}
      </div>
    );
  }
  handleClick(index){
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
}

CoverFlowItem.propTypes = {
  zIndex: PropTypes.number
};

CoverFlowItem.defaultProps = {
  zIndex: 100
};

export default CoverFlow;