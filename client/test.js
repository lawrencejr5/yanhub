const convert = async (wallet, curr, amount) => {
  try {
    const res = await fetch(
      `https://api.coinconvert.net/convert/${curr}/${wallet}?amount=${amount}`
    );
    const data = await res.json();
    const test = Object.values(data);
    const val = test[2];
    if (!val) {
      return amount;
    }
    return val;
  } catch (error) {
    console.log(error);
  }
};

import React, { useState } from "react";

function CheckboxComponent() {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      // Add the value to the array
      setCheckedItems([...checkedItems, value]);
    } else {
      // Remove the value from the array
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }
  };

  return (
    <div>
      <input type="checkbox" value="item1" onChange={handleCheckboxChange} />
      <label>Item 1</label>

      <input type="checkbox" value="item2" onChange={handleCheckboxChange} />
      <label>Item 2</label>

      <input type="checkbox" value="item3" onChange={handleCheckboxChange} />
      <label>Item 3</label>

      <div>
        <h3>Checked Items:</h3>
        <ul>
          {checkedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// export default CheckboxComponent;

import React, { useState } from "react";

const CheckboxList = () => {
  // Initialize state with an array of booleans representing the checked status of each checkbox
  const [checkedItems, setCheckedItems] = useState([false, false, false]);

  // Function to handle the event that unchecks all checkboxes
  const uncheckAll = () => {
    setCheckedItems(checkedItems.map(() => false));
  };

  // Function to handle individual checkbox changes
  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div>
      {checkedItems.map((isChecked, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange(index)}
          />
          Checkbox {index + 1}
        </div>
      ))}
      <button onClick={uncheckAll}>Uncheck All</button>
    </div>
  );
};

// export default CheckboxList;
