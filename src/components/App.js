import Header from './Header.js'
import Footer from './Footer.js'
import HomeCourses from './HomeCourses.js'
import Modules from './Modules.js'
import Exercices from './Exercices.js'
import Success from './Success.js'
import MyContextProvider from '../contexts/MyContext';
import Profil from './Profil.js'
import Parameters from './Parameters.js'
import '../styles/App.scss';
import React,{useState, useCallback} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  const [getId, setGetId] = useState("");

  const [getIdModules, setGetIdModules] = useState("");
  const [getCoursesIdModules, setGetCoursesIdModules] = useState("");
  const [getPositionModules, setGetPositionModules] = useState("");
  const [getExpModules, setGetExpModules] = useState("");

  const handleClickModules = useCallback((id, courses, position, exp) => {
    setGetIdModules(id)
    setGetCoursesIdModules(courses)
    setGetPositionModules(position)
    setGetExpModules(exp)
  }, [])

  const handleClick = useCallback((id) => {
    setGetId(id)
},[])

  return (
    <Router>
    <div className="App">

    <MyContextProvider >
    <Header />
    </MyContextProvider>

    <Switch>
    
    <Route exact path='/'>
      <HomeCourses getId={getId} handleClick={handleClick}/>
      </Route>

      <Route path="/Modules id=:id">
      <Modules getId={getId} handleClickModules={handleClickModules}/>
      </Route>


      <Route path="/Exercices id=:id">
      <Exercices getIdModules={getIdModules} getCoursesIdModules={getCoursesIdModules} getPositionModules={getPositionModules} getExpModules={getExpModules}/>
      </Route>
      

      <Route exact path="/Success">
      <Success />
      </Route>

      <Route exact path='/Profil'>
        <Profil getId={getId} handleClick={handleClick}/>
        </Route>

        <Route exact path='/Parameters'>
          <Parameters/>
          </Route>


</Switch>
<Footer />
    </div>
    
    </Router>
  );
}

export default App;
