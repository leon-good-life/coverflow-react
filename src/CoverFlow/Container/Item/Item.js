import React from 'react';
import PropTypes from 'prop-types';
import SIDES from '../SIDES'
import cssTransform from './cssTransform';
import './transition.css';

class Item extends React.Component {
  constructor(props){
    super(props);
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
      styles.transform = cssTransform(this.props.side, this.props.distance);
    }
    if (this.props.side === SIDES.CENTER){
      styles.zIndex = this.props.zIndex;
    } else if (this.props.side === SIDES.RIGHT){
      styles.zIndex = this.props.zIndex - this.props.distance;
    } else if (this.props.side === SIDES.REMOVED_RIGHT){
      styles.zIndex = this.props.zIndex - this.props.distance - 1;
    }
    return(
      <div 
          style={styles}
          className={this.state.tempClassName}
          onClick={()=>{
            this.props.selectItem(this.props.index);
          }}
      ></div>
    );
  }
  componentWillMount(){
    let tempClassName;
    if (this.props.side === SIDES.LEFT){
      tempClassName = 'initial-left';
    } else if (this.props.side === SIDES.RIGHT) {
      tempClassName = 'initial-right';
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
      tempClassName = 'initial-left';
    } else if (this.props.side === SIDES.RIGHT) {
      tempClassName = 'initial-right';
    } else {
      tempClassName = '';
    }
    this.setState({tempClassName});
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