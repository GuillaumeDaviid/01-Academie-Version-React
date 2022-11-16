import '../styles/HomeCourses.scss';
import React,{useContext} from 'react';
import { Link } from "react-router-dom";
import { ModulesContext } from '../contexts/ModulesContext.jsx';
import {useFetch} from '../hooks/useFetch';


function HomeCourses({  }){

  const { handleClick } = useContext(ModulesContext)

const { dt } = useFetch("https://guillaumedavid.com/server/phpRequestCoursesInfo.php")


const listCourses = dt.map((dt) =>
  <div className="courses" onClick={() => handleClick(dt.id)}><Link to={"Modules id="+dt.id} className='link'>
  <h2 key={dt.id}>{dt.name}</h2>
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
