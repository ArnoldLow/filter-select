import React, { useState } from "react";
import "./styles/App.css";
import SelectedList from "./components/SelectedList";

// example expected payload -> [{"name":"Currency","value":"GBP"},{"name":"Country","value":"UK"},{"name":"Currency","value":"USD"}]

function App() {
  const availableFilterTypes = ["Currency", "Country", "Sector", "AssetType"];
  const [selected, setSelected] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //submit payload
  function submit() {
    setIsSubmitted(true);
  }

  //update object in array
  const changeInputData = (e) => {
    let updatedList = selected.map((item) => {
      if (item.name === e.target.name) {
        return { ...item, name: e.target.name, value: e.target.value };
      }
      return item;
    });
    setSelected(updatedList);
  };

  //add filter
  const addFilter = (item) => {
    var newItem = { name: item, value: null };
    if (!selected.length) {
      setSelected([newItem]);
    } else if (selected.some((e) => e.name === item)) {
      const updateSelected = selected.filter((e) => e.name !== item);
      setSelected(updateSelected);
    } else {
      setSelected([...selected, newItem]);
    }
  };

  //conditionally renders screen based on button submission state
  return (
    <main className="main-container">
      {isSubmitted ? (
        <div className="payload-container">
          <h1 className="payload-title">Form Submitted!</h1>
          <h3 className="payload-sub-title">
            This is the array object payload that would be sent to the API:
          </h3>
          {selected &&
            selected.map((item, index) => (
              <div key={index}>
                <p className="payload-body">
                  name: {item.name} <br /> value: {item.value}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <div className="filter-container">
          <h1 className="filter-title"> Filter Selector </h1>
          <select
            className="filter-select"
            name="filterType"
            id="filter-select"
            value=""
            onChange={(e) => addFilter(e.target.value)}
          >
            <option value="" disabled>
              Add filter
            </option>
            {availableFilterTypes.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <br />
          {selected && (
            <SelectedList onInputChange={changeInputData} data={selected} />
          )}
          <br />
          <button className="button-submit" onClick={submit}>
            Submit
          </button>
        </div>
      )}
    </main>
  );
}
export default App;
