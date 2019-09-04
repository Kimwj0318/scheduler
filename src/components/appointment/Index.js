import React from "react";
import "components/appointment/Styles.scss";
import Empty from "components/appointment/Empty";
import Header from "components/appointment/Header";
import Show from "components/appointment/Show";
import Form from "components/appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "FORM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, false)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={props.onSave}
          onCancel={() => back()}
        />
      )}
    </article>
  )
}