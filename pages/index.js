import { Client } from '@notionhq/client'
import ProjectList from '../components/ProjectList'
import React from 'react'
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { setCookies, removeCookies } from 'cookies-next';
import Link from 'next/link'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userlist: [],
          userid: "",
          loading: true,
	password: "",
	newPassword: "",
        };
	
	this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

	this.handleNewChange = this.handleNewChange.bind(this);
        this.handleNewSubmit = this.handleNewSubmit.bind(this);


      }
    
      //Ladda hem användarna till listan direkt.
      componentDidMount(){
          fetch("../api/people")
          .then(response => response.json())
          .then(data => this.setState({ userlist: data }));
          this.loading = false;
      }

	//TODO: bättre hashning
  	// hashPassword(password) {
    // 	const hashDigest = sha256(password);
    // 	const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, "test"));
    // 	console.log(hmacDigest);
    // 	return hmacDigest;
  	// }

	//Hantering av lösenord.
  async handleSubmit(event) {
    // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        //Hasha lösenordet.
        //let hashedPassword = this.hashPassword(this.state.password);
        
        let loginData = {
        //pw: hashedPassword,
        pw: this.state.password,
        id: this.state.userid
        }

        //console.log(loginData);

        let returnedData;

        //Skicka det hashade lösenordet samt personens ID till servern.
        const response = await fetch("../api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        })
        .then((res) => res.json())
        .then(data => returnedData = data)
        //.then(data => console.log(data))

        //Är lösenordet fel, gå tillbaka.
        //TODO: Hantering av vad som skall hända om lösenordet är fel.
        if(returnedData.set === false)
        {
        return;
        }
        //Är lösenordet rätt, gå vidare.
        else
        {
        //Sätt kakan till det unika talet som servern skickar.
        setCookies("Björnligan", returnedData.data);
        //Gå vidare till projektsidan.
        Router.push("/project");
        }
    }

    handleChange(event) {
        this.setState({password: event.target.value});
      }

async handleNewSubmit(event) {
    event.preventDefault();
    console.log("userid: ", this.state.userid, "lösen: ", );
    //Hasha lösenordet.
    //let hashedPassword = this.hashPassword(this.state.newPassword);
    //console.log(hashedPassword);
    let newPassword = {
      //pw: hashedPassword,
      pw: this.state.newPassword,
      id: this.state.userid,
    }
    //Skicka det nya, hashade lösenordet samt användarens ID till servern.
    const response = await fetch("../api/login/newpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPassword),
    })
    .then((res) => res.json())
    .then(data => returnedData = data)
    //.then(data => console.log(data))
  }

handleNewChange(event) {
        this.setState({newPassword: event.target.value});
      }

    choosePerson(e, id) {
        console.log("id: ", this.state.userid, "lösen: ", this.state.newpassword);
    
        for (let i = 0; i < this.state.userlist.length; i++) {
          if (this.state.userlist[i].id === id) {
            return this.setState({
              userid: id,
            })
          }
        }
      }

    render() {
        return(
        <>
          <div className='container'>
            <main className='main'>
              <h1 className='title'>Välj användare och skriv in ditt lösenord för att logga in</h1>
              <p className='description'></p>
              <div className='grid'>
                {this.state.userlist.map(({ name, id, image }) => (
                  <div onClick={(e) => this.choosePerson(e, id)}>
                    <div key={id} value={name} className='card'>
                      <img src={image} width="100" alt="Profilbild" className="center"></img>
                      <h2>
                        {name}
                      </h2>

                        <form onSubmit={this.handleSubmit}>
                        <input
                          type='text'
                          placeholder='Enter password...'
                          onChange={this.handleChange}
                          
                          required
                        />
                        <br></br>
                        <button >Submit</button>
                        </form>

                        <form onSubmit={this.handleNewSubmit}>
                        <input
                          type='text'
                          placeholder='Enter new password...'
                          onChange={this.handleNewChange}
                          
                          required
                        />
                        <br></br>
                        <button >Submit</button>
                        </form>

                    </div>
                  </div>
                ))}
              </div>
            </main >
          </div >
        </>

        )
    }
}

export default Login;