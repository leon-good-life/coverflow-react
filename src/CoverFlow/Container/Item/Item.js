import React, { useEffect } from 'react';

import SIDES from '../SIDES';

export const Item = (props) => {
  const {
    width,
    height,
    side,
    direction,
    distance,
    zIndex = 100,
    label,
    index,
    imgUrl,
    max,
    selectItem,
  } = props;

  const [cState, setCState] = useState({
    tempTransform: null,
  });

  const cssTransform = (side, distance) => {
    const template = (deg, x, z) =>
      `rotateY(${deg}deg) translate3d(${x}px, 0px, ${z}px)`;

    const a = Math.floor(width / 3);
    const z = (-1 * a * distance - a) * 1.08;

    const left = {
      deg: 45,
      x: -1 * a * distance,
      z,
    };

    const right = {
      deg: -45,
      x: a * distance,
      z,
    };

    if (side === SIDES.LEFT) {
      return template(left.deg, left.x, left.z);
    } else if (side === SIDES.RIGHT) {
      return template(right.deg, right.x, right.z);
    } else if (side === SIDES.REMOVED_LEFT) {
      return cssTransform(SIDES.LEFT, max);
    } else if (side === SIDES.REMOVED_RIGHT) {
      return cssTransform(SIDES.RIGHT, max);
    } else {
      throw 'Error: side is undefined or invalid.';
    }
  };

  const cssTransformVertical = (side, distance) => {
    const template = (deg, y, z) =>
      `rotateX(${deg}deg) translate3d(0px, ${y}px, ${z}px)`;

    const a = Math.floor(height / 3);
    const z = (-1 * a * distance - a) * 1.08;

    const up = {
      deg: -45,
      y: -1 * a * distance,
      z,
    };

    const down = {
      deg: 45,
      y: a * distance,
      z,
    };

    if (side === SIDES.LEFT) {
      return template(up.deg, up.y, up.z);
    } else if (side === SIDES.RIGHT) {
      return template(down.deg, down.y, down.z);
    } else if (side === SIDES.REMOVED_LEFT) {
      return cssTransformVertical(SIDES.LEFT, max);
    } else if (side === SIDES.REMOVED_RIGHT) {
      return cssTransformVertical(SIDES.RIGHT, max);
    } else {
      throw 'Error: side is undefined or invalid.';
    }
  };

  const timeout = setTimeout(() => {
    setCState({ tempTransform: '' });
  }, 100);

  useEffect(() => {
    let tempTransform;
    if (direction === 'vertical') {
      if (side === SIDES.LEFT || side === SIDES.RIGHT) {
        tempTransform = cssTransformVertical(side, max);
      } else {
        tempTransform = '';
      }
    } else {
      if (side === SIDES.LEFT || side === SIDES.RIGHT) {
        tempTransform = cssTransform(side, max);
      } else {
        tempTransform = '';
      }
    }
    setCState({ tempTransform });

    return () => {
      clearTimeout(timeout);

      let tempTransform;
      if (direction === 'vertical') {
        if (side === SIDES.LEFT || side === SIDES.RIGHT) {
          tempTransform = cssTransformVertical(side, max);
        } else {
          tempTransform = '';
        }
      } else {
        if (side === SIDES.LEFT || side === SIDES.RIGHT) {
          tempTransform = cssTransform(side, max);
        } else {
          tempTransform = '';
        }
      }
      setCState({ tempTransform });
    };
  }, []);

  let styles = {
    left: `calc(50% - ${width}px / 2)`,
    top: `calc(50% - ${height}px / 2)`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundSize: `${width}px ${height}px`,
    display: 'inline-block',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    transitionTimingFunction: 'ease-in-out',
    transition: 'transform 750ms',
    transform: null,
    zIndex: 100,
  };
  if (side !== SIDES.CENTER) {
    if (cState.tempTransform !== '') {
      styles.transform = cState.tempTransform;
    } else {
      if (direction === 'vertical') {
        styles.transform = cssTransformVertical(side, distance);
      } else {
        styles.transform = cssTransform(side, distance);
      }
    }
  }
  if (side === SIDES.CENTER) {
    styles.zIndex = zIndex;
  } else if (side === SIDES.RIGHT) {
    styles.zIndex = zIndex - distance;
  } else if (side === SIDES.REMOVED_RIGHT) {
    styles.zIndex = zIndex - distance - 1;
  }
  let labelJsx = '';
  if (label !== null) {
    labelJsx = (
      <div
        style={{
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '5px',
          bottom: '0',
          position: 'absolute',
          width: '100%',
          boxSizing: 'border-box',
          userSelect: 'none',
        }}
      >
        {label}
      </div>
    );
  }
  return (
    <div
      style={styles}
      onClick={() => {
        selectItem(index);
      }}
    >
      <img
        src={imgUrl}
        style={{
          boxShadow:
            '30px 5px 15px -10px rgba(0,0,0,.15), -30px 5px 15px -10px rgba(0,0,0,.15)',
          height: `${height}px`,
          objectFit: 'scale-down',
        }}
      />
      {labelJsx}
    </div>
  );
};
