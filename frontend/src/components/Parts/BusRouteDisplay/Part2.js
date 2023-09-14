import React, { useState } from "react";
import { ImArrowDown } from "react-icons/im";
import axios from "axios";
import Contact from "../../Contact/Contact";

const Part2 = () => {
  const [showComponent, setShowComponent] = useState(false);

  const [values, setValues] = useState({
    busRoute: "",
  });
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const fetchData = (values) => {
    const busNumber = values.busRoute;
    axios
      .post("http://localhost:8081/busRoute", { value: busNumber })
      .then((res) => {
        if (res.data) {
          const routeHeader = document.getElementById("routeHeading");
          routeHeader.innerHTML = `<p>DETAILS OF ${busNumber} BUS</p>`;

          const via_routes = JSON.parse(res.data[0].bus_route_via);

          const tableDisplay = document.getElementById("table-display");

          const table = document.createElement("table");
          const headerRow = table.insertRow();
          const th = document.createElement("th");
          th.innerHTML = "STOPS";
          headerRow.appendChild(th);
          for (let i = 0; i < via_routes.length; i++) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            cell1.innerHTML = via_routes[i];
          }
          tableDisplay.innerHTML = "";
          tableDisplay.appendChild(table);

          const description = document.getElementById("description-display");
          description.innerHTML = `<p>Bus "${busNumber}" start at ${
            via_routes[0]
          } ends at ${via_routes[via_routes.length - 1]}</p>`;
        }
      })
      .catch((err) => alert("Error in fetchBusData"));
  };

  const fetchAllData = () => {
    axios
      .post("http://localhost:8081/allNumbers", values)
      .then((res) => {
        if (res.data) {
          console.log(res.data.length);
          const routeHeader = document.getElementById("routeHeading");
          routeHeader.innerHTML = `<p>All the Bus Numbers that are added to the website</p>`;

          const tableDisplay = document.getElementById("table-display");

          const table = document.createElement("table");
          const headerRow = table.insertRow();
          const th = document.createElement("th");
          th.innerHTML = "BUS NUMBERS";
          headerRow.appendChild(th);
          for (let i = 0; i < res.data.length; i++) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            cell1.innerHTML = res.data[i].bus_route;
          }
          const busNumberCells = table.querySelectorAll("td:nth-child(1)"); // Select all cells in the third column (bus number column)

          busNumberCells.forEach((cell) => {
            cell.addEventListener("click", () => {
              const busNumber = cell.textContent.toString();
              axios
                .post("http://localhost:8081/busRoute", { value: busNumber })
                .then((res) => {
                  if (res.data) {
                    const routeHeader = document.getElementById("routeHeading");
                    routeHeader.innerHTML = `<p>DETAILS OF ${busNumber} BUS</p>`;

                    const via_routes = JSON.parse(res.data[0].bus_route_via);

                    const tableDisplay =
                      document.getElementById("table-display");

                    const table = document.createElement("table");
                    const headerRow = table.insertRow();
                    const th = document.createElement("th");
                    th.innerHTML = "STOPS";
                    headerRow.appendChild(th);
                    for (let i = 0; i < via_routes.length; i++) {
                      const row = table.insertRow();
                      const cell1 = row.insertCell();
                      cell1.innerHTML = via_routes[i];
                    }
                    tableDisplay.innerHTML = "";
                    tableDisplay.appendChild(table);

                    const description = document.getElementById(
                      "description-display"
                    );
                    description.innerHTML = `<p>Bus "${busNumber}" start at ${
                      via_routes[0]
                    } ends at ${via_routes[via_routes.length - 1]}</p>`;
                  }
                })
                .catch((err) => alert("Error in fetchBusData"));
            });
          });

          tableDisplay.innerHTML = "";
          tableDisplay.appendChild(table);

          const description = document.getElementById("description-display");
          description.innerHTML = `"To Know the timings and details of particular Bus just click on the Bus Number"`;
        }
      })
      .catch((err) => alert("Enter valid details" + err));
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchAllData();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowComponent(true);
    fetchData(values);
  };
  return (
    <div className="h-auto gap-5">
      <div className="pt-5 gap-5 pb-5 text-white font-serif h-auto flex flex-col items-center justify-center bg-gray-800">
        <div className="bg-gray-700 flex flex-col items-center justify-center h-96 w-2/3 gap-3 rounded-md">
          <div
            className="flex  items-center h-10 justify-center shadow-lg rounded hover:text-lg ease-in-out
                bg-gray-100 text-gray-800  hover:bg-slate-800 transition-all hover:text-white py-2 px-4"
          >
            <button onClick={handleClick} className="font-semibold border-none">
              Know the Bus Numbers
            </button>
          </div>
          <div className="flex items-center justify-center">
            <h1 className="font-bold items-center justify-center text-lg w-2/3 text-center">
              To know the Route of a particular Bus, just enter the BUS ROUTE
              number below
            </h1>
          </div>

          <div className="flex flex-col">
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-5">
                <label htmlFor="source" className="font-semibold text-lg">
                  Source :{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter Bus Number"
                  name="busRoute"
                  onChange={handleInput}
                  autoComplete="current-busRoute"
                  className="bg-transparent text-lg border-[1px] border-gray-400 rounded-md pl-2"
                />
              </div>

              <div
                className="flex items-center h-10 justify-center shadow-lg rounded hover:text-lg ease-in-out
              bg-gray-100 text-gray-800  hover:bg-slate-800 transition-all hover:text-white py-2 px-4"
              >
                <input
                  type="submit"
                  value="Click Here!"
                  className="font-semibold border-none "
                />
              </div>
            </form>
          </div>
          {showComponent && (
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-bold items-center justify-center text-lg text-red-100 text-center">
                Scroll down to know the Bus Route
              </h1>
              <ImArrowDown className="text-red-100 text-2xl items-center justify-center" />
            </div>
          )}
        </div>

        <div className="bg-gray-700 flex flex-col items-center justify-center h-auto pb-4 pt-5 w-2/3 gap-4 rounded-md">
          <div
            className="flex flex-col font-bold items-center justify-center text-red-400 text-2xl w-2/3 text-center"
            id="routeHeading"
          ></div>
          <div
            className="flex flex-col items-center justify-center"
            id="table-display"
          ></div>
          <div
            className="flex flex-col font-bold items-center justify-center text-red-400 text-2xl w-2/3 text-center"
            id="description-display"
          ></div>
        </div>
      </div>

      <div id="contact" className="pt-5 w-auto">
        <Contact />
      </div>
    </div>
  );
};

export default Part2;
