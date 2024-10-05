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

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/searchDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const Item = mongoose.model("Item", itemSchema);

// Middleware to parse JSON
app.use(express.json());

// Search route
app.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Item.find({ name: new RegExp(query, "i") });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//protected routes
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const App = () => (
  <Router>
    <Route path="/login" component={Login} />
    <PrivateRoute path="/protected" component={ProtectedComponent} />
  </Router>
);

export default App;

//1
// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

//2
const authorizeRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, "your_jwt_secret", (err, user) => {
      if (err) return res.sendStatus(403);
      if (!roles.includes(user.role)) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
};

// Example of a protected route
app.get("/admin", authenticateToken, authorizeRole(["admin"]), (req, res) => {
  res.send("This is an admin route");
});

//3
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/dashboard", {
          headers: { Authorization: token },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Welcome, {data.username}</h1>
          {/* Render user-specific content */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// export default Dashboard;

//5
const Dashbodard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/dashboard", {
          headers: { Authorization: token },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Welcome, {data.username}</h1>
          {data.role === "admin" && <AdminContent />}
          {data.role === "user" && <UserContent />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const AdminContent = () => <div>Admin-specific content</div>;
const UserContent = () => <div>User-specific content</div>;

//1
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboardd = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/dashboard", {
          headers: { Authorization: token },
        });
        setData(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error("Error fetching data", error);
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      {data ? (
        <div>
          <h1>Welcome, {data.username}</h1>
          {/* Render user-specific content */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// export default Dashboard;

//2
import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtecteRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem("token");
      if (!token) {
        return <Navigate to="/login" />;
      }

      try {
        // Optionally, you can decode and verify the token here
        // const decoded = jwt.decode(token);
        // if (decoded.exp < Date.now() / 1000) {
        //   localStorage.removeItem('token');
        //   return <Navigate to="/login" />;
        // }

        return <Component {...props} />;
      } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
      }
    }}
  />
);

// export default ProtectedRoute;

//3
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
// import ProtectedRoute from './ProtectedRoute';

const Appp = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <ProtectedRoute path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

// export default App;

//Token expire

import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem("token");
      if (!token) {
        return <Navigate to="/login" />;
      }

      try {
        // Optionally, you can decode and verify the token here
        // const decoded = jwt.decode(token);
        // if (decoded.exp < Date.now() / 1000) {
        //   localStorage.removeItem('token');
        //   return <Navigate to="/login" />;
        // }

        return <Component {...props} />;
      } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
      }
    }}
  />
);

// export default ProtectedRoute;

import React from "react";
import { useJwt } from "react-jwt";

const Appi = () => {
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  return (
    <div>
      <h1>Decode JWT Example</h1>
      <p>Decoded Token: {JSON.stringify(decodedToken)}</p>
      <p>Token Expired: {isExpired ? "Yes" : "No"}</p>
    </div>
  );
};

// export default App;
