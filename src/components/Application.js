import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/appointment/Index.js";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "../helpers/selectors.js";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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
