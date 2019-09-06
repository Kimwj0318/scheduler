import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function (state, action) {
  switch (action.type) {
    case SET_DAY:
      return ({...state, day:action.value})
    case SET_APPLICATION_DATA:
      return ({...state, days:action.daysData, appointments:action.appointmentsData, interviewers:action.interviewersData})
    case SET_INTERVIEW:
      const newAppoint = state["appointments"];
      const days = state["days"];
      for (let day of days) {
        if(day.appointments.includes(action.id)){
          if (!newAppoint[action.id]["interview"]){
            day.spots -= 1;
          }else {
            if (!action.interview) {
              day.spots += 1;
            }
          } 
        }
      }
      newAppoint[action.id]["interview"] = action.interview;
      return { ...state, appointments: newAppoint, days:days };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData () {
 
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