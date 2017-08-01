# Coverflow React


[![npm version](https://badge.fury.io/js/coverflow-react.svg)](http://badge.fury.io/js/coverflow-react)

[![NPM](https://nodei.co/npm/coverflow-react.png)](https://nodei.co/npm/coverflow-react/)

```bash
npm install --save coverflow-react
```

## Live Demo
https://storage.googleapis.com/coverflow-react/index.html

## Screencast on YouTube
[![Link to screencast on YouTube](https://raw.githubusercontent.com/leon-good-life/coverflow-react/master/youtube-screenshot.png)](https://www.youtube.com/watch?v=PpykYaLD4vI)

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

## Features
* Support for large amount of images, by rendering only some of them in a time, and with easy navigation and smooth animation, the user can see all the images.

## Contributing
### Installation instructions


    git clone https://github.com/leon-good-life/coverflow-react.git
    cd coverflow
    npm install
    npm start
