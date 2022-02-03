import React from "react";

//handle event changes from form fields
const SelectedList = ({ onInputChange, data }) => {
  const inputChange = (e) => {
    onInputChange(e);
  };

  return (
    <div>
      {data &&
        data.map((item, index) => (
          <div key={index}>
            <br />
            <form className="input-container">
              <label>
                {item.name}:
                <input
                  type="text"
                  name={item.name}
                  value={item.value}
                  onChange={inputChange}
                />
              </label>
            </form>
          </div>
        ))}
    </div>
  );
};

export default SelectedList;
