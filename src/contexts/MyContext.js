import React, { createContext,Component } from "react";
import axios from 'axios'
export const MyContext = createContext();

// Define the base URL
const Axios = axios.create({
    baseURL: 'https://guillaumedavid.com/php-login-registration-api/',
});

class MyContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
    }

    // Root State
    state = {
        showLogin:true,
        isAuth:false,
        theUser:null,
    }

    // Toggle between Login & Signup page
     toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // On Click the Log out button
     logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
    }

     registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('register.php',{
            name:user.name,
            email:user.email,
            password:user.password
        });

        return register.data;
    }


     loginUser = async (user) => {

        // Sending the user Login request
        const login = await Axios.post('login.php',{
            email:user.email,
            password:user.password
        });
        return login.data;
    }

    updateUser = async (user) => {

       // Sending the user registration request
       const register = await Axios.post('update.php',{
           name:user.name,
           currentName:user.currentName,
           currentEmail:user.currentEmail,
           email:user.email
       });

       return register.data;
   }

   updateEmailUser = async (user) => {

      // Sending the user registration request
      const register = await Axios.post('updateEmail.php',{
          currentEmail:user.currentEmail,
          email:user.email,
          password:user.password,
      });

      return register.data;
  }

  updatePasswordUser = async (user) => {

     const register = await Axios.post('updatePassword.php',{
         currentEmail:user.currentEmail,
         currentPassword:user.currentPassword,
         newPassword:user.newPassword,
     });
     return register.data;
 }

 updateModules = async (user) => {

   const modules = await Axios.post('Exercices.php',{
       currentEmail:user.currentEmail,
       currentExperience:user.currentExperience,
       addExp:user.addExp,
       currentModules:user.currentModules,
       modulesId:user.modulesId,
       positionModules:user.positionModules,
       currentPosition:user.currentPosition,
   });
   return modules.data;

 }


    // Checking user logged in or not
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        // If inside the local-storage has the JWT token
        if(loginToken){

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;

            // Fetching the user information
            const {data} = await Axios.get('user-info.php');

            // If user information is successfully received
            if(data.success && data.user){
                this.setState({
                    ...this.state,
                    isAuth:true,
                    theUser:data.user
                });
            }

        }
    }

    disconned = async () => {

    }

    render(){
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            updateUser:this.updateUser,
            updateEmailUser:this.updateEmailUser,
            updatePasswordUser:this.updatePasswordUser,
            updateModules:this.updateModules,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser
        }
        return(
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;
