import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Registration/userContext'
import TaskDue from './TaskDue'
import theme from '../Theme/Theme'
import './taskList.css'
import DarkTasks from '../images/tasksmainpageDark.png'
import LightTasks from '../images/tasksmainpageLight.png'
import { observer } from 'mobx-react'

function tasksReducer(state, action)
{
    switch (action.type) {
        case "LOAD":
            return Array.isArray(action.tasks) ? action.tasks : [];
        case "TOGGLE":
            return state.map(t => (t.id === action.id ? { ...t, done: !t.done } : t));
        case "DELETE":
            return state.filter(t => t.id !== action.id);
        default:
            return state;
    }
}

function TasksList() {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [hydrated, setHydrated] = useState(false);
    const [tasks, dispatch] = useReducer( tasksReducer, []);

     useEffect(() => {
         if (!user) return;
         const snap = JSON.parse(localStorage.getItem("currentUserObj"));
         const src = snap && snap.username === user.username ? snap.tasks : user.tasks
         dispatch({ type: "LOAD", tasks: src || [] });
         setHydrated(true);
     }, [user?.username])

     useEffect(() => {
         if (!user || !hydrated) return;

         const users = JSON.parse(localStorage.getItem("localUsers")) || [];
         const idx = users.findIndex(u => u.username === user.username);

         const updated = {...users[idx], tasks};
         users[idx] = updated;

         localStorage.setItem('localUsers', JSON.stringify(users));
         localStorage.setItem("currentUserObj", JSON.stringify(users[idx]));
         setUser(updated);
     }, [tasks, user?.username, setUser]);

    const handleToggle = (id) => dispatch({ type: "TOGGLE", id });
    const handleDelete = (id) => dispatch({ type: "DELETE", id });

    const count = tasks.filter(t => !t.done).length;

  return (
    <div className='home-page'>
        { !user && 
            <section className='no-user-page'>
                <h1 style={{color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
                    PlanWise - חוכמת תכנון
                </h1>
                <p style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal', fontSize: '18px'}}>
                    <strong>Take control of your day.</strong>
                    With PlanWise you add tasks in seconds—give them a title,
                    due date, and labels like <span style={{ fontWeight: 'bold'}}>Urgent</span> or <span style={{fontWeight: 'bold'}}>Important</span>
                    —then see everything in a clean, focused view.
                    Less mental clutter, more peace of mind that you’re on top of things.                   
                </p>
                <p style={{color: theme.getTheme === 'Dark' ? 'black' : 'teal', fontSize: '18px'}}>
                    <strong>Start now—no friction.</strong> PlanWise is fast,
                    looks great on mobile and desktop, supports light/dark mode,
                    and keeps your data private by storing it locally in your browser.
                    One tap on Add task, and you’re already moving.
                </p>
                <div className="hero-showcase">
                    <div className="shot-frame">
                        <img className="shot" src={DarkTasks}  alt="Dark theme tasks" />
                    </div>
                    <div className="shot-frame">
                        <img className="shot" src={LightTasks} alt="Light theme tasks" />
                    </div>
                </div>

                
                
            </section>
        }
        { user && 
            <div className='user-page'>
                <h1 style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal' }}>
                    PlanWise - חוכמת תכנון
                </h1>
                
                {tasks.length === 0 ? (
                    <section
                    style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}
                    className='no-task-list-page'>
                        <p style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal', fontSize:'20px' }}>
                            <span style={{fontWeight: 'bold'}}>Hey {user.firstName},</span> nice to have you in our website,
                            lets PlanWise together!!
                        </p>
                        <p style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal', fontSize:'20px' }}>
                            What's you planning for? Lets find out together - 
                            <button 
                                style={{
                                    backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black',
                                    color: theme.getTheme === 'Dark' ? 'black' : 'white',
                                    border: theme.getTheme === 'Dark' ? '1px solid black' : '1px solid white'
                                }}      
                                className='btn-primary' 
                                onClick={() => navigate('/addTask')}>
                                Add task
                            </button>
                        </p>
                    </section>
                ) : (
                    <section 
                    style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}
                    className='task-list-page'>
                        
                            {count === 0 ? <p style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>Great! you have finished all your tasks</p> : <p style={{color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>You still have {count} tasks not finished.</p>}
                        
                        <button
                            style={{
                                backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black',
                                color: theme.getTheme === 'Dark' ? 'black' : 'white',
                                border: theme.getTheme === 'Dark' ? '1px solid black': '1px solid white'
                            }}
                            onClick={() => navigate('/addTask')}
                         >
                            Add task
                        </button>
                        {tasks.map((task) => {
                            return <div
                                style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}
                                key={task.id}
                            >
                                <TaskDue 
                                    task={task}
                                    onToggle={handleToggle}
                                    onDelete={handleDelete}
                                />
                            </div>
                        })}
                    </section>
                )
                }
            </div> 
        }
    </div>
  )
}
export default observer(TasksList);
