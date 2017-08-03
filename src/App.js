import React from 'react';
import CoverFlow from './CoverFlow/CoverFlow';

class App extends React.Component {
  render() {
    const imagesArr = [
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg'
    ];
    return <CoverFlow imagesArr={imagesArr} />;
  }
}

export default App;
