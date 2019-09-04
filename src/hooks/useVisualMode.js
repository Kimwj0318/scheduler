import React, { useState } from "react"

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (nextValue, replace = false) {
    if (replace) {
      history.pop();
      setHistory(history);
      setMode(nextValue);
      setHistory(prev => [ ...prev , nextValue]);
    } else {
      setMode(nextValue);
      setHistory(prev => [ ...prev , nextValue]);
    }
  }

  const back = function () {
    if(history.length > 1) {
      history.pop();
      setHistory(history);
      let previousValue = history.slice(-1)[0];
      setMode(previousValue);
    } else {
      setMode(history[0]);
    }
  }

  return { mode, transition, back }
};