import { useEffect, useReducer } from "react";
import axios from "axios";
import  constants from "reducers/application";
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData () {
  const { reducer } = constants();
 
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

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
      // uncomment these lines if you want to run the tests in jest
      // .then(response => {
      //   dispatch({ type: SET_INTERVIEW, id, interview });
      // })
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
      // uncomment these lines if you want to run the tests in jest
      // .then(response => {
      //   dispatch({ type: SET_INTERVIEW, id, interview: data });
      // })
    );
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}