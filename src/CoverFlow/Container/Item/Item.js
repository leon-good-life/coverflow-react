import React from 'react';
import PropTypes from 'prop-types';
import SIDES from '../SIDES';
import './transition.css';

class Item extends React.Component {
  constructor(props){
    super(props);
    this.cssTransform = this.cssTransform.bind(this);
    this.state = {tempClassName: ''};
  }
  render(){
    let styles = {
      backgroundImage: `url('${this.props.imgUrl}')`,
      left: `calc(50% - ${this.props.width}px / 2)`,
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
    if (this.props.side === SIDES.LEFT || this.props.side === SIDES.RIGHT
          || this.props.side === SIDES.REMOVED_LEFT || this.props.side === SIDES.REMOVED_RIGHT) {
      styles.transform = this.cssTransform(this.props.side, this.props.distance);
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
          className={this.state.tempClassName}
          onClick={()=>{
            this.props.selectItem(this.props.index);
          }}
      >{labelJsx}</div>
    );
  }
  componentWillMount(){
    let tempClassName;
    if (this.props.side === SIDES.LEFT){
      tempClassName = `initial-left-${this.props.max}`;
    } else if (this.props.side === SIDES.RIGHT) {
      tempClassName = `initial-right-${this.props.max}`;
    } else {
      tempClassName = '';
    }
    this.setState({tempClassName});
  }
  componentDidMount(){
    this.timeout = setTimeout(()=>{
      this.setState({tempClassName: ''});
    }, 100);
  }
  componentWillUnmount(){
    if (this.timeout){
      clearTimeout(this.timeout);
    }
    let tempClassName;
    if (this.props.side === SIDES.LEFT){
      tempClassName = `initial-left-${this.props.max}`;
    } else if (this.props.side === SIDES.RIGHT) {
      tempClassName = `initial-right-${this.props.max}`;
    } else {
      tempClassName = '';
    }
    this.setState({tempClassName});
  }
  cssTransform(side, distance){
    const template = (deg, x, z) =>
      `rotateY(${deg}deg) translate3d(${x}px, 0px, ${z}px)`;

    const z = -100 * distance - 100;

    const left = {
      deg: 45,
      x: -100 * distance,
      z
    };

    const right = {
      deg: -45,
      x: 100 * distance,
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