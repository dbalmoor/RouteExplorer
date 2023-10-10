import React, { useState } from "react";
import { ImArrowDown } from "react-icons/im";
import axios from "axios";
import Contact from "../../Contact/Contact";
import "./Part1.css";

const Part1 = () => {
  const [showComponent, setShowComponent] = useState(false);

  const [values, setValues] = useState({
    source: "",
    destination: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const fetchData = (values) => {
    axios
      .post("http://localhost:8081/routes", values)
      .then((res) => {
        if (res.data) {
          const routeHeader = document.getElementById("routeHeading");
          routeHeader.innerHTML = `<p>Bus Routes from ${values.source} to ${values.destination}</p>`;

          const description = document.getElementById("description-display");
          description.innerHTML = `<p>Board any of the Buses mentioned above.<br/> "To Know the timings and details of particular Bus just click on the Bus Number".</p>`;

          const tableDisplay = document.getElementById("table-display");
          const table = document.createElement("table");

          const headerRow = table.insertRow();
          const th1 = document.createElement("th");
          const th2 = document.createElement("th");
          const th3 = document.createElement("th");
          th1.innerHTML = "SOURCE";
          th2.innerHTML = "DESTINATION";
          th3.innerHTML = "BUS NUMBER";
          headerRow.appendChild(th1);
          headerRow.appendChild(th2);
          headerRow.appendChild(th3);

          for (let i = 0; i < res.data.length; i++) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            cell1.innerHTML = values.source;
            cell2.innerHTML = values.destination;
            cell3.innerHTML = res.data[i].bus_route;
          }

          const busNumberCells = table.querySelectorAll("td:nth-child(3)"); // Select all cells in the third column (bus number column)

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
        }
      })
      .catch((err) => alert(err));
  };

  const fetchAllData = () => {
    axios
      .post("http://localhost:8081/allRoutes", values)
      .then((res) => {
        if (res.data) {
          const routeHeader = document.getElementById("routeHeading");
          routeHeader.innerHTML = `<p>All the Locations that are added to the website</p>`;

          const tableDisplay = document.getElementById("table-display");

          const table = document.createElement("table");
          const headerRow = table.insertRow();
          const th = document.createElement("th");
          th.innerHTML = "LOCATIONS";
          headerRow.appendChild(th);
          for (let i = 0; i < res.data.length; i++) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            cell1.innerHTML = res.data[i].stop_name;
          }

          tableDisplay.innerHTML = "";
          tableDisplay.appendChild(table);

          const description = document.getElementById("description-display");
          description.innerHTML = ``;
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
  // const source = document.getElementById("source");
  // const lists = document.getElementById("lists");

  // async function getSourceList() {
  //   try {
  //     const lists = await axios.post("http://localhost:8081/getSourceList");
  //     console.log(lists.data);
  //     const uniqueList = [];
  //     const seen = new Set();
  //     for(const stop in lists){
  //       if(!seen.has(stop.stop_name)){
  //         uniqueList.push(stop);
  //         seen.add(stop.stop_name);
  //       }
  //     }
  //     console.log(uniqueList);
  //   } catch (error) {
  //     // Handle any errors that occur during the request
  //     console.error("Error:", error);
  //     throw error; // Re-throw the error if needed
  //   }
  // }

  // source.addEventListener("click", () => {
  //   // Get all the lists from the database
  //   const lists = await getListsFromDatabase();

  //   // Display the lists in the UI
  //   lists.innerHTML = lists.map((list) => `<li>${list}</li>`).join("");
  // });
  return (
    <div className="h-auto gap-5">
      <div className="text-white font-serif h-auto flex flex-col items-center justify-center gap-10 p-10 bg-gray-800">
        <div className="bg-gray-700 flex flex-col items-center justify-center py-10 h-96 w-2/3 gap-3 rounded-md">
          <div
            className="flex  items-center h-10 justify-center shadow-lg rounded hover:text-lg ease-in-out
              bg-gray-100 text-gray-800  hover:bg-slate-800 transition-all hover:text-white py-2 px-4"
          >
            <button onClick={handleClick} className="font-semibold border-none">
              Know the Bus Locations
            </button>
          </div>

          <div className="flex items-center justify-center">
            <h1 className="font-bold items-center justify-center text-lg w-2/3 text-center">
              To know which Route to take just enter Source and Destination in
              respective fields
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
                  id="source"
                  type="text"
                  placeholder="Enter Source"
                  name="source"
                  onChange={handleInput}
                  // onClick={getSourceList}
                  autoComplete="off"
                  className="bg-transparent text-lg border-[1px] border-gray-400 rounded-md pl-2"
                />
                <div id="sourceLists"></div>
              </div>
              <div className="flex gap-2">
                <label htmlFor="destination" className="font-semibold text-lg">
                  Destination :{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter Destination"
                  name="destination"
                  onChange={handleInput}
                  autoComplete="off"
                  className="bg-transparent text-lg border-[1px] border-gray-400 rounded-md pl-2"
                />
              </div>
              <div
                className="flex  items-center h-10 justify-center shadow-lg rounded hover:text-lg ease-in-out
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
                Scroll down to know the Bus Routes
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

      <div id="contact" className="pt-5">
        <Contact />
      </div>
    </div>
  );
};

export default Part1;
