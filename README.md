# Coverflow React


[![npm version](https://badge.fury.io/js/coverflow-react.svg)](http://badge.fury.io/js/coverflow-react)

[![NPM](https://nodei.co/npm/coverflow-react.png)](https://nodei.co/npm/coverflow-react/)

```bash
npm install --save coverflow-react
```

## Live Demo
https://storage.googleapis.com/coverflow-react/index.html

### Demo project
There is a [coverflow-react-demo](https://github.com/leon-good-life/coverflow-react-demo) repository on GitHub, that demonstrates features of this widget.

### Screenshots
![screenshot horizontal](https://storage.googleapis.com/coverflow-react/screenshot_horizontal.gif)
![screenshot vertical](https://storage.googleapis.com/coverflow-react/screenshot_vertical.gif)

## Usage
### Using CoverFlow in your project
1. Add coverflow-react package to your project using npm.
```bash
npm install --save coverflow-react
```

2. import CoverFlow
```javascript
import CoverFlow from 'coverflow-react';
```

3. Create an array of path/URLs to the images.
```javascript
const imagesArr = [
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg'
    ];
```
(If you are using create-react-app, you can put the images in 'public' directory).

4. Add CoverFlow Component to your project and pass images array.
```jsx
<CoverFlow imagesArr={imagesArr} />
```



### Optional props
* **zIndex** - by default it is 100. If there are conflicts with z-index in your project. You can pass zIndex you want.
* **height** - the height of coverflow container in pixels. The default is 300. The height of coverflow item is calculated automatically. It is 60px less than the height of the container.
* **emptyMessage** - a message the user see when there are no items. The default message is 'No items to show.'. This property allows to customize this message. It is particularly useful for internationalization and localization, by allowing coverflow to adapt to different languages.
* **itemRatio** - aspect ratio of coverflow items. The default is '8:5'.
* **background** - a css background property. The default is 'lightgray'. You can assign any valid css background.
* **border** - a css border property. The default is 'none'. You can assign any valid css border.
* **boxShadow** - a css box-shadow property. The default is 'none'. You can assign any valid css box-shadow.
* **handleSelect** - you can pass a callback function. The function has an index parameter.
```jsx
<CoverFlow handleSelect={(index)=>{alert(index);}} imagesArr={imagesArr} />
```
* **labelsArr** - allows to add text labels at the bottom of the images, the array must be the same size of imagesArr.
* **direction** - the default is "horizontal", if passing "vertical", the CoverFlow will transform to vertical.

## Features
* Support for large amount of images, by rendering only some of them at a time, and with easy navigation and smooth animation, the user can see all the images.
* Vertical CoverFlow (In addition to Horizontal CoverFlow).
### Multiple input devices support
* Swipe support on touch devices (smartphones, tablets).
* Keyboard 'left' and 'right' keys support.
* Scroll support (mouse and trackpad).

## Contributing
Opening issues and code contributions are welcomed.
See [contributing guide](https://github.com/leon-good-life/coverflow-react/blob/master/CONTRIBUTING.md).

## Credits for images in the demo
Uncopyrited images from Pixabay and Pexels.
