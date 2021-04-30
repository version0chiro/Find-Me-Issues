import React,{ useState} from "react";

import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import CardSet from './components/CardSet';
import Navigation from './components/Navigation';

function App() {  
  const [language,setLanguage] = useState("Javascript");
  const [pageNumber,setPageNumber] = useState(1);
  const [maxPageNumber,setMaxPageNumber] = useState(100);

  return (
    <div className="App">
      <Header  setLanguage={setLanguage} />
      <Navigation  setPageNumber={setPageNumber} pageNumber={pageNumber} maxPageNumber={maxPageNumber} />
      <CardSet pageNumber={pageNumber} language={language} key={language+pageNumber} setMaxPageNumber={setMaxPageNumber}/>

    </div>
  );
}

export default App;
