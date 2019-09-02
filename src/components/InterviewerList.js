import React from "react";
import "components/InterviewList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";

export default function InterviewerList(props) {

  const InterviewerList = props.interviewers.map(interview => {
    return <InterviewerListItem
      key={interview.id}
      name={interview.name} 
      avatar={interview.avatar} 
      selected={interview.name === props.name}
      setDay={props.setInterviewer}  
      />
  });
  return <section className="interviewers__header">
            <h4 className="interviewers__header">Interviewer</h4>
            <ul className="interviewers__list">{InterviewerList}</ul>
          </section>;
}