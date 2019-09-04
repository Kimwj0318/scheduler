import React from "react";
import "components/appointment/Styles.scss";
import Empty from "components/appointment/Empty";
import Header from "components/appointment/Header";
import Show from "components/appointment/Show";
import Form from "components/appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "components/appointment/Status";
import Confirm from "components/appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const deleteInterview = function(){
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(()=> transition(EMPTY));
  }
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  };

  const confirmAlert = function() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {confirmAlert}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={deleteInterview}
        />
      )}
    </article>
  )
}