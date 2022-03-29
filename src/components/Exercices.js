import '../styles/Exercices.scss';
import React, {useContext,useEffect,useState} from 'react'
import {MyContext} from '../contexts/MyContext'
import { ModulesContext } from '../contexts/ModulesContext.jsx'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {useFetch} from '../hooks/useFetch';


function Exercices (){

  const {rootState,updateModules} = useContext(MyContext);
  const {getIdModules, getCoursesIdModules, getPositionModules, getExpModules} = useContext(ModulesContext)
  const {theUser} = rootState;

  let { id } = useParams();

  const initialState = {
      userInfo:{
          currentEmail:'',
          currentExperience:'',
          addExp:'',
          currentModules:'',
          modulesId:'',
          positionModules:'',
          currentPosition:'',
      },
      errorMsg:'',
      successMsg:'',
  }
  const [state,setState] = useState(initialState);

  let [heart, setHeart] = useState(3);

  let [position, setPosition] = useState(1);


const { getExe } = useFetch("http://localhost/01-academie/src/server/ex_req_ajax.php")

// Show Message on Success or Error
let successMsg = '';
let errorMsg = '';
if(state.errorMsg){
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
}
if(state.successMsg){
    successMsg = <div className="success-msg">{state.successMsg}</div>;
}

const clickNext = () => {
  setPosition(position+1)
  setHeart(heart-1)
  console.log(heart)
}

const handleQuestions = async (getExe, answer) =>{
  setPosition(position+1)
  if (getExe.position == 20){

    state.userInfo.currentEmail = theUser.email;
    state.userInfo.currentModules = theUser.modules_completed;
    state.userInfo.modulesId = getCoursesIdModules;
    state.userInfo.currentExperience = theUser.experience;
    state.userInfo.positionModules = getPositionModules;
    state.userInfo.addExp = getExpModules;

    if(getCoursesIdModules == 2){
      state.userInfo.currentPosition = theUser.last_module_css;
    }

    console.log("fini");

    const data = await updateModules(state.userInfo);
    if(data.success){
        setState({
            ...initialState,
            successMsg:data.message,
        });
    }
    else{
        setState({
            ...state,
            successMsg:'',
            errorMsg:data.message
        });
    }
  }
  if (answer == getExe.good_answer){
  }
  else{
    setHeart(heart-1)
  }
}
console.log(id)

const listQuestions = getExe.map((getExe) =>
<div>
{getExe.modules_id == id ? getExe.position == position ? <div>
<h1 key={getExe.id} className="questions">{getExe.questions}</h1>
<div className="content_btn">
<button className="btn_ques" onClick={() => handleQuestions(getExe, getExe.answer_one)}>{getExe.answer_one}</button>
<button id="deux" className="btn_ques" onClick={() => handleQuestions(getExe, getExe.answer_two)}>{getExe.answer_two}</button>
<button className="btn_ques" onClick={() => handleQuestions(getExe, getExe.answer_three)}>{getExe.answer_three}</button>
</div>
<p className="msg">Bienvenue</p>
<div className="content_sup">
<Link to={"Modules id="+getCoursesIdModules}><button id="cancel" className="btn_sup">Quitter</button></Link>
<button id="next" className="btn_sup" onClick={() => clickNext()}>Suivant</button>
</div>
</div>


: (<p></p>)

: (<p></p>)
}
</div>
);


  return(
    <div>
    <div class='ctn__head__exercices' id='ctn_heart'>
    {
      (heart == 3) ? <div className="ctn__heart"><div className="heart" id="heart_one"></div><div className='heart' id='heart_two'></div> <div className="heart" id='heart_three'></div></div> :
      (heart == 2) ? <div className="ctn__heart"><div className="heart" id="heart_one"></div><div className='heart' id='heart_two'></div></div> :
      (heart == 1) ? <div className="ctn__heart"><div className="heart" id="heart_one"></div></div> : <div></div>
    }
    </div>


    <section className="tpl">

    {(heart >= 0) ? listQuestions : <div>
      <h2>Terminé</h2>
      <h3>Veuillez réessayer une prochaine fois !</h3>
      <Link to='Modules'><button className="btn_sup">Continuer</button></Link>
      </div>}

      {(position == 21) ? <div>
        <h2>Terminé</h2>
        <h3>Féliciations !</h3>
        {errorMsg}
        <Link to='Modules'><button className="btn_sup">Continuer</button></Link>
        </div> : <div></div>}


    </section>
    </div>
  )
}

export default Exercices;
