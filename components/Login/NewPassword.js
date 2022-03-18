import React from 'react'
import Hash from './Hashing'

class NewPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: "",
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  

    //Hantering av lösenord.
  //Hantering av nytt lösenord
  async handleSubmit(event) {
    event.preventDefault();
    console.log("userid: ", this.props.userid, "lösen: ", );
    //Hasha lösenordet.
    let hashedPassword = Hash(this.state.newPassword);
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
          type='password'
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
  