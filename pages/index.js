import { Client } from '@notionhq/client'
import ProjectList from '../components/ProjectList'
import React from 'react'
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { setCookies, removeCookies } from 'cookies-next';
import Link from 'next/link'



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

  componentDidMount(){
      fetch("../api/people")
      .then(response => response.json())
      .then(data => this.setState({ userlist: data }));

    this.loading = false;
  }

  //TODO: bättre hashning
  hashPassword(password) {
    let seed = 0;
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < password.length; i++) {
        ch = password.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1>>>0)).toString();
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

  

  async handleSubmitPassword(event) {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    let hashedPassword = this.hashPassword(this.state.password);
    
    let loginData = {
      pw: hashedPassword,
      id: this.state.userid
    }

    //console.log(loginData);

    let returnedData;

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

    if(returnedData.set === false)
    {
      return;
    }
    else
    {
      setCookies("User", returnedData.data);
      Router.push("/project");
    }
  }

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
