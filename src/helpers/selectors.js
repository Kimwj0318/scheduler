const getAppointmentsForDay = function(state, day) {
  let returnArray = [];
  let intermediateArray = [];
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);

  for (let filteredDay of filteredDays) {
    let wantedArray = filteredDay.appointments;
    intermediateArray.push(...wantedArray);
  }
  
  for (let element of intermediateArray) {
    returnArray.push(state.appointments[element]);
  }

  return returnArray;
};

const getInterview = function(state, interview) {
  let returnObject = {};
  if(interview) {
  returnObject["student"] = interview.student;
  const interviewer = interview.interviewer;
    returnObject["interviewer"] = state.interviewers[interviewer];
    return returnObject;
  }
  return null;
}

module.exports = { getAppointmentsForDay, getInterview }