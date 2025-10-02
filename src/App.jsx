// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./Registration/userContext";
import './App.css'

import Login from "./Registration/login";
import Signup from "./Registration/signup"; // make sure path/case matches your file
import AddTask from "./content/AddTask";
import NavBar from "./navbar/NavBar";
import TasksList from "./content/TaskList";
import theme from "./Theme/Theme";
import { observer } from "mobx-react";
import AllTasks from "./content/AllTasks";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUserObj")) || null
  );

  return (
    <div style={{
      backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black',
    }}>
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<TasksList />} />
          <Route path='/alltasks' element={<AllTasks />}/> 
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addTask' element={<AddTask />} />

          <Route path="*" element={<Navigate to='/' replace />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </div>
  );
}
export default observer(App);

const darkBg = {
  backgroundColor: 'black'
}
const whiteBg = {
  backgroundColor: 'white'
}
