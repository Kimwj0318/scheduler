import React, {useEffect} from "react";
import "components/appointment/Styles.scss";
import Empty from "components/appointment/Empty";
import Header from "components/appointment/Header";
import Show from "components/appointment/Show";
import Form from "components/appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "components/appointment/Status";
import Confirm from "components/appointment/Confirm";
import Error from "components/appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const deleteInterview = function(e) {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(()=> transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  };

  const confirmAlert = function() {
    transition(CONFIRM);
  }

  const edit = function() {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {confirmAlert}
          onEdit = {edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
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
      {mode === ERROR_DELETE && (
        <Error
          message = "delete"
          onClose= {()=> back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message = "save"
          onClose= {()=> back()}
        />
      )}
    </article>
  )
}