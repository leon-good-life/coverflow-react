import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SIDES from './SIDES'
import CoverFlowItem from './CoverFlowItem';

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
    let styles = {
      textAlign: 'center',
      perspective: '400px',
      background: 'lightgray',
      margin: '0px',
      position: 'relative',
      height: `${this.props.height}px`,
      boxSizing: 'border-box',
      padding: '25px',
      outline: 'transparent',
    };
    _.assign(styles, this.props.containerStyle);

    if (this.state.items.length === 0) {
      return (
        <div style={styles}>
          <div style={{
            display: 'inline-block',
            position: 'absolute',
            left: '50%',
            top: '50%'
          }}>No items to show.</div>
        </div>
      )
    }
    return(
      <div tabIndex="0" onKeyDown={this.handleKeyDown} style={styles}>
        {this.state.items.map((item, index)=>{
          return <CoverFlowItem 
                    side={item.side} 
                    distance={item.distance} 
                    imgUrl={item.imgUrl}
                    selectItem={this.selectItem}
                    index={index}
                    zIndex={this.props.zIndex}
                    height={this.props.height-60}
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

CoverFlow.propTypes = {
  imagesArr: PropTypes.array.isRequired,
  zIndex: PropTypes.number
};

CoverFlow.defaultProps = {
  zIndex: 100,
  height: 300
};

export default CoverFlow;