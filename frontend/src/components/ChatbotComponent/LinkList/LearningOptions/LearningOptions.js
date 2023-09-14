import React from "react";

import "./LearningOptions.css";

const LearningOptions = (props) => {
  const options = [
    { text: "Bus Numbers", handler: () => {
      props.actionProvider.handleBusNumbers();
    }, id: 1 },
    { text: "Bus Routes", handler: () => {
      props.actionProvider.handleBusRoutes();
    }, id: 2 },
    { text: "Contact", handler: () => {}, id: 3 },
    { text: "Login", handler: () => {
      props.actionProvider.handleLogin();
    }, id: 4 },
    { text: "Signup", handler: () => {
      props.actionProvider.handleSignUp();
    }, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{optionsMarkup}</div>;
};

export default LearningOptions;