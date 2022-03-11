import React from "react";
// import styles from "../styles/Home.module.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      date: "",
      hours: "",
      person: "",
      project: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    console.log(this.state);

    //Hmm: component(?) addReport({this.state})
    const response = await fetch("../api/timereport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    });
    console.log("INDEX", response);

    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }

    //Hmm: clear the form out
    // setValue(initialState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='note'>Note</label>
        <input
          name='note'
          type='text'
          placeholder='Enter comment...'
          value={this.state.note}
          onChange={this.handleChange}
          required
        />

        <label htmlFor='date'>Date</label>
        <input
          name='date'
          type='text'
          pattern='([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))'
          title='(YYYY-MM-DD)'
          placeholder='YYYY-MM-DD'
          value={this.state.date}
          onChange={this.handleChange}
          required
        />

        <label htmlFor='hours'>Hours</label>
        <input
          name='hours'
          type='number'
          placeholder='Enter hours...'
          pattern='^[0-9]*$'
          value={this.state.hours}
          onChange={this.handleChange}
          required
        />

        {/* select */}
        <label htmlFor='project'>Project</label>
        <input
          name='project'
          type='text'
          placeholder='Select project...'
          value={this.state.project}
          onChange={this.handleChange}
          required
        />

        {/* select */}
        <label htmlFor='person'>Person</label>
        <input
          name='person'
          type='text'
          placeholder='Select person...'
          value={this.state.person}
          onChange={this.handleChange}
          required
        />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}
export default Home;
