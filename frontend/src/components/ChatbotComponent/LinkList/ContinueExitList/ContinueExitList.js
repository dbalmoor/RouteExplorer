import React from "react";

import "./ContinueExitList.css";

const ContinueExitList = (props) => {
  const continueExitOptions = [
    { text: "Continue", handler: () => {
      props.actionProvider.handleContinue();
    }, id: 1 },
    { text: "Exit", handler: () => {
      props.actionProvider.handleExit();
    }, id: 2 },
  ];

  const optionsMarkup = continueExitOptions.map((option) => (
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

export default ContinueExitList;