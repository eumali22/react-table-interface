import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Example from './hook-example';
import DataTable from './DataTable';
import App from './App';
import { ContactUs, HeroLayout3 } from "./ui-components";

/*****************/

// manual switch to select which app to display

const key = 'hero3';//'data-table';

var appToShow;
// let url = "http://localhost:3001/employees";
let url = "https://jsonplaceholder.typicode.com/albums";
// let url = "http://localhost:4000/transactions";

switch (key) {
  case 'hero3':
    appToShow = <HeroLayout3 />
    break;

  case 'contact':
    appToShow = <ContactUs />
    break;

  case 'app':
    appToShow = <App />
    break;

  case 'hook-example':
    appToShow = <Example />
    break;

  case 'data-table':
    appToShow = <DataTable dataSourceUrl={url} />
    break;

  default:
    appToShow = <DataTable dataSourceUrl={url} />
    break;
}

ReactDOM.render(
  <React.StrictMode>
    {appToShow}
  </React.StrictMode>,
  document.getElementById('root')
);
