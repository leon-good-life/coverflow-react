import SIDES from '../SIDES';

function cssTransform(side, distance){

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
    return cssTransform(SIDES.LEFT, 4);
  } else if (side === SIDES.REMOVED_RIGHT){
    return cssTransform(SIDES.RIGHT, 4);
  } else {
    throw 'Error: side is undefined or invalid.';
  }
}

export default cssTransform;