import React from "react";
import logo from './logo.svg';
import './App.css';

import {Dropdown} from './components/Dropdown';

function App() {
  const [data,setData] = React.useState(null);

  React.useEffect(() =>{
    fetch("/api")
    .then((res)=>res.json())
    .then((data)=>setData(data.message));
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {!data?"loading":data}
        </a>
        <Dropdown />
      </header>
    </div>
  );
}

export default App;
