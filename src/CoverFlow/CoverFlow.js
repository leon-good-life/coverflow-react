import React from 'react';

import Container from './Container/Container';

export const CoverFlow = (props) => {
  const {
    zIndex = 100,
    direction = 'horizontal',
    background = '#333333',
    border = 'none',
    boxShadow = 'none',
    emptyMessage = 'No items to show.',
    itemRatio = '8:5',
    labelsArr = [],
    containerStyles,
    imagesArr,
    handleSelect,
    width,
    height,
    defaultSelectedItem,
  } = props;

  let cWidth, cHeight;
  if (direction === 'vertical') {
    cWidth = isNaN(width) ? 250 : width;
    cHeight = isNaN(height) ? document.body.offsetHeight : height;
  } else {
    cHeight = isNaN(height) ? 250 : height;
    cWidth = isNaN(width) ? document.body.offsetWidth : width;
  }

  let styles = {
    textAlign: 'center',
    perspective: '400px',
    margin: '0px',
    position: 'relative',
    height: `${cHeight}px`,
    width: `${cWidth}px`,
    display: 'inline-block',
    boxSizing: 'border-box',
    padding: '25px',
    outline: 'transparent',
    background: background,
    border: border,
    boxShadow: boxShadow,
  };

  return imagesArr.length === 0 ? (
    <div style={containerStyles}>
      <div
        style={{
          display: 'inline-block',
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      >
        {emptyMessage}
      </div>
    </div>
  ) : (
    <Container
      containerStyles={styles}
      imagesArr={imagesArr}
      labelsArr={labelsArr}
      itemRatio={itemRatio}
      zIndex={zIndex}
      handleSelect={handleSelect}
      height={cHeight}
      width={cWidth}
      background={background}
      border={border}
      boxShadow={boxShadow}
      direction={direction}
      defaultSelectedItem={defaultSelectedItem}
    />
  );
};
