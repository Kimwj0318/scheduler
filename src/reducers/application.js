const reducer = function (state, action) {
  switch (action.type) {
    case "SET_DAY":
      return ({...state, day:action.value})
    case "SET_APPLICATION_DATA":
      return ({...state, days:action.daysData, appointments:action.appointmentsData, interviewers:action.interviewersData})
    case "SET_INTERVIEW":
      const newAppoint = state["appointments"];
      const newDays = state.days.map((day) => {
        if(day.appointments.includes(action.id)){
          if (!newAppoint[action.id]["interview"]){
            let newSpotAmount = day.spots;
            newSpotAmount -= 1;
            return {...day, spots: newSpotAmount}
          }else {
            if (!action.interview) {
              let newSpotAmount = day.spots;
              newSpotAmount += 1;
              return {...day, spots: newSpotAmount}
            }
          } 
        }
        return {...day}
      })
      newAppoint[action.id]["interview"] = action.interview;
      return { ...state, appointments: newAppoint, days:newDays };
    default:
      throw new Error(
        `tried to reduce with unsupported action type`
      );
  }
}

export default function constants() {
  return (
    {
      reducer
    }
  )
} 