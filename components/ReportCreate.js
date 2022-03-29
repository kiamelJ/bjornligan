import React from "react";
import { getCookie } from "cookies-next";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Form.module.css";

const ReportCreate = () => {
  const [data, setData] = useState({
    note: "",
    date: new Date(),
    hour: 0,
    person: getCookie("User"),
    project: getCookie("Project.Id"),
  });

  async function submitReport(event) {
    event.preventDefault();
    console.log("input: ", data);

    await fetch("../api/timereport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response, data) => {
      if (response.ok) {
        alert("Your report has been submitted");
        window.location.reload(true);
      }
    })
  }
 
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitReport}>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="note">Note</label>
            <input
              name="note"
              type="text"
              placeholder="Enter comment..."
              value={data.note}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
        </div>

        <label htmlFor="date">Date</label>
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={data.date}
          onChange={(e) => setData({ ...data, date: e })}
          required
        />

        <label htmlFor="hour">Hours</label>
        <input
          name="hour"
          type="number"
          placeholder="Enter hours..."
          pattern="^[0-9]*$"
          value={data.hours}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
          required
        />
        <button className={styles.btn} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportCreate;
