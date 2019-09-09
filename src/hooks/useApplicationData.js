import { useEffect, useReducer } from "react";
import axios from "axios";
import  constants from "reducers/application";

export default function useApplicationData () {
  const { SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW, reducer } = constants();
 
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8001");

    ws.onmessage = (event) => {
      let eventData = JSON.parse(event.data);
      if (eventData.type === SET_INTERVIEW) {
        dispatch({type: SET_INTERVIEW, id: eventData.id, interview: eventData.interview});
      }
    }
    const daysApi = axios.get("/api/days");
    const appointmentsApi = axios.get("/api/appointments");
    const interviewersApi = axios.get("/api/interviewers");

    Promise.all([daysApi, appointmentsApi, interviewersApi])
      .then((all) => {
        const daysData = all[0].data;
        const appointmentsData = all[1].data;
        const interviewersData = all[2].data;
        return dispatch({ 
          type: SET_APPLICATION_DATA,
          daysData,
          appointmentsData,
          interviewersData
        })
      })    
  },[]);

  const setDay = day => dispatch({type: SET_DAY, value: day })

  const bookInterview = function (id, interview) {
    const url = (`/api/appointments/` + id);
    const data = {interview};
    return (
      axios.put(
        url,
        data
      )
    );
  };

  const cancelInterview = function (id) {
    const url = (`/api/appointments/` + id);
    const data = null;
    return (
      axios.delete(
        url,
        data
      )
    );
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}