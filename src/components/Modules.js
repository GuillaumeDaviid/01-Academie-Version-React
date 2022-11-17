import {MyContext} from '../contexts/MyContext';
import { ModulesContext } from '../contexts/ModulesContext.jsx';
import React,{useContext} from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../styles/Modules.scss';
import {useFetch} from '../hooks/useFetch';


function Modules({ }){


  const {rootState} = useContext(MyContext);
 const { handleClickModules, getId } = useContext(ModulesContext);
  const {isAuth,theUser} = rootState;

  let { id } = useParams();


const { dt } = useFetch("https://guillaumedavid.com/server/modules.php")


/* Impossible de récupérer les infos du back end, solution temporaire ci-dessous
const listModules = dt.map((dt) =>
<div className="bloc__modules">
{(isAuth) ? dt.courses_id === id ?
  (<div style={(theUser.last_module_html > parseInt(dt.position) && dt.courses_id === 1 || theUser.last_module_css > parseInt(dt.position) && dt.courses_id == 2 ||
  theUser.last_module_php > parseInt(dt.position) && dt.courses_id == 3 || theUser.last_module_js > parseInt(dt.position) && dt.courses_id == 4 ||
theUser.last_module_sql > parseInt(dt.position) && dt.courses_id == 5 || theUser.last_module_py > parseInt(dt.position) && dt.courses_id == 6) ? {borderColor: "rgb(253, 185, 80)"} : (theUser.last_module_html == dt.position && dt.courses_id == 1 ||
theUser.last_module_css == dt.position && dt.courses_id == 2 || theUser.last_module_php == dt.position && dt.courses_id == 3 ||
theUser.last_module_js == dt.position && dt.courses_id == 4 || theUser.last_module_sql == dt.position && dt.courses_id == 5 ||
theUser.last_module_py == dt.position && dt.courses_id == 6) ? {borderColor: "white"} : {borderColor: "black", cursor:'default'}} className="bloc" onClick={() => handleClickModules(dt.id, dt.courses_id, dt.position, dt.experience)}>

<Link to={(theUser.last_module_html > parseInt(dt.position) && dt.courses_id == 1 || theUser.last_module_css > parseInt(dt.position) && dt.courses_id == 2 ||
theUser.last_module_php > parseInt(dt.position) && dt.courses_id == 3 || theUser.last_module_js > parseInt(dt.position) && dt.courses_id == 4 ||
theUser.last_module_sql > parseInt(dt.position) && dt.courses_id == 5 || theUser.last_module_py > parseInt(dt.position) && dt.courses_id == 6) ? "Exercices id="+dt.id : (theUser.last_module_html == dt.position && dt.courses_id == 1 ||
theUser.last_module_css == dt.position && dt.courses_id == 2 || theUser.last_module_php == dt.position && dt.courses_id == 3 ||
theUser.last_module_js == dt.position && dt.courses_id == 4 || theUser.last_module_sql == dt.position && dt.courses_id == 5 ||
theUser.last_module_py == dt.position && dt.courses_id == 6) ? "Exercices id="+dt.id : "Modules id="+id} className="link__modules">

  <h2 key={dt.id} style={(theUser.last_module_html > parseInt(dt.position) && dt.courses_id == 1 || theUser.last_module_css > parseInt(dt.position) && dt.courses_id == 2 ||
  theUser.last_module_php > parseInt(dt.position) && dt.courses_id == 3 || theUser.last_module_js > parseInt(dt.position) && dt.courses_id == 4 ||
theUser.last_module_sql > parseInt(dt.position) && dt.courses_id == 5 || theUser.last_module_py > parseInt(dt.position) && dt.courses_id == 6) ? {color: "rgb(253, 185, 80)"} : (theUser.last_module_html == dt.position && dt.courses_id == 1 ||
theUser.last_module_css == dt.position && dt.courses_id == 2 || theUser.last_module_php == dt.position && dt.courses_id == 3 ||
theUser.last_module_js == dt.position && dt.courses_id == 4 || theUser.last_module_sql == dt.position && dt.courses_id == 5 ||
theUser.last_module_py == dt.position && dt.courses_id == 6) ? {color: "white"} : {color: "black", cursor:'default'}}>{dt.name_modules}</h2>
  </Link></div>)

  :('')
  : dt.courses_id == getId ? (<div className="bloc" style={{borderColor: 'black'}}><h2 key={dt.id} style={{color: 'black'}}>{dt.name_modules}</h2></div>) : ''
}
</div>
);*/

const listModules = dt.map((dt) =>
<div className="bloc__modules">
{dt.courses_id === id &&
    (<div key={dt.id} className="bloc">
      <Link to={`Exercices id=`+dt.id}>
      <h2>{dt.name_modules}</h2>
      </Link>
    </div>)
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
