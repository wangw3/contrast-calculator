import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      color1: "",
      color2: "",
      l1: "",
      l2: ""
    }
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.checkEachBit = this.checkEachBit.bind(this);
    this.getSRGB = this.getSRGB.bind(this);
  }

  checkEachBit (string) {
      const ASCII_0 = 48;
      const ASCII_9 = 57;
      const ASCII_a = 97;
      const ASCII_f = 102;
      for (let i=0;i<string.length;i++) {
        if((string.charCodeAt(i) >= ASCII_0 && string.charCodeAt(i) <= ASCII_9) ||
           (string.charCodeAt(i) >= ASCII_a && string.charCodeAt(i) <= ASCII_f)
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

  getSRGB (color) {
    let r_srgb, g_srgb, b_srgb;
    if (color.indexOf(",") === -1){
      const colorCode = color.toLowerCase();
      if (this.checkEachBit(colorCode)) {
        r_srgb = parseInt( "0x" + colorCode.charAt(0) + colorCode.charAt(1), 16)/255;
        g_srgb = parseInt( "0x" + colorCode.charAt(2) + colorCode.charAt(3), 16)/255;
        b_srgb = parseInt( "0x" + colorCode.charAt(4) + colorCode.charAt(5), 16)/255;
      }
    }

    else {
       const first_comma_index = color.indexOf(',');
       const second_comma_index = color.indexOf(',', first_comma_index + 1 || 0);
       r_srgb = parseInt(color.slice(0, first_comma_index).replace("(", ""), 10)/255;
       g_srgb = parseInt(color.slice(first_comma_index + 1, second_comma_index), 10)/255;
       b_srgb = parseInt(color.slice(second_comma_index + 1).replace(")", ""), 10)/255;
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
    let arrSRGB = this.getSRGB(this.state.color1);
    let luminance = this.calculateLuminance(arrSRGB);
    this.setState({
      l1: luminance
    });
  }

  handleClick2 () {
    let arrSRGB = this.getSRGB(this.state.color2);
    let luminance = this.calculateLuminance(arrSRGB);
    this.setState({
      l2: luminance
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App_title">
          Contrast Calculator
        </div>
        <div>
          The input can be either 6-bit hex numbers or rgb numbers with comma.
        </div>
        <div>
          For example: "111111", "(100, 0, 0)", "100, 100, 100"
        </div>
        <input
              placeholder="color code"
              type="text"
              value={this.state.color1}
              onChange={(event)=>{this.setState({
                color1: event.target.value,
                l1: ""
              })}}
        />
        <input
              placeholder="color code"
              type="text"
              value={this.state.color2}
              onChange={(event)=>{this.setState({
                color2: event.target.value,
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
            (this.state.l1 || this.state.l1===0) && (this.state.l2 || this.state.l2===0)? this.state.l1 > this.state.l2?
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
