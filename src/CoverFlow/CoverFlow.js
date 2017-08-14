import React from 'react';
import PropTypes from 'prop-types';
import EmptyContainer from './Container/EmptyContainer';
import Container from './Container/Container';

class CoverFlow extends React.Component {
  render(){
    let styles = {
      textAlign: 'center',
      perspective: '400px',
      margin: '0px',
      position: 'relative',
      height: `${this.props.height}px`,
      width: `${this.props.width}px`,
      display: 'inline-block',
      boxSizing: 'border-box',
      padding: '25px',
      outline: 'transparent',
      background: this.props.background,
      border: this.props.border,
      boxShadow: this.props.boxShadow
    };

    if (this.props.imagesArr.length === 0) {
      return <EmptyContainer 
                containerStyles={styles}
                emptyMessage={this.props.emptyMessage}
                height={this.props.height}
                width={this.props.width}
                background={this.props.background}
                border={this.props.border}
                boxShadow={this.props.boxShadow} />;
    }
    return <Container 
                containerStyles={styles}
                imagesArr={this.props.imagesArr}
                labelsArr={this.props.labelsArr}
                itemRatio={this.props.itemRatio}
                zIndex={this.props.zIndex}
                handleSelect={this.props.handleSelect}
                height={this.props.height}
                width={this.props.width}
                background={this.props.background}
                border={this.props.border}
                boxShadow={this.props.boxShadow} />;
  }
}

CoverFlow.propTypes = {
  imagesArr: PropTypes.array.isRequired,
  zIndex: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  background: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.string,
  emptyMessage: PropTypes.string,
  itemRatio: PropTypes.string,
  handleSelect: PropTypes.func,
  labelsArr: PropTypes.array
};

CoverFlow.defaultProps = {
  zIndex: 100,
  height: 250,
  width: document.body.offsetWidth,
  background: 'lightgray',
  border: 'none',
  boxShadow: 'none',
  emptyMessage: 'No items to show.',
  itemRatio: '8:5',
  labelsArr: []
};

export default CoverFlow;