import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Example from './hook-example.js';

/*****************/

// manual switch to select which app to display
const key = 'hook-example';
var componentToShow;

switch (key) {
  case 'hook-example':
    componentToShow = <Example />
    break;

  default:
    componentToShow = <Example />
    break;
}

ReactDOM.render(
  <React.StrictMode>
    {componentToShow}
  </React.StrictMode>,
  document.getElementById('root')
);
