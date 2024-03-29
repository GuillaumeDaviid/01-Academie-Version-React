import '../styles/Header.scss';
import logo from '../images/logo.png'
import ModalLogIn from './ModalLogIn.js'
import ModalSignUp from './ModalSignUp.js'
import {MyContext} from '../contexts/MyContext'
import React,{useState, useContext} from 'react'
import { Link } from "react-router-dom";


function Header() {
  const {rootState,logoutUser} = useContext(MyContext);
  const {isAuth,theUser} = rootState;

  const [openModal, setOpenModal] = useState(false)

  const [openModalSign, setOpenModalSign] = useState(false);

  const popLogIn = () => {
    setOpenModal(true)
  }

  const popSignUp = () =>{
    setOpenModalSign(true)
  }

  const popModal = (bool, bool2) => {
    setOpenModal(bool)
    setOpenModalSign(bool2)
  }

  const logOut = () => {
    logoutUser();
    window.location.reload(false);
  }

  return (

    <div className="">

    <header>
    <div id="content">
<div className="lg">
    <Link to="/" className="logo"><img src={logo} alt="logo" data-testid="logo"/></Link>
</div>

<div className='pages'>
<Link to="Success" className='page_suc' href='success.php' data-testid="success">SUCCES</Link>
<p className='border'></p>
<Link to="/" className='page_cou' href='courses.php' data-testid="cours">COURS</Link>
</div>


{/*(isAuth) ? <div><nav>
<ul>
   <li className=''><a href="http://localhost:3000/"className="img_header">{theUser.pseudo}</a>
        <ul className="sous">
            <li><Link to="Profil" className='a'>Profil</Link></li>
            <li><Link to="Parameters" className='a'>Paramétres</Link></li>
            <li><Link to='/'className='a' onClick={logOut}>Déconnexion</Link></li>
        </ul>
    </li>

    </ul>
</nav></div> : <div className = "btn">
    <Link to="/" className ="btn__login" href="login.php" onClick={() => popLogIn()} data-testid="logIn">Connexion</Link>
<Link to="/" className ="btn__signUp" href="signup.php" onClick={() => popSignUp()} data-testid="signUp">S'inscrire</Link> 
  </div>
  */}





</div>
    </header>
    <ModalLogIn  showModal={openModal}>
    <div>
       <button className='modal__btn' onClick={() => setOpenModal(false)}>Fermer</button>
    </div>
    <div className='modal__info'>
    Pas encore de compte ? <button className='modal__btn' onClick={() => popModal(false, true)}>S'incrire</button>
    </div>
    </ModalLogIn>

    <ModalSignUp  showModal={openModalSign}>
    <div>
       <button className='modal__btn' onClick={() => setOpenModalSign(false)}>Fermer</button>
    </div>
    <div className='modal__info'>
    Deja inscrit ? <button className='modal__btn' onClick={() => popModal(true, false)}>Se Connecter</button>
    </div>
    </ModalSignUp>


    </div>
  );
}

export default Header;
