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



class LoginPW extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newpassword: "",
      user: "",
      userid: "",
      userlist: [],
      loading: true,
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);

    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);
  }

  //Ladda hem användarna till listan direkt.
  componentDidMount(){
      fetch("../api/people")
      .then(response => response.json())
      .then(data => this.setState({ userlist: data }));
      this.loading = false;
  }

  //TODO: bättre hashning
  hashPassword(password) {
    const hashDigest = sha256(password);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, "test"));
    return hmacDigest;
  }

  handleChangePassword(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }

  handleChangeNewPassword(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    return this.setState({
      newpassword: value,
    });

  }

  handleChangeUser = (event) => {
    const target = event.target;
    const value = target.value;

    return this.setState({
      userid: value,
    });
  }

  
  //Hantering av lösenord.
  async handleSubmitPassword(event) {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    //Hasha lösenordet.
    let hashedPassword = this.hashPassword(this.state.password);
    
    let loginData = {
      pw: hashedPassword,
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
      setCookies("User", returnedData.data);
      //Gå vidare till projektsidan.
      Router.push("/project");
    }
  }

  //Hantering av nytt lösenord
  async handleSubmitNewPassword(event) {
    event.preventDefault();
    console.log("new password");
    //Hasha lösenordet.
    let hashedPassword = this.hashPassword(this.state.newpassword);
    console.log(hashedPassword);
    let newPassword = {
      pw: hashedPassword,
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

  render() {
    
    if (this.loading) return <p>Loading...</p>
    //Svart magi.
    return (
    <>
    <select onChange={this.handleChangeUser} >
      <option value="none" selected disabled hidden>Select user</option>
      {this.state.userlist.map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
    
    <form onSubmit={this.handleSubmitPassword}>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='text'
          placeholder='Enter password...'
          
          onChange={this.handleChangePassword}
          required
        />
        <button type='submitPassword'>Submit</button>
        </form>

        <form onSubmit={this.handleSubmitNewPassword}>
        <label htmlFor='setPassword'>New Password</label>
        <input
          name='setPassword'
          type='text'
          placeholder='Enter new password...'
          onChange={this.handleChangeNewPassword}
          required
        />
        <button type='submitNewPassword'>Submit</button>
        </form>
    
    </>
    )
  }

}



export default LoginPW;
