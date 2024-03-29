import React, {useContext,useState} from 'react'
import {MyContext} from '../contexts/MyContext'
import '../styles/ModalSignUp.scss'

function ModalSignUp({ showModal, children }){

  const {registerUser} = useContext(MyContext);
    const initialState = {
        userInfo:{
            name:'',
            email:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
    }
    const [state,setState] = useState(initialState);

    // On Submit the Registration Form
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await registerUser(state.userInfo);
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

    // On change the Input Value (name, email, password)
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
  showModal && (
    <div className="modal__back">

      <div className="modal__cont">
        <h2 className='modal__title'>Inscription</h2>
        <form onSubmit={submitForm} noValidate>
                <div className="form-control">
                    <label>Pseudo</label>
                    <input name="name" required type="text" value={state.userInfo.name} onChange={onChangeValue} placeholder="Enter your Pseudo"/>
                </div>
                <div className="form-control">
                    <label>Email</label>
                    <input name="email" required type="email" value={state.userInfo.email} onChange={onChangeValue} placeholder="Enter your email"/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue} placeholder="Enter your password"/>
                </div>
                {errorMsg}
                {successMsg}
                <div className="form-control">
                    <button type="submit" className='modal__btn'>Sign Up</button>
                </div>
            </form>

        {children}

      </div>

    </div>
  )
  )
}

export default ModalSignUp;
