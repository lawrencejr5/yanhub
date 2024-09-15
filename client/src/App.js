import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="register/avatar" element={<SelectAvatar />}></Route>
          <Route path="videos" element={<Videos />}></Route>
          <Route path="videos/:id" element={<Video />}></Route>
          <Route path="tasks" element={<Tasks />}></Route>
          <Route path="tasks/personal" element={<TasksPersonal />}></Route>
          <Route path="video/assign/:id" element={<AssignTask />}></Route>
          <Route path="video/tasks/:id" element={<ShowTasks />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="user/:id" element={<User />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
