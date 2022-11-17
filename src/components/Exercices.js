import '../styles/Exercices.scss';
import React, {useContext,useState} from 'react'
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


const { dt, error, isLoading } = useFetch("https://guillaumedavid.com/server/ex_req_ajax.php")

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

const handleQuestions = async (dt, answer) =>{
  setPosition(position+1)
  if (dt.position == 20){

    state.userInfo.currentEmail = theUser.email;
    state.userInfo.currentModules = theUser.modules_completed;
    state.userInfo.modulesId = getCoursesIdModules;
    state.userInfo.currentExperience = theUser.experience;
    state.userInfo.positionModules = getPositionModules;
    state.userInfo.addExp = getExpModules;

    if(getCoursesIdModules == 2){
      state.userInfo.currentPosition = theUser.last_module_css;
    }

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
  if (answer == dt.good_answer){
  }
  else{
    setHeart(heart-1)
  }
}

const listQuestions = dt.map((dt) =>
<div>
{dt.modules_id == id ? dt.position == position && <div>
<h1 key={dt.id} className="questions">{dt.questions}</h1>
<div className="content_btn">
<button className="btn_ques" onClick={() => handleQuestions(dt, dt.answer_one)}>{dt.answer_one}</button>
<button id="deux" className="btn_ques" onClick={() => handleQuestions(dt, dt.answer_two)}>{dt.answer_two}</button>
<button className="btn_ques" onClick={() => handleQuestions(dt, dt.answer_three)}>{dt.answer_three}</button>
</div>
<p className="msg">Bienvenue</p>
<div className="content_sup">
<Link to={"Modules id="+dt.courses}><button id="cancel" className="btn_sup">Quitter</button></Link>
<div data-testid="click-element"><button id="next" className="btn_sup" onClick={() => clickNext()}>Suivant</button></div>
</div>
</div>


: (<p></p>)

}
</div>
);


  return(
    <div>
      {!isLoading ? <div className='ctn__head__exercices' id='ctn_heart'>
    {
      (heart == 3) ? <div className="ctn__heart"><div className="heart" id="heart_one" data-testid="heart-element"></div><div className='heart' id='heart_two' data-testid="heart-element"></div> <div className="heart" id='heart_three' data-testid="heart-element"></div></div> :
      (heart == 2) ? <div className="ctn__heart"><div className="heart" id="heart_one" data-testid="heart-element"></div><div className='heart' id='heart_two' data-testid="heart-element"></div></div> :
      (heart == 1) ? <div className="ctn__heart"><div className="heart" id="heart_one" data-testid="heart-element"></div></div> : <div></div>
    }
    </div> : <div></div>}
    

    <section className="tpl">

      {error === true ? <div>Une erreur est survenue, veuillez réessayer</div> : <div></div>}

      {isLoading ? <div className='loading' data-testid="loading"></div> : <div></div>}

    {(heart >= 0) ? listQuestions : <div>
      <h2>Terminé</h2>
      <h3>Veuillez réessayer une prochaine fois !</h3>
      <Link to="/"><button className="btn_sup">Continuer</button></Link>
      </div>}

      {(position == 21) ? <div>
        <h2>Terminé</h2>
        <h3>Féliciations !</h3>
        {errorMsg}
        <Link to="/"><button className="btn_sup">Continuer</button></Link>
        </div> : <div></div>}


    </section>
    </div>
  )
}

export default Exercices;
