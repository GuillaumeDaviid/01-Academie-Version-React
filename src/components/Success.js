import '../styles/Success.scss'
import {MyContext} from '../contexts/MyContext'
import React,{useState,useEffect, useContext} from 'react'
import Axios from 'axios'


function Success() {

  const {rootState,logoutUser} = useContext(MyContext);
  const {isAuth,theUser,showLogin} = rootState;

  const [getSuccess, setGetSuccess] = useState([])


  useEffect(()=>{
Axios.get("http://localhost/01-academie/src/server/getSuccess.php").then((data)=>{
    console.log(data.data)
    setGetSuccess(data.data)
});
},[])


const listSuccess = getSuccess.map((getSuccess) =>

  <div className="success__content">
  {isAuth ? <div className="success__info">
  <p style={(theUser.modules_completed >= 1 && getSuccess.id == 1 || theUser.modules_completed >= 10 && getSuccess.id == 2 || theUser.modules_completed >= 50 && getSuccess.id == 3 ||
  theUser.modules_completed >= 100 && getSuccess.id == 4 || theUser.last_module_html == 8 && getSuccess.id == 5 || theUser.last_module_css == 17 && getSuccess.id == 6 ||
theUser.last_module_php == 10 && getSuccess.id == 7 || theUser.last_module_js == 12 && getSuccess.id == 8 || theUser.last_module_sql == 10 && getSuccess.id == 9 ||
theUser.last_module_py == 11 && getSuccess.id == 10)
    ? {color: "white"} : {color: "black"} }>{getSuccess.name_success}</p>
  <p style={(theUser.modules_completed >= 1 && getSuccess.id == 1 || theUser.modules_completed >= 10 && getSuccess.id == 2 || theUser.modules_completed >= 50 && getSuccess.id == 3 ||
  theUser.modules_completed >= 100 && getSuccess.id == 4 || theUser.last_module_html == 8 && getSuccess.id == 5 || theUser.last_module_css == 17 && getSuccess.id == 6 ||
theUser.last_module_php == 10 && getSuccess.id == 7 || theUser.last_module_js == 12 && getSuccess.id == 8 || theUser.last_module_sql == 10 && getSuccess.id == 9 ||
theUser.last_module_py == 11 && getSuccess.id == 10)
    ? {color: "white"} : {color: "black"} }>{getSuccess.validation_condition}</p> </div> : <div className="success__info">
    <p style={{color: 'black'}}>{getSuccess.name_success}</p>
    <p style={{color: 'black'}}>{getSuccess.validation_condition}</p> </div>}
  </div>

);


  return(
    <div className='page__success'>
    <div className="cont__success">
    <div className="title__success">
    <h2>Nom</h2>
    <h2>Description</h2>
    </div>
{listSuccess}
    </div>
    </div>
  )
}

export default Success;
