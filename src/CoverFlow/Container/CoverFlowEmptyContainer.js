import React from 'react';
import PropTypes from 'prop-types';

class CoverFlowEmptyContainer extends React.Component {
  render(){
    return (
      <div style={this.props.sharedStyles}>
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

CoverFlowEmptyContainer.propTypes = {
  emptyMessage: PropTypes.string,
  height: PropTypes.number,
  background: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.string
};

export default CoverFlowEmptyContainer;