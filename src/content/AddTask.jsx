import React,{useContext, useState} from 'react'
import { Navigate, replace, useNavigate} from 'react-router-dom';
import { UserContext } from '../Registration/userContext';
import { MdDone } from 'react-icons/md';
import './addTask.css'
import theme from '../Theme/Theme';
import { observer } from 'mobx-react';

function AddTask() {
    
    const {user, setUser} = useContext(UserContext)
    if (!user) return <Navigate to="/login" replace />

  const [title, setTitle] = useState("");
  const [dateToFinish, setDateToFinish] = useState('');
  const [desc, setDesc] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [ongoing, setOngoing] = useState(false);
  const [important, setImportant] = useState(false);
  const [msg, setMsg] = useState("");
  const [category, setCategory] = useState("");
  const country = user.country;
  const navigate = useNavigate();

  const handelReset = () => {
    setTitle('');
    setDateToFinish('');
    setDesc('');
    setUrgent(false);
    setOngoing(false);
    setImportant(false);
    setMsg('');
  }

  const handelAdd = () => {
    setMsg("");
    
    if (!title.trim()){
        setMsg("Please enter a task title.")
        return;
    }
    if (!category){
      setMsg("Please choose a category.");
      return;
    }

    const labels = [
        ...(urgent ? ["Urgent"] : []),
        ...(important ? ["Important"] : []),
        ...(ongoing ? ["Ongoing"] : [])
    ];

    const users = JSON.parse(localStorage.getItem("localUsers")) || [];

    const userIndex = users.findIndex(u => u.username === user.username);
    if (userIndex === -1) { setMsg("User not found."); return; }

    const newTask = 
        {
           id: Date.now(),
           title: title.trim(),
           labels,
           date: dateToFinish || "",
           description : desc.trim() || "",
           category: category,
           countryName: country,
           done: false ,
        };
        
    users[userIndex].tasks = Array.isArray(users[userIndex].tasks) ? users[userIndex].tasks : [];
    users[userIndex].tasks = [...users[userIndex].tasks || [], newTask];

    localStorage.setItem("localUsers", JSON.stringify(users));
    localStorage.setItem("currentUserObj", JSON.stringify(users[userIndex]));
    setUser(users[userIndex]);

    alert("Task added!!")
    handelReset();
    navigate('/', {replace: true})
  }

  return (
    <div
        style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}
        className='addtask-wrap'
      >
      <div 
        style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black' }}
        className='addtask-card'
      >
        <h1 style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
          Add new task
        </h1>

        <label htmlFor="title" style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
          Task title
        </label> <br />
        <input
          style={{ 
            color: theme.getTheme === 'Dark' ? 'black' : 'teal',
            backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
          }}
          name='title'
          id='title' 
          value={title}
          onChange={({target}) => setTitle(target.value)}
          type="text" 
          placeholder='Enter title to your task'
        /> <br />

        <label htmlFor="select" style={{color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
          Select your task category
        </label>
        <select 
          name="select" 
          id="select"
          value={category}
          onChange={({target}) => setCategory(target.value)}
          style={{ 
            color: theme.getTheme === 'Dark' ? 'black' : 'teal',
            backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
          }}
        >
          <option value="" disabled>Choose a category...</option>
          <option value="travel" >Travel</option>
          <option value="work" >Work</option>
          <option value="study" >Study</option>
          <option value="daily" >Daily</option>
          <option value="hobbies" >Hobby</option>
          <option value="personal" >Personal</option>
        </select>

        <label htmlFor="desc" style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
          What is this task about?
        </label> <br />
        <textarea 
          value={desc}
          onChange={({target}) => setDesc(target.value)}
          placeholder="Write a few words that describes what's your task about"
          name="desc" 
          id="desc"
          rows={5}
          cols={40}
          style={{backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}} 
        /> <br />

        <fieldset style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}>
          <legend style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>Task labels</legend>

          <input 
              id='urgent'
              name='urgent'
              checked={urgent}
              onChange={({target}) => setUrgent(target.checked)}
              type="checkbox" 
          />
          <label htmlFor="urgent" style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
            Urgent
          </label> <br />


          <input 
              id='important'
              name='important'
              checked={important}
              onChange={({target}) => setImportant(target.checked)}
              type="checkbox" 
          />
          <label htmlFor="important" style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
            Important
          </label> <br />

        
          <input 
              id='ongoing'
              name='ongoing'
              checked={ongoing}
              onChange={({target}) => setOngoing(target.checked)}
              type="checkbox" 
          />
          <label htmlFor="ongoing" style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
            Ongoing
          </label> <br />
        </fieldset>


        <label htmlFor="date" style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
          Pick a last day to your task
        </label>
        <input 
          name='date'
          id='date'
          value={dateToFinish}
          onChange={({target}) => setDateToFinish(target.value)}
          type="date"
          style={{
            backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black',
            color: theme.getTheme === 'Dark' ? 'black' : 'teal'
          }}

        />
        <div className='addtask-actions'>
          <button className='btn-primary' onClick={handelAdd}
          style={{
            backgroundColor: theme.getTheme === 'Dark' ? 'black' : 'teal',
            border: theme.getTheme === 'Dark' ? '1px solid black' : '1px solid white',
            color: theme.getTheme === 'Dark' ? 'white' : 'black'
          }}
          >
            Add
          </button>
          <button onClick={handelReset} 
            style={{ 
              marginLeft: 8,
              color: theme.getTheme === 'Dark' ? 'black' : 'white',
              backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
            }}
            >
            Reset
          </button>
        </div>

        {msg && <div className='addtask-msg'>{msg}</div>}
      </div>
    </div>

  )
}
export default observer(AddTask);
