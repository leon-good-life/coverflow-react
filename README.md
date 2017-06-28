# Coverflow ReactJS
## Installation instructions


    git clone https://github.com/leon-good-life/coverflow-react.git
    cd coverflow
    npm install
    npm start


## Live Demo
https://storage.googleapis.com/coverflow-react/index.html

## Screencast on YouTube
[![Link to screencast on YouTube](youtube-screenshot.png)](https://www.youtube.com/watch?v=PpykYaLD4vI)

## Usage
1. If you want to use this coverflow in your project, copy the "coverflow-react/src/CoverFlow" directory into your project.
```bash
cp -R PATH_OF_THIS_CLONED_PROJECT/coverflow-react/src/CoverFlow PATH_OF_YOUR_PROJECT/CoverFlow
```

2. import CoverFlow
```javascript
import CoverFlow from './CoverFlow/CoverFlow';
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
```html
<CoverFlow imagesArr={imagesArr} />
```

### Optional props
* zIndex - by default it is 100. If there are conflicts with z-index in your project. You can pass zIndex you want.
