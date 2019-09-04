const getAppointmentsForDay = function(state, day) {
  let matchedAppointments = [];
  let foundAppointments = [];
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);

  for (let filteredDay of filteredDays) {
    let wantedArray = filteredDay.appointments;
    foundAppointments.push(...wantedArray);
  }
  
  for (let element of foundAppointments) {
    matchedAppointments.push(state.appointments[element]);
  }

  return matchedAppointments;
};

const getInterview = function(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
  return null;
}

module.exports = { getAppointmentsForDay, getInterview }