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

const getInterviewersByDay = function(state, day) {
  let matchedInterviewers = [];
  let foundInterviewers = [];
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);

  for (let filteredDay of filteredDays) {
    let wantedArray = filteredDay.interviewers;
    foundInterviewers.push(...wantedArray);
  }
  
  for (let element of foundInterviewers) {
    matchedInterviewers.push(state.interviewers[element]);
  }

  return matchedInterviewers;
}
module.exports = { getAppointmentsForDay, getInterview, getInterviewersByDay }