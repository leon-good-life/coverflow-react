import React from 'react';
import PropTypes from 'prop-types';
import SIDES from '../SIDES';

class Item extends React.Component {
  constructor(props){
    super(props);
    this.cssTransform = this.cssTransform.bind(this);
    this.cssTransformVertical = this.cssTransformVertical.bind(this);
    this.state = {tempTransform: ''};
  }
  render(){
    let styles = {
      backgroundImage: `url('${this.props.imgUrl}')`,
      left: `calc(50% - ${this.props.width}px / 2)`,
      top: `calc(50% - ${this.props.height}px / 2)`,
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      backgroundSize: `${this.props.width}px ${this.props.height}px`,
      display: 'inline-block',
      position: 'absolute',
      backgroundColor: 'greenyellow',
      transitionTimingFunction: 'ease-in-out',
      transition: 'transform 750ms',
      boxShadow: '30px 5px 15px -10px rgba(0,0,0,.15), -30px 5px 15px -10px rgba(0,0,0,.15)',
    };
    if (this.props.side !== SIDES.CENTER) {
      if (this.state.tempTransform !== ''){
        styles.transform = this.state.tempTransform;
      } else {
        if (this.props.direction === 'vertical') {
          styles.transform = this.cssTransformVertical(this.props.side, this.props.distance);
        } else {
          styles.transform = this.cssTransform(this.props.side, this.props.distance);
        }
      }
    }
    if (this.props.side === SIDES.CENTER){
      styles.zIndex = this.props.zIndex;
    } else if (this.props.side === SIDES.RIGHT){
      styles.zIndex = this.props.zIndex - this.props.distance;
    } else if (this.props.side === SIDES.REMOVED_RIGHT){
      styles.zIndex = this.props.zIndex - this.props.distance - 1;
    }
    let labelJsx = '';
    if (this.props.label !== null) {
      labelJsx = (
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '5px',
          bottom: '0',
          position: 'absolute',
          width: '100%',
          boxSizing: 'border-box',
          userSelect: 'none'
        }}>{this.props.label}</div>
      );
    }
    return(
      <div 
          style={styles}
          onClick={()=>{
            this.props.selectItem(this.props.index);
          }}
      >{labelJsx}</div>
    );
  }
  componentWillMount(){
    let tempTransform;
    if(this.props.direction === 'vertical') {
      if (this.props.side === SIDES.LEFT || this.props.side === SIDES.RIGHT){
        tempTransform = this.cssTransformVertical(this.props.side, this.props.max);
      } else {
        tempTransform = '';
      }
    } else {
      if (this.props.side === SIDES.LEFT || this.props.side === SIDES.RIGHT){
        tempTransform = this.cssTransform(this.props.side, this.props.max);
      } else {
        tempTransform = '';
      }
    }
    this.setState({tempTransform});
  }
  componentDidMount(){
    this.timeout = setTimeout(()=>{
      this.setState({tempTransform: ''});
    }, 100);
  }
  componentWillUnmount(){
    if (this.timeout){
      clearTimeout(this.timeout);
    }
    let tempTransform;
    if(this.props.direction === 'vertical') {
      if (this.props.side === SIDES.LEFT || this.props.side === SIDES.RIGHT){
        tempTransform = this.cssTransformVertical(this.props.side, this.props.max);
      } else {
        tempTransform = '';
      }
    } else {
      if (this.props.side === SIDES.LEFT || this.props.side === SIDES.RIGHT){
        tempTransform = this.cssTransform(this.props.side, this.props.max);
      } else {
        tempTransform = '';
      }
    }
    this.setState({tempTransform});
  }
  cssTransform(side, distance){
    const template = (deg, x, z) =>
      `rotateY(${deg}deg) translate3d(${x}px, 0px, ${z}px)`;

    const a = Math.floor(this.props.width / 3);
    const z = (-1*a * distance - a) * 1.08;

    const left = {
      deg: 45,
      x: -1*a * distance,
      z
    };

    const right = {
      deg: -45,
      x: a * distance,
      z
    };

    if (side === SIDES.LEFT) {
      return template(left.deg, left.x, left.z);
    } else if (side === SIDES.RIGHT) {
      return template(right.deg, right.x, right.z);
    } else if (side === SIDES.REMOVED_LEFT){
      return this.cssTransform(SIDES.LEFT, this.props.max);
    } else if (side === SIDES.REMOVED_RIGHT){
      return this.cssTransform(SIDES.RIGHT, this.props.max);
    } else {
      throw 'Error: side is undefined or invalid.';
    }
  }
  cssTransformVertical(side, distance){
    const template = (deg, y, z) =>
      `rotateX(${deg}deg) translate3d(0px, ${y}px, ${z}px)`;

    const a = Math.floor(this.props.height / 3);
    const z = (-1 * a * distance - a) * 1.08;

    const up = {
      deg: -45,
      y: -1 * a * distance,
      z
    };

    const down = {
      deg: 45,
      y: a * distance,
      z
    };

    if (side === SIDES.LEFT) {
      return template(up.deg, up.y, up.z);
    } else if (side === SIDES.RIGHT) {
      return template(down.deg, down.y, down.z);
    } else if (side === SIDES.REMOVED_LEFT){
      return this.cssTransformVertical(SIDES.LEFT, this.props.max);
    } else if (side === SIDES.REMOVED_RIGHT){
      return this.cssTransformVertical(SIDES.RIGHT, this.props.max);
    } else {
      throw 'Error: side is undefined or invalid.';
    }
  }
}

Item.propTypes = {
  side: PropTypes.oneOf([SIDES.LEFT, SIDES.CENTER, SIDES.RIGHT, SIDES.REMOVED_RIGHT, SIDES.REMOVED_LEFT]).isRequired,
  zIndex: PropTypes.number,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

Item.defaultProps = {
  zIndex: 100
};

export default Item;