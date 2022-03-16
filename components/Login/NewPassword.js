import React from 'react'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { setCookies, removeCookies } from 'cookies-next';


class NewPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: "",
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
  //Hantering av nytt lösenord
  async handleSubmit(event) {
    event.preventDefault();
    console.log("userid: ", this.props.userid, "lösen: ", );
    //Hasha lösenordet.
    let hashedPassword = this.hashPassword(this.state.newPassword);
    console.log(hashedPassword);
    let newPassword = {
      pw: hashedPassword,
      id: this.props.userid,
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

    handleChange(event) {
        this.setState({newPassword: event.target.value});
      }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='Enter new password...'
          onChange={this.handleChange}
          
          required
        />
        <br></br>
        <button >Submit</button>
        </form>
        )

    };
  };
  
  export default NewPassword;
  