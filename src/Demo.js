import React from 'react';
import CoverFlow from './CoverFlow/CoverFlow';
import './demo.css';

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      width: document.body.offsetWidth,
      height: 300,
      itemRatio: {
        x: 8,
        y: 5
      },
      background: '#f0f0f0'
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
      <div className="demo">
        <CoverFlow imagesArr={imagesArr} 
                   width={this.state.width}
                   height={this.state.height}
                   itemRatio={`${this.state.itemRatio.x}:${this.state.itemRatio.y}`}
                   background={this.state.background} />

        <div>

          <form>
            <label>Container Width:</label>
            <input placeholder="width" 
                  type="number"
                  min="1"
                  value={this.state.width} 
                  onChange={(e)=>{
                    this.setState({width: parseInt(e.target.value)});
                  }} />
            <br />
            
            <label>Container Height:</label>
            <input placeholder="height" 
                  type="number" 
                  min="1"
                  value={this.state.height} 
                  onChange={(e)=>{
                    this.setState({height: parseInt(e.target.value)});
                  }} />
            <br />

            <label>Item Ratio:</label>
            <input placeholder="x" 
                  type="number" 
                  min="1"
                  style={{width: '60px'}}
                  value={this.state.itemRatio.x} 
                  onChange={(e)=>{
                    this.setState({
                      itemRatio: {
                        x: parseInt(e.target.value),
                        y: this.state.itemRatio.y
                      }});
                  }} />
            <input placeholder="y" 
                  type="number" 
                  min="1"
                  style={{width: '60px'}}
                  value={this.state.itemRatio.y}
                  onChange={(e)=>{
                    this.setState({
                      itemRatio: {
                        x: this.state.itemRatio.x,
                        y: parseInt(e.target.value)
                      }});
                  }} />
            <br />

            <label>Container Background:</label>
            <input type="color" 
                  value={this.state.background} 
                  onChange={(e)=>{
                    this.setState({background: e.target.value});
                  }} />
            <br/>
          </form>

          <br />

          <code>
                {`<CoverFlow imagesArr={imagesArr} 
                      width="${this.state.width}"
                      height="${this.state.height}"
                      itemRatio="${this.state.itemRatio.x}:${this.state.itemRatio.y}"
                      background="${this.state.background}" />`}
          </code>
          <br />

        </div>
      </div>
    );
  }
}

export default Demo;