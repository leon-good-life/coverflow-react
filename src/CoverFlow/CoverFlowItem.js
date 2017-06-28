import React from 'react';
import PropTypes from 'prop-types';
import SIDES from './SIDES'
import cssTransform from './cssTransform';
import './CoverFlowItem.css';

class CoverFlowItem extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let styles = {
      backgroundImage: `url('${this.props.imgUrl}')`
    };
    if (this.props.side === SIDES.LEFT || this.props.side === SIDES.RIGHT) {
      styles.transform = cssTransform(this.props.side, this.props.distance);
    }
    if (this.props.side === SIDES.CENTER){
      styles.zIndex = this.props.zIndex;
    } else if (this.props.side === SIDES.RIGHT){
      styles.zIndex = this.props.zIndex - this.props.distance;
    }
    return(
      <div 
          className="coverflow-item" 
          style={styles}
          onClick={()=>{
            this.props.selectItem(this.props.index);
          }}
      ></div>
    );
  }
}

CoverFlowItem.propTypes = {
  zIndex: PropTypes.number
};

CoverFlowItem.defaultProps = {
  zIndex: 100
};

export default CoverFlowItem;