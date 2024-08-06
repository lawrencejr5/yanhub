import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound";
import Tasks from "./pages/Tasks";
import TasksPersonal from "./pages/TasksPersonal";
import Task from "./pages/Task";
import Users from "./pages/Users";
import User from "./pages/User";
import Account from "./pages/Account";
import MyTasks from "./pages/MyTasks";
import Videos from "./pages/Videos";
import Video from "./pages/Video";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="videos" element={<Videos />}></Route>
          <Route path="videos/:name" element={<Video />}></Route>
          <Route path="tasks" element={<Tasks />}></Route>
          <Route path="tasks/personal" element={<TasksPersonal />}></Route>
          <Route path="task/:id" element={<Task />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="user/:username" element={<User />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="my-tasks" element={<MyTasks />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
