import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const daysApi = axios.get("/api/days");
    const appointmentsApi = axios.get("/api/appointments");
    const interviewersApi = axios.get("/api/interviewers");

    Promise.all([daysApi, appointmentsApi, interviewersApi])
      .then((all) => {
        setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }));
      })
  }, []);


  const setDay = day => setState({ ...state, day });

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
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}