import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Register from "./pages/Register";
import SelectAvatar from "./pages/SelectAvatar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound";
import Tasks from "./pages/Tasks";
import TasksPersonal from "./pages/TasksPersonal";
import AssignTask from "./pages/AssignTask";
import Users from "./pages/Users";
import User from "./pages/User";
import Account from "./pages/Account";
import Videos from "./pages/Videos";
import Video from "./pages/Video";
import ShowTasks from "./pages/ShowTasks";

import Protected from "./components/Route/Protected";
import Private from "./components/Route/Private";

import { useGlobalContext } from "./Context";

import ScrollTop from "./components/ScrollTop";

const App = () => {
  const { theme, setTheme } = useGlobalContext();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="register/avatar" element={<SelectAvatar />}></Route>
          <Route
            exact
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          ></Route>
          <Route
            path="videos"
            element={
              <Protected>
                <Videos />
              </Protected>
            }
          ></Route>
          <Route
            path="videos/:id"
            element={
              <Protected>
                <Video />
              </Protected>
            }
          ></Route>
          <Route
            path="tasks"
            element={
              <Protected>
                <Tasks />
              </Protected>
            }
          ></Route>
          <Route
            path="tasks/personal"
            element={
              <Protected>
                <TasksPersonal />
              </Protected>
            }
          ></Route>
          <Route
            path="video/assign/:id"
            element={
              <Private>
                <AssignTask />
              </Private>
            }
          ></Route>
          <Route
            path="video/tasks/:id"
            element={
              <Protected>
                <ShowTasks />
              </Protected>
            }
          ></Route>
          <Route
            path="users"
            element={
              <Protected>
                <Users />
              </Protected>
            }
          ></Route>
          <Route
            path="user/:id"
            element={
              <Protected>
                <User />
              </Protected>
            }
          ></Route>
          <Route
            path="account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          ></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
