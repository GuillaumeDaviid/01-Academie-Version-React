import '../styles/HomeCourses.scss';
import React,{useState,useEffect, useContext} from 'react';
import Axios from 'axios'
import { Link } from "react-router-dom";
import { ModulesContext } from '../contexts/ModulesContext.jsx';


function HomeCourses({  }){

  const [getList,setGetList] = useState([]);
  const { handleClick } = useContext(ModulesContext)


  useEffect(()=>{
Axios.get("http://localhost/01-academie/src/server/phpRequestCoursesInfo.php").then((data)=>{
    setGetList(data.data)
});
},[])


const listCourses = getList.map((getList) =>
  <div className="courses" onClick={() => handleClick(getList.id)}><Link to={"Modules id="+getList.id} className='link'>
  <h2 key={getList.id}>{getList.name}</h2>
  </Link></div>
);

  return(
    <div>

        <h1 className='title_home_page'>Liste des Cours disponible :</h1>

        <p>
        </p>

    <section className="bloc__content">

    {listCourses}




    </section>
    </div>
  )

}

export default HomeCourses;
