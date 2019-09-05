import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData () {
  
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const REMOVE_INTERVIEW = "REMOVE_INTERVIEW";
  const UPDATE_SPOTS = "UPDATE_SPOTS";

  const reducer = function (state, action) {
    switch (action.type) {
      case SET_DAY:
        return ({...state, day:action.value})
      case SET_APPLICATION_DATA:
        return ({...state, days:action.daysData, appointments:action.appointmentsData, interviewers:action.interviewersData})
      case SET_INTERVIEW:
          const newAppoint = state["appointments"];
          newAppoint[action.id]["interview"] = action.interview;
          return { ...state, appointments: newAppoint };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
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

  }, []);


  const setDay = day => dispatch({type: SET_DAY, value: day })

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
        dispatch({ type: SET_INTERVIEW, id, interview });
        // console.log("state after booking interview", state);
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
        dispatch({ type: SET_INTERVIEW, id, interview: null });
        // console.log("state after removing interview", state);
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