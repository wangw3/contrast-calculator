import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      color1: "",
      color2: "",
      rgb1: "",
      rgb2: "",
      l1: "",
      l2: ""
    }
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.checkEachBit = this.checkEachBit.bind(this);
    this.getSRGB = this.getSRGB.bind(this);
  }

  checkEachBit (string) {
      for (let i=0;i<string.length;i++) {
        if((string.charCodeAt(i) >=48 && string.charCodeAt(i) <= 57) ||
           (string.charCodeAt(i) >=97 && string.charCodeAt(i) <= 102)
      )
      {
        // donothing
      }
        else {
          alert('input not correct');
          return false;
        }
      }
      return true;
  }

  getSRGB (color, rgb) {
    let r_srgb, g_srgb, b_srgb;
    if (color.length === 6){
      let eachColor = color.toLowerCase();
      if (this.checkEachBit(eachColor)) {
        r_srgb = parseInt( "0x" + eachColor.charAt(0) + eachColor.charAt(1), 16)/255;
        g_srgb = parseInt( "0x" + eachColor.charAt(2) + eachColor.charAt(3), 16)/255;
        b_srgb = parseInt( "0x" + eachColor.charAt(4) + eachColor.charAt(5), 16)/255;
      }
    }

    if (rgb) {
       const first_comma_index = rgb.indexOf(',');
       const second_comma_index = rgb.indexOf(',', first_comma_index + 1 || 0);
       r_srgb = parseInt(rgb.slice(0, first_comma_index).replace("(", ""), 10)/255;
       g_srgb = parseInt(rgb.slice(first_comma_index + 1, second_comma_index), 10)/255;
       b_srgb = parseInt(rgb.slice(second_comma_index + 1).replace(")", ""), 10)/255;
    }
    return [r_srgb, g_srgb, b_srgb];
  }

  calculateLuminance (arrSRGB) {
    let r, g, b, l;
    r = (arrSRGB[0] <= 0.03928)? arrSRGB[0]/12.92 : Math.pow(((arrSRGB[0]+0.055)/1.055), 2.4);
    g = (arrSRGB[1] <= 0.03928)? arrSRGB[1]/12.92 : Math.pow(((arrSRGB[1]+0.055)/1.055), 2.4);
    b = (arrSRGB[2] <= 0.03928)? arrSRGB[2]/12.92 : Math.pow(((arrSRGB[2]+0.055)/1.055), 2.4);
    l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return l;
  }

  handleClick1 () {
    let arrSRGB = this.getSRGB(this.state.color1, this.state.rgb1);
    let luminance = this.calculateLuminance(arrSRGB);
    this.setState({l1: luminance});
  }

  handleClick2 () {
    let arrSRGB = this.getSRGB(this.state.color2, this.state.rgb2);
    let luminance = this.calculateLuminance(arrSRGB);
    this.setState({l2: luminance});
  }

  render() {
    return (
      <div className="App">
        <div className="App_title">
          Contrast Calculator
        </div>
        <input
              placeholder="color code 6 hex numbers"
              type="text"
              value={this.state.color1}
              onChange={(event)=>{this.setState({
                color1: event.target.value,
                rgb1: "",
                l1: ""
              })}}
        />
        <input
              placeholder="color code 6 hex numbers"
              type="text"
              value={this.state.color2}
              onChange={(event)=>{this.setState({
                color2: event.target.value,
                rgb2: "",
                l2: ""
              })}}
        />
        <br/>
        <input
              placeholder="color code rgb with comma"
              type="text"
              value={this.state.rgb1}
              onChange={(event)=>{this.setState({
                rgb1: event.target.value,
                color1: "",
                l1: ""
              })}}
        />
        <input
              placeholder="color code rgb with comma"
              type="text"
              value={this.state.rgb2}
              onChange={(event)=>{this.setState({
                rgb2: event.target.value,
                color2: "",
                l2: ""
              })}}
        />
        <br/>
        <button onClick={this.handleClick1}>Calculate</button>
        <button onClick={this.handleClick2}>Calculate</button>
        <div style={{fontSize: "24px"}}>
          {this.state.l1 || this.state.l1===0? this.state.l1.toFixed(2): null}
          <br/>
          {this.state.l2 || this.state.l2===0? this.state.l2.toFixed(2): null}
          <br/>
          <div style={{color:"orange"}}>{
            (this.state.l1 || this.state.l1===0)&& (this.state.l2 || this.state.l2===0)? this.state.l1 > this.state.l2?
            ((this.state.l1 + 0.05)/(this.state.l2 + 0.05)).toFixed(2):
            ((this.state.l2 + 0.05)/(this.state.l1 + 0.05)).toFixed(2):
            null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
