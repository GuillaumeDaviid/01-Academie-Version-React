import React,{useState, useCallback, useContext} from 'react'
import {MyContext} from '../contexts/MyContext'
import '../styles/ModalLogIn.scss'

function ModalLogIn({ showModal, children }){

  const {toggleNav,loginUser,isLoggedIn} = useContext(MyContext);

  const initialState = {
        userInfo:{
            email:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
    }

  const [state,setState] = useState(initialState);

  const[pseudo, setPseudo] = useState("");
  const[password, setPassword] = useState("");


  const handleSubmit = e => {
    e.preventDefault();
  }

  const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
        console.log(state);
    }

  const submitForm = async (event) => {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if(data.success && data.token){
            setState({
                ...initialState,
            });
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();
            window.location.reload(false);
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }


// message
    let successMsg = '';
    let errorMsg = '';
    if(state.errorMsg){
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }

    function refreshPage() {
    window.location.reload(false);
  }





  return(
  showModal && (
    <div className="modal__back">

      <div className="modal__cont">
        <h2>Connexion</h2>
        <form onSubmit={submitForm} noValidate class="form__logIn" /*onSubmit={handleSubmit}*/>

        <label>Email :
        <input name="email" type="email" required placeholder="Enter your email" value={state.userInfo.email} onChange={onChangeValue} />
        </label>

        <label>Mot de Passe :
         <input name="password" type="password" required placeholder="Enter your password" value={state.userInfo.password} onChange={onChangeValue} />
        </label>

        {errorMsg}
        {successMsg}

        <button type="submit">Connexion</button>

        </form>

        {children}

      </div>

    </div>
  )
  )
}

export default ModalLogIn;
