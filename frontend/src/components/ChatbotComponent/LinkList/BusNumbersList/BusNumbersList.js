import React from "react";

import "./BusNumbersList.css";

const BusNumbersList = (props) => {
  const busNumbersOptions = [
    { text: "Fetching the Routes of Numbers", handler: () => {
      props.actionProvider.handleFetchNumbers();
    }, id: 1 },
    { text: "Finding the Routes of Numbers", handler: () => {
      props.actionProvider.handleFetchRoutes();
    }, id: 2 },
  ];

  const optionsMarkup = busNumbersOptions.map((option) => (
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

export default BusNumbersList;