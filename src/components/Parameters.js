import '../styles/Parameters.scss'
import {MyContext} from '../contexts/MyContext'
import HomeCourses from './HomeCourses.js'
import React,{useState,useEffect, useContext} from 'react'

function Parameters (){

  const {rootState,logoutUser,updateUser,updateEmailUser,updatePasswordUser} = useContext(MyContext);
  const {isAuth,theUser,showLogin} = rootState;

  const {toggleNav,registerUser} = useContext(MyContext);
    const initialState = {
        userInfo:{
            name:'',
            currentName:'',
            currentEmail:'',
            email:'',
            password:'',
            currentPassword:'',
            newPassword:'',
        },
        errorMsg:'',
        successMsg:'',
    }
    const [state,setState] = useState(initialState);

  const submitForm = async (event) => {
      event.preventDefault();
      const data = await updateUser(state.userInfo);
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

  const submitFormEmail = async (event) => {
      event.preventDefault();
      const data = await updateEmailUser(state.userInfo);
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

  const submitFormPassword = async (event) => {
      event.preventDefault();
      const data = await updatePasswordUser(state.userInfo);
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

  const onChangeValue = (e) => {
      setState({
          ...state,
          userInfo:{
              ...state.userInfo,
              [e.target.name]:e.target.value
          }
      });
  }

  // Show Message on Success or Error
  let successMsg = '';
  let errorMsg = '';
  if(state.errorMsg){
      errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if(state.successMsg){
      successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return(
    <div>
    {(isAuth) ?
      <div className="cont__Param">

      <div className="msg__update">
      {errorMsg}
      {successMsg}
      </div>

      <div className="update__pseudo">
      <h2 className="title__update">Changer de Pseudo : </h2>
      <div className="current">Pseudo Actuel : {state.userInfo.currentName = theUser.pseudo}</div>
      <form onSubmit={submitForm} noValidate className="form__update__pseudo">
<div className="label__update__pseudo">
          <label className="label__name">Nouveau Pseudo : </label>
          <input name="name" required type="text" value={state.userInfo.name} onChange={onChangeValue}  className="input__update"/>
</div>
      <button type="submit" className="btn__update">Changer de Pseudo</button>
      </form>
      </div>


<div className="update__email">
      <h2 className="title__update">Changer d'adresse email : </h2>
      <form onSubmit={submitFormEmail} noValidate className="form__update__email">


      <div className="current">Email Actuel : {state.userInfo.currentEmail = theUser.email}</div>
      <div className="label__update__newEmail">
          <label className="label__name">Nouvelle adresse email :</label>
          <input name="email" type="email" required  value={state.userInfo.email} onChange={onChangeValue}  className="input__update"/>
</div><div className="label__update__password">
          <label className="label__name">Mot de Passe :</label>
          <input name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue}  className="input__update"/>
</div>
      <button type="submit" className="btn__update">Changer d'email</button>
      </form>
      </div>


      <div className="update__pass">
      <h2 className="title__update">Changer de Mot de Passe : </h2>
      <form onSubmit={submitFormPassword} noValidate>

<div>
          <label className="label__name">Mot de Passe Actuel :</label>
          <input name="currentPassword"  type="password" required  value={state.userInfo.currentPassword} onChange={onChangeValue} className="input__update"/>
</div><div>
          <label className="label__name">Nouveau Mot de passe :</label>
          <input name="newPassword"  type="password" value={state.userInfo.NewPassword} onChange={onChangeValue}  className="input__update"/>
</div>

      <button type="submit" className="btn__update">Changer de Mot de Passe</button>
      </form>
      </div>

      </div>
      : <HomeCourses/>
    }
    </div>
  );
}

export default Parameters;
