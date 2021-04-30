import React,{ useState} from "react";
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import CardSet from './components/CardSet';

function App() {  
  const [language,setLanguage] = useState("java");
  return (
    <div className="App">
      <Header  setLanguage={setLanguage} />
      
      <CardSet language={language} key={language}/>
    </div>
  );
}

export default App;
