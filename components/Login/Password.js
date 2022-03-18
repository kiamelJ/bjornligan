import React from 'react'
import Router from 'next/router'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { setCookies, removeCookies } from 'cookies-next';


class Password extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  //TODO: bättre hashning
  hashPassword(password) {
    const hashDigest = sha256(password);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, "test"));
    console.log(hmacDigest);
    return hmacDigest;
  }

    //Hantering av lösenord.
  async handleSubmit(event) {
    // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        //Hasha lösenordet.
        let hashedPassword = this.hashPassword(this.state.password);
        
        let loginData = {
        pw: hashedPassword,
        id: this.props.userid
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
        setCookies("Username", returnedData.name)
        //Gå vidare till projektsidan.
        Router.push("./projects")
        }
    }

    handleChange(event) {
        this.setState({password: event.target.value});
      }

    render() {
        return (
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
        )

    };
  };
  
  export default Password;
  