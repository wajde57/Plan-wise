import { observer } from 'mobx-react'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import theme from '../Theme/Theme';
import { UserContext } from '../Registration/userContext';
import TaskDue from './TaskDue';
import './allTasks.css'
import { useNavigate } from 'react-router-dom';

function tasksReducer(state, action)
{
    switch(action.type){
        case 'LOAD':
            return Array.isArray(action.tasks) ? action.tasks : [];
        case 'TOGGLE':
            return state.map(t => (t.id === action.id ? {...t, done: !t.done } : t));
        case 'DELETE':
            return state.filter(t => t.id !== action.id);
        default:
            return state;
    }

}

function AllTasks() {

    const {user, setUser} = useContext(UserContext);
    const [hydrated, setHydrated] = useState(false);

    const [searchTitle, setSearchTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState("All");

    const navigate = useNavigate();

    const [tasks, dispatch] = useReducer(tasksReducer, []);

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

    const categories = ["All", ...new Set(tasks.map((task) => task.category))]

    const filteredTasks = tasks.filter((task) => 
        (selectedCategory === "All" || task.category === selectedCategory) &&
        task.category.toLowerCase().includes(searchTitle.toLowerCase())  
    );

  return (
    
    <div className='container'>

        {!user && 
            <div>
                <h1 style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal', }}>
                    Log in and start your journey with us
                </h1>
                <section>
                    <button onClick={() => navigate('/login')}>Log in</button>
                    <button onClick={() => navigate('/signup')} style={{marginLeft:8}}>Sign up</button>
                </section>
            </div>
        }

        {user &&
        <>
            <h1 
            style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}
            className='title'>
                All your tasks
            </h1>
            <input 
                type="text"
                placeholder='Search by title...'
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                style={{
                    backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black',
                    color: theme.getTheme === 'Dark' ? 'black' : 'teal'
                }} 
            />
        <div 
            className='categories'
            style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : "black"}}
        >
            {categories.map((category) => (
                <button 
                    key={category}
                    className={`button ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category || "Uncategorized"}
                </button>
            ))}
        </div>

        <div className='task'>
            {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                    <div key={task.id}>
                        <TaskDue 
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    </div>
                ))
            ): (
                <p>No tasks found</p>
            )}
        </div>
        </>
        }

    </div>
  )
}

export default observer(AllTasks);
