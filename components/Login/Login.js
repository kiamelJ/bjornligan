import React from 'react'
import { useState } from "react";

import router from 'next/router'
import jwt from 'jsonwebtoken'

import styles from '../../styles/Temp.module.css'

const LoginPage = ({project}) => {
    const[username, setUsername] = useState();
    const[password, setPassword] = useState();


    const Login = async (event) =>{
        event.preventDefault();
        let response = await fetch("../api/login/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, password: password}),
          })
          .then(res => res.json());
          console.log(response);

          if(response.success == true)
          {
            //router.push('./projects');
          }
          else if(response.success == false)
          {
        
            console.log("fel lösen");
          }
    }
      return(
        <div className={styles.container}>
          <form className={styles.form} onSubmit={Login}>
            <div className={styles.inputs}>
              <label htmlFor='note'>Username</label>
              <input
                name='note'
                type='text'
                placeholder='Enter username...'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
            <label htmlFor='project'>Password</label>
            <input
            name='project'
            type='password'
            placeholder='Select project...'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            />
            <button type='submit'>Log in</button>
            </form>
        </div>
        )
    
      return(
        <>
        <h1>Fel lösenord</h1>
        <button type='submit' onClick={setWrongPassword("false")}>Klicka här för att gå tillbaka</button>
        </>

      )
    

    


}

export default LoginPage;



// class Password extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             password: "",
//         }
        
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     //Hantering av lösenord.
//   async handleSubmit(event) {
//     // Stop the form from submitting and refreshing the page.
//         event.preventDefault();

//         //Hasha lösenordet.
//         //let hashedPassword = Hash(this.state.password);
        
//         let loginData = {
//         pw: this.state.password,
//         userid: this.props.userid
//         }

//         console.log(loginData);


//         //Skicka det hashade lösenordet samt personens ID till servern.
//         let response;
//         await fetch("../api/login/login", {
//         method: "post",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//         })
//         .then((res) => res.json())
//         .then(res => response = res.success);

//         if(response == true)
//         {
//           Router.push('/projects');
//         }
//         else{
//           console.log("Fel lösenord");
//         }
        
//     }

//     handleChange(event) {
//         this.setState({password: event.target.value});
//       }

//     render() {
//         return (
//         <form onSubmit={this.handleSubmit}>
//         <input
//           type='password'
//           placeholder='Enter password...'
//           onChange={this.handleChange}
          
//           required
//         />
//         <br></br>
//         <button >Submit</button>
//         </form>
//         )

//     };
//   };
  
//   export default Password;
  