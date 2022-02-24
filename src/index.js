import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Example from './hook-example';
import DataTable from './DataTable';

/*****************/

// manual switch to select which app to display

const key = 'data-table';

var appToShow;
// let url = "http://localhost:3001/employees";
let url = "https://jsonplaceholder.typicode.com/albums";

switch (key) {
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
