import React from 'react'
import Password from './Password'
import NewPassword from './NewPassword'

class Usercards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userlist: [],
          userid: "",
          loading: true,
        };
      }
    
      //Ladda hem användarna till listan direkt.
      componentDidMount(){
          fetch("../api/people")
          .then(response => response.json())
          .then(data => this.setState({ userlist: data }));
          this.loading = false;
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
          <h1 className='title'>Login</h1>
          <p className='description'>Välj användare</p>
          <div className='grid'>
            {this.state.userlist.map(({ name, id, image }) => (
              <div onClick={(e) => this.choosePerson(e, id)}>
                <div key={id} value={name} className='card'>
                  <img src={image} width="100" alt="Profilbild" className="center"></img>
                  <h2>
                    {name}
                  </h2>
                  <Password userid={this.state.userid}/>
                  <NewPassword userid={this.state.userid}/>
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

export default Usercards;