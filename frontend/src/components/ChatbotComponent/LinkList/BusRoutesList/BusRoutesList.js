import React from "react";

import "./BusRoutesList.css";

const BusRoutesList = (props) => {
  const busRouteOptions = [
    { text: "Fetching the Bus Routes", handler: () => {
      props.actionProvider.handleFetchRoutes();
    }, id: 1 },
    { text: "Finding the Bus Routes", handler: () => {
      props.actionProvider.handleFindRoutes();
    }, id: 2 },
  ];

  const optionsMarkup = busRouteOptions.map((option) => (
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

export default BusRoutesList;