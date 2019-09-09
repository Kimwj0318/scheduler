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

export default function constants() {
  return (
    {
      SET_DAY,
      SET_APPLICATION_DATA,
      SET_INTERVIEW,
      reducer
    }
  )
} 