import React, {
  useEffect,
  useRef,
} from 'react';

import ArrowKeysReact from 'arrow-keys-react';
import SwipeReact from 'swipe-react';
import WheelReact from 'wheel-react';

import Item from './Item/Item';
import SIDES from './SIDES';

export const Container = (props) => {
  const {
    handleSelect,
    imagesArr,
    labelsArr,
    itemRatio,
    width,
    height,
    direction,
    defaultSelectedItem,
    containerStyles,
    zIndex,
  } = props;

  const calcIndex = () => {
    const length = imagesArr.length;
    if (length === 0) {
      return -1;
    }
    if (length > 10) {
      return 5;
    }
    return parseInt(imagesArr.length / 2, 10);
  };

  let index =
    defaultSelectedItem || defaultSelectedItem == 0
      ? defaultSelectedItem
      : calcIndex();

  const [cState, setCState] = useState({
    selectedIndex: index,
    prevIndex: index,
    pauseWheelEvent: false,
  });

  const selectItem = (index) => {
    setCState({
      selectedIndex: index,
      prevIndex: cState.selectedIndex,
    });

    handleSelect?.(index);
  };

  const calcItemDimensions = () => {
    let ratio = {};
    [ratio.x, ratio.y] = itemRatio.split(':').map((x) => parseFloat(x));
    let itemWidth, itemHeight;
    if (direction === 'vertical') {
      itemWidth = width - 70;
      itemHeight = (itemWidth * ratio.y) / ratio.x;
    } else {
      itemHeight = height - 60;
      itemWidth = (itemHeight * ratio.x) / ratio.y;
    }
    return [itemWidth, itemHeight];
  };

  const calcItemsAmountToRender = () => {
    let amount;
    if (direction === 'vertical') {
      const containerHeight = height;
      let itemHeight;
      [, itemHeight] = calcItemDimensions();
      amount = Math.floor(containerHeight / itemHeight) * 2 - 4;
    } else {
      const containerWidth = width;
      let itemWidth;
      [itemWidth] = calcItemDimensions();
      amount = Math.floor(containerWidth / itemWidth) * 2 - 3;
    }
    if (amount < 3) {
      amount = 3;
    } else if (amount > 11) {
      amount = 11;
    }
    return Math.min(amount, imagesArr.length);
  };

  const prepareItems = () => {
    if (imagesArr.length === 0) {
      return [];
    }
    const AMOUNT_TO_RENDER = calcItemsAmountToRender();
    const SIDE_AMOUNT = Math.floor(AMOUNT_TO_RENDER / 2);

    const index = cState.selectedIndex;
    const images = JSON.parse(JSON.stringify(imagesArr));
    const items = images.map((imgUrl, index) => ({
      imgUrl,
      index,
      label: null,
    }));

    for (let i = 0; i < labelsArr.length; i++) {
      items[i].label = labelsArr[i];
    }
    items[index].side = SIDES.CENTER;
    items[index].distance = 0;

    let fromIndex = Math.max(0, index - SIDE_AMOUNT);
    let untilIndex = Math.min(images.length, index + SIDE_AMOUNT + 1);

    for (let i = fromIndex; i < index; i++) {
      items[i].side = SIDES.LEFT;
      items[i].distance = index - i;
    }

    for (let i = index + 1; i < untilIndex; i++) {
      items[i].side = SIDES.RIGHT;
      items[i].distance = i - index;
    }

    if (items.length < AMOUNT_TO_RENDER) {
      return items;
    }

    // calc removed items, in order to animate them.
    let amount = index - cState.prevIndex;
    if (amount > 0 && fromIndex > SIDE_AMOUNT) {
      for (let i = fromIndex - amount; i < fromIndex; i++) {
        items[i].side = SIDES.REMOVED_LEFT;
        items[i].distance = index - i;
      }
      fromIndex -= amount;
    } else if (amount < 0) {
      amount *= -1;
      if (untilIndex + amount < items.length) {
        for (let i = untilIndex; i < untilIndex + amount; i++) {
          if (!items[i]) {
            debugger;
          }
          items[i].side = SIDES.REMOVED_RIGHT;
          items[i].distance = i - index;
        }
        untilIndex += amount;
      }
    }

    return items.slice(fromIndex, untilIndex);
  };

  const next = () => {
    let index = cState.selectedIndex;
    if (index + 1 < imagesArr.length) {
      selectItem(index + 1);
    }
  };

  const previous = () => {
    let index = cState.selectedIndex;
    if (index > 0) {
      selectItem(index - 1);
    }
  };

  const keysConfig = {
    left: previous,
    right: next,
    up: next,
    down: previous,
  };
  const touchConfig = {
    left: next,
    right: previous,
    up: next,
    down: previous,
  };
  SwipeReact.config(touchConfig);
  WheelReact.config(touchConfig);
  ArrowKeysReact.config(keysConfig);

  const coverflow = useRef < HTMLDivElement > null;

  useEffect(() => {
    coverflow?.current?.focus();
    return () => {
      WheelReact.clearTimeout();
    };
  }, []);

  let itemWidth, itemHeight;
  [itemWidth, itemHeight] = calcItemDimensions();
  let items = prepareItems();
  return (
    <div
      tabIndex='0'
      style={containerStyles}
      {...SwipeReact.events}
      {...WheelReact.events}
      {...ArrowKeysReact.events}
      ref={coverflow}
    >
      {items.map((item) => {
        return (
          <Item
            side={item.side}
            max={Math.floor(calcItemsAmountToRender() / 2)}
            distance={item.distance}
            imgUrl={item.imgUrl}
            selectItem={selectItem}
            index={item.index}
            zIndex={zIndex}
            height={itemHeight}
            width={itemWidth}
            label={item.label}
            direction={direction}
            key={item.index}
          />
        );
      })}
    </div>
  );
};
