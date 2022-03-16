import React from "react";
import { getCookie } from "cookies-next";
import styles from '../../styles/Temp.module.css'

/** props person-ID och project-ID
 * Namn?
 * */
class FormTimeReport extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      note: "",
      date: "",
      hours: "",
      person: getCookie("Björnligan"),
      project: getCookie("Project.Id"),
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

    const response = await fetch("../api/timereport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    });

    // Hmm: felhantering
    // if(!response.ok){ }
    console.log("INDEX", response);

    // Hmm: clear the form out
    // setValue(initialState);
  }

  render() {
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.inputs}>
            <label htmlFor='note'>Note</label>
            <input
              name='note'
              type='text'
              placeholder='Enter comment...'
              value={this.state.note}
              onChange={this.handleChange}
              required
            />
          </div>

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
          {/* 
        TODO: bort sen
        <label htmlFor='project'>Project</label>
        <input
          name='project'
          type='text'
          placeholder='Select project...'
          value={this.state.project}
          onChange={this.handleChange}
          required
        />

        TODO: bort sen
        <label htmlFor='person'>Person</label>
        <input
          name='person'
          type='text'
          placeholder='Select person...'
          value={this.state.person}
          onChange={this.handleChange}
          required
        /> */}
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
export default FormTimeReport;
