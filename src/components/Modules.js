import {MyContext} from '../contexts/MyContext';
import { ModulesContext } from '../contexts/ModulesContext.jsx';
import React,{useState,useEffect, useContext} from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../styles/Modules.scss';


function Modules({ getId }){


  const {rootState} = useContext(MyContext);
 const { handleClickModules } = useContext(ModulesContext);
  const {isAuth,theUser} = rootState;

  let { id } = useParams();


  const [getModules,setGetModules] = useState([]);


  useEffect(()=>{
Axios.get("http://localhost/01-academie/src/server/modules.php").then((data)=>{
    setGetModules(data.data)
});
},[])



const listModules = getModules.map((getModules) =>
<div className="bloc__modules">
{(isAuth) ? getModules.courses_id === id ?
  (<div style={(theUser.last_module_html > parseInt(getModules.position) && getModules.courses_id === 1 || theUser.last_module_css > parseInt(getModules.position) && getModules.courses_id == 2 ||
  theUser.last_module_php > parseInt(getModules.position) && getModules.courses_id == 3 || theUser.last_module_js > parseInt(getModules.position) && getModules.courses_id == 4 ||
theUser.last_module_sql > parseInt(getModules.position) && getModules.courses_id == 5 || theUser.last_module_py > parseInt(getModules.position) && getModules.courses_id == 6) ? {borderColor: "rgb(253, 185, 80)"} : (theUser.last_module_html == getModules.position && getModules.courses_id == 1 ||
theUser.last_module_css == getModules.position && getModules.courses_id == 2 || theUser.last_module_php == getModules.position && getModules.courses_id == 3 ||
theUser.last_module_js == getModules.position && getModules.courses_id == 4 || theUser.last_module_sql == getModules.position && getModules.courses_id == 5 ||
theUser.last_module_py == getModules.position && getModules.courses_id == 6) ? {borderColor: "white"} : {borderColor: "black", cursor:'default'}} className="bloc" onClick={() => handleClickModules(getModules.id, getModules.courses_id, getModules.position, getModules.experience)}>

<Link to={(theUser.last_module_html > parseInt(getModules.position) && getModules.courses_id == 1 || theUser.last_module_css > parseInt(getModules.position) && getModules.courses_id == 2 ||
theUser.last_module_php > parseInt(getModules.position) && getModules.courses_id == 3 || theUser.last_module_js > parseInt(getModules.position) && getModules.courses_id == 4 ||
theUser.last_module_sql > parseInt(getModules.position) && getModules.courses_id == 5 || theUser.last_module_py > parseInt(getModules.position) && getModules.courses_id == 6) ? "Exercices id="+getModules.id : (theUser.last_module_html == getModules.position && getModules.courses_id == 1 ||
theUser.last_module_css == getModules.position && getModules.courses_id == 2 || theUser.last_module_php == getModules.position && getModules.courses_id == 3 ||
theUser.last_module_js == getModules.position && getModules.courses_id == 4 || theUser.last_module_sql == getModules.position && getModules.courses_id == 5 ||
theUser.last_module_py == getModules.position && getModules.courses_id == 6) ? "Exercices id="+getModules.id : "Modules id="+id} className="link__modules">

  <h2 key={getModules.id} style={(theUser.last_module_html > parseInt(getModules.position) && getModules.courses_id == 1 || theUser.last_module_css > parseInt(getModules.position) && getModules.courses_id == 2 ||
  theUser.last_module_php > parseInt(getModules.position) && getModules.courses_id == 3 || theUser.last_module_js > parseInt(getModules.position) && getModules.courses_id == 4 ||
theUser.last_module_sql > parseInt(getModules.position) && getModules.courses_id == 5 || theUser.last_module_py > parseInt(getModules.position) && getModules.courses_id == 6) ? {color: "rgb(253, 185, 80)"} : (theUser.last_module_html == getModules.position && getModules.courses_id == 1 ||
theUser.last_module_css == getModules.position && getModules.courses_id == 2 || theUser.last_module_php == getModules.position && getModules.courses_id == 3 ||
theUser.last_module_js == getModules.position && getModules.courses_id == 4 || theUser.last_module_sql == getModules.position && getModules.courses_id == 5 ||
theUser.last_module_py == getModules.position && getModules.courses_id == 6) ? {color: "white"} : {color: "black", cursor:'default'}}>{getModules.name_modules}</h2>
  </Link></div>)

  :('')
  : getModules.courses_id == getId ? (<div className="bloc" style={{borderColor: 'black'}}><h2 key={getModules.id} style={{color: 'black'}}>{getModules.name_modules}</h2></div>) : ''
}
</div>
);


  return(
    <div>
    <h1 className="title__modules">Modules</h1>

    {listModules}

    <Link to='/' className='btn_return'>RETOUR</Link>

    </div>
  )
}


export default Modules;
