import Header from './Header.js'
import Footer from './Footer.js'
import HomeCourses from './HomeCourses.js'
import Modules from './Modules.js'
import Exercices from './Exercices.js'
import Success from './Success.js'
import MyContextProvider from '../contexts/MyContext';
import { ModulesProvider } from '../contexts/ModulesContext.jsx';
import Profil from './Profil.js'
import Parameters from './Parameters.js'
import '../styles/App.scss';
import React,{useState, useCallback, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  useEffect(() => {
    document.title = '01 Academie';
  }, []);

  return (
    <Router>
    <div className="App">

    <MyContextProvider >
    <Header />
    </MyContextProvider>
    <Switch>

    <ModulesProvider>
      <Route exact path='/'>
      <HomeCourses />
      </Route>
      
      <Route path="/Modules id=:id">
      <Modules />
      </Route>
      
      <Route path="/Exercices id=:id">
      <Exercices />
      </Route>
    
      <Route exact path="/Success">
      <Success />
      </Route>

      <Route exact path='/Profil'>
      <Profil />
      </Route>
      

      <Route exact path='/Parameters'>
      <Parameters/>
      </Route>
      </ModulesProvider>
      


</Switch>
<Footer />
    </div>
    
    </Router>
  );
}

export default App;
