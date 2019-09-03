import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/appointment/Index.js";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors.js";
import { promised } from "q";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    const daysApi = Axios.get("/api/days");
    const appointmentsApi = Axios.get("/api/appointments");
    const interviewersApi = Axios.get("/api/interviewers");

    Promise.all([daysApi, appointmentsApi, interviewersApi])
    .then((all) => {
      setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }));
    })
  },[]);

  const appointment = getAppointmentsForDay(state, state.day);

  const ScheduleList = appointment.map(appointment => {
    const interview=getInterview(state, appointment.interview);

    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      />
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list"></ul>
      </section>
      <section className="schedule">
        {ScheduleList}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
