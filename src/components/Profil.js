import '../styles/Profil.scss'
import {MyContext} from '../contexts/MyContext'
import React,{useState,useEffect, useContext} from 'react'
import HomeCourses from './HomeCourses.js'
import { Link } from "react-router-dom";
import Axios from 'axios'
import { ModulesContext } from '../contexts/ModulesContext.jsx';


function Profil({  }) {

  const {rootState} = useContext(MyContext);
  const {isAuth,theUser,showLogin} = rootState;
  const { handleClick } = useContext(ModulesContext)

  const [getSuccess, setGetSuccess] = useState([]);

  const [getList,setGetList] = useState([]);


  useEffect(()=>{
Axios.get("https://guillaumedavid.com/server/getSuccess.php").then((data)=>{
    setGetSuccess(data.data)
});
},[])


useEffect(()=>{
Axios.get("https://guillaumedavid.com/server/phpRequestCoursesInfo.php").then((dtCourses)=>{
  setGetList(dtCourses.data)
});
},[])


const listSuccess = getSuccess.map((getSuccess) =>
<div>
{ (isAuth) ?
  <div className="success__info">
  <p style={(theUser.modules_completed >= 1 && getSuccess.id == 1 || theUser.modules_completed >= 10 && getSuccess.id == 2 || theUser.modules_completed >= 50 && getSuccess.id == 3 ||
  theUser.modules_completed >= 100 && getSuccess.id == 4 || theUser.last_module_html == 8 && getSuccess.id == 5 || theUser.last_module_css == 17 && getSuccess.id == 6 ||
theUser.last_module_php == 10 && getSuccess.id == 7 || theUser.last_module_js == 12 && getSuccess.id == 8 || theUser.last_module_sql == 10 && getSuccess.id == 9 ||
theUser.last_module_py == 11 && getSuccess.id == 10)
    ? {color: "white"} : {color: "black"} }>{getSuccess.name_success}</p>
  <p style={(theUser.modules_completed >= 1 && getSuccess.id == 1 || theUser.modules_completed >= 10 && getSuccess.id == 2 || theUser.modules_completed >= 50 && getSuccess.id == 3 ||
  theUser.modules_completed >= 100 && getSuccess.id == 4 || theUser.last_module_html == 8 && getSuccess.id == 5 || theUser.last_module_css == 17 && getSuccess.id == 6 ||
theUser.last_module_php == 10 && getSuccess.id == 7 || theUser.last_module_js == 12 && getSuccess.id == 8 || theUser.last_module_sql == 10 && getSuccess.id == 9 ||
theUser.last_module_py == 11 && getSuccess.id == 10)
    ? {color: "white"} : {color: "black"} }>{getSuccess.validation_condition}</p>
  </div> : ''}
  </div>
);

const listCourses = getList.map((getList) =>
  <div className="courses" onClick={() => handleClick(getList.id)}><Link to="Modules" className='link'>
  <h2 key={getList.id}>{getList.name}</h2>
  </Link></div>
);


  return(
    <div>
    {(isAuth) ?
      <div className="cont__profil">
      <div className="main__info">
      Pseudo : {theUser.pseudo}
      <p>Exp : {theUser.experience}</p>
      <p>Module complété : {theUser.modules_completed}</p>
      <p>Inscris depuis le : {theUser.signup_date}</p>
      </div>

      <div className="my__courses">
      <h1 className="">Vos cours</h1>
      {listCourses}
      </div>

      <div className="profil__cont__success">
      <div className="title__success">
        <h2 className="">Nom</h2>
        <h2>Description</h2>
        </div>
        {listSuccess}
      </div>

      </div> : <HomeCourses/>
    }


    </div>
  );
}

export default Profil;
