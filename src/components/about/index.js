import React from "react";
import './about.styles.scss'

function About() {
  return (
    <div>
      <div id='title'><p>About: </p></div>
      <div id='about-container-outer'>
      <div id='about-container-inner'>
        <p id='author'>
        <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>Author: </span>
          Kellen Linse
        </p>
        <div id='about-container-info'>
        <p>
          <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>Github: </span>
          <a href='https://github.com/Kellen-Linse/resty'>https://github.com/Kellen-Linse/resty</a>
        </p>
        <p>
          <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>LinkedIn: </span>
          <a href='https://linkedin.com/in/kellen-linse'>linkedin.com/in/kellen-linse</a>
        </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default About;
