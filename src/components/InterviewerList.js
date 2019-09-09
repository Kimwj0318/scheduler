import React from "react";
import "components/InterviewList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const InterviewerList = props.interviewers.map(value => {
    return <InterviewerListItem
      key={value.id}
      name={value.name} 
      avatar={value.avatar} 
      selected={value.id === props.interviewer}
      onChange={event => props.onChange(value.id)}
      />
  });
  return (
    <section className="interviewers__header">
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  onChange: PropTypes.func.isRequired
};