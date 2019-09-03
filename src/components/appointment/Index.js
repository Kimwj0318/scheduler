import React from "react";
import "components/appointment/Styles.scss";
import Empty from "components/appointment/Empty";
import Header from "components/appointment/Header";
import Show from "components/appointment/Show";

export default function Appointment(props) {
  const test = props.interview;

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {test ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/> }
    </article>
  )
}