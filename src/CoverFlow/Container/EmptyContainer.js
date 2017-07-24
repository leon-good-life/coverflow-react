import React from 'react';
import PropTypes from 'prop-types';

class EmptyContainer extends React.Component {
  render(){
    return (
      <div style={this.props.containerStyles}>
        <div style={{
          display: 'inline-block',
          position: 'absolute',
          left: '50%',
          top: '50%'
        }}>{this.props.emptyMessage}</div>
      </div>
    )
  }
}

EmptyContainer.propTypes = {
  emptyMessage: PropTypes.string,
  height: PropTypes.number,
  background: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.string
};

export default EmptyContainer;