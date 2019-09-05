import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/appointment/Index.js";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "../helpers/selectors.js";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    const daysApi = axios.get("/api/days");
    const appointmentsApi = axios.get("/api/appointments");
    const interviewersApi = axios.get("/api/interviewers");

    Promise.all([daysApi, appointmentsApi, interviewersApi])
      .then((all) => {
        setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }));
      })
  }, []);
  
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const url = (`/api/appointments/` + id);
    const data = {interview};
    return (
      axios.put(
        url,
        data
      )
      .then(response => {
        setState({...state, appointments});
        return response.config.data
      })
    );
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const url = (`/api/appointments/` + id);
    const data = null;
    return (
      axios.delete(
        url,
        data
      )
      .then(response => {
        setState({...state, appointments});
      })
    );
  }

  const editInterview = function (id) {
    const information = state.appointments[id].interview;
    return information
  }

  const interviewers = getInterviewersByDay(state, state.day);
  const appointment = getAppointmentsForDay(state, state.day);
  const ScheduleList = appointment.map(appointment => {
    const interview=getInterview(state, appointment.interview);
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      editInterview={editInterview}
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
        <h4 className="interviewers__header text--light"></h4>
        <ul className="interviewers__list"></ul>
      </section>
      <section className="schedule">
        {ScheduleList}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
