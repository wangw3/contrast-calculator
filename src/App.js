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
      l2: "",
      result: ""
    }
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.checkEachBit = this.checkEachBit.bind(this);
  }

  handleClick1 () {
    let r, g, b, l, r_srgb, g_srgb, b_srgb;
     // check length
     if (this.state.color1.length === 6){
       // check each bit

       let color1 = this.state.color1.toLowerCase();
       if(this.checkEachBit(color1)){
         r_srgb = parseInt( "0x" + color1.charAt(0) + color1.charAt(1), 16)/255;
         g_srgb = parseInt( "0x" + color1.charAt(2) + color1.charAt(3), 16)/255;
         b_srgb = parseInt( "0x" + color1.charAt(4) + color1.charAt(5), 16)/255;

       }
     }

     if (this.state.rgb1) {
        const first_comma = this.state.rgb1.indexOf(',');
        const second_comma = this.state.rgb1.indexOf(',', first_comma + 1 || 0);
        r_srgb = parseInt(this.state.rgb1.slice(0, first_comma).replace("(", ""), 10)/255;
        g_srgb = parseInt(this.state.rgb1.slice(first_comma + 1, second_comma), 10)/255;
        b_srgb = parseInt(this.state.rgb1.slice(second_comma + 1).replace(")", ""), 10)/255;
     }
     r = (r_srgb <= 0.03928)? r_srgb/12.92 : Math.pow(((r_srgb+0.055)/1.055), 2.4);
     g = (g_srgb <= 0.03928)? g_srgb/12.92 : Math.pow(((g_srgb+0.055)/1.055), 2.4);
     b = (b_srgb <= 0.03928)? b_srgb/12.92 : Math.pow(((b_srgb+0.055)/1.055), 2.4);
     l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
     this.setState({l1: l});
  }

  handleClick2 () {
     let r, g, b, l, r_srgb, g_srgb, b_srgb;
     if (this.state.color2.length === 6) {
       let color2 = this.state.color2.toLowerCase();
       if(this.checkEachBit(color2)){
         r_srgb = parseInt( "0x" + color2.charAt(0) + color2.charAt(1), 16)/255;
         g_srgb = parseInt( "0x" + color2.charAt(2) + color2.charAt(3), 16)/255;
         b_srgb = parseInt( "0x" + color2.charAt(4) + color2.charAt(5), 16)/255;
       }
     }
     if (this.state.rgb2) {
        const first_comma = this.state.rgb2.indexOf(',');
        const second_comma = this.state.rgb2.indexOf(',', first_comma + 1 || 0);
        r_srgb = parseInt(this.state.rgb2.slice(0, first_comma).replace("(", ""), 10)/255;
        g_srgb = parseInt(this.state.rgb2.slice(first_comma + 1, second_comma), 10)/255;
        b_srgb = parseInt(this.state.rgb2.slice(second_comma + 1).replace(")", ""), 10)/255;
     }
     r = (r_srgb <= 0.03928)? r_srgb/12.92 : Math.pow(((r_srgb+0.055)/1.055), 2.4);
     g = (g_srgb <= 0.03928)? g_srgb/12.92 : Math.pow(((g_srgb+0.055)/1.055), 2.4);
     b = (b_srgb <= 0.03928)? b_srgb/12.92 : Math.pow(((b_srgb+0.055)/1.055), 2.4);
     l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
     this.setState({l2: l});
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
          console.log('input not correct');
          return false;
        }
      }
      return true;
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
        <br/>
        {this.state.l1 || this.state.l1===0? this.state.l1: null}
        <br/>
        {this.state.l2 || this.state.l2===0? this.state.l2: null}
        <br/>
        <div style={{color:"orange"}}>{
          (this.state.l1 || this.state.l1===0)&& (this.state.l2 || this.state.l2===0)? this.state.l1 > this.state.l2?
           (this.state.l1 + 0.05)/(this.state.l2 + 0.05):
           (this.state.l2 + 0.05)/(this.state.l1 + 0.05):
          null
        }
        </div>
      </div>
    );
  }
}

export default App;
