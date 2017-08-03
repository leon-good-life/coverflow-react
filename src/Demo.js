import React from 'react';
import CoverFlow from './CoverFlow/CoverFlow';

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      width: document.body.offsetWidth,
      height: 300
    };
    window.addEventListener('resize', ()=>{
      this.setState({width: document.body.offsetWidth});
    });
  }
  render(){
    const imagesArr = [
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'img/11.jpg',
        'img/12.jpg',
        'img/13.jpg',
        'img/14.jpg',
        'img/15.jpg',
        'img/16.jpg',
        'img/17.jpg',
        'img/18.jpg',
        'img/19.jpg',
        'img/20.jpg'
    ];
    return (
      <div>
        <CoverFlow imagesArr={imagesArr} width={this.state.width} height={this.state.height} />
        <div style={{margin:'10px', padding: '10px', textAlign: 'center'}}>

          <label>Width:</label>
          <input placeholder="width" 
                 type="number"
                 value={this.state.width} 
                 onChange={(e)=>{
                  this.setState({width: parseInt(e.target.value)});
                 }} />
          <br />
          
          <label>Height:</label>
          <input placeholder="height" 
                 type="number" 
                 value={this.state.height} 
                 onChange={(e)=>{
                   this.setState({height: parseInt(e.target.value)});
                 }} />
          <br />
        </div>
      </div>
    );
  }
}

export default Demo;