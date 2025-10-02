import React, { useEffect, useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { MdDoneOutline } from 'react-icons/md';
import { FaRegMinusSquare } from 'react-icons/fa';
import './taskdue.css'
import theme from '../Theme/Theme';
import { observer } from 'mobx-react';

function TaskDue({ task, onToggle, onDelete }) {

    const URL = `http://api.weatherapi.com/v1/current.json?key=a46aa1df182e4e059a384346250210&q=${task.countryName}&aqi=no`

    const [temp, setTemp] = useState(0);
    const [icon, setIcon] = useState("");

    useEffect(() => {
        const fetchData = async () => {
           try {
            const result = await fetch(URL);

            if (!result.ok){
                if (result.status >= 400 && result.status < 500)
                    throw new Error("Client error " + result.status);
                else if (result.status >= 500 && result.status < 600)
                    throw new Error("Server error " + result.status);
                else 
                    throw new Error("General error");
            }
            let jsonArr = await result.json();
            setTemp(jsonArr.current.temp_c)
            setIcon(jsonArr.current.condition.icon);        
        }
           catch (error){
                console.error("Fetched never called " + error.message);
           }    
        }
        fetchData();
    })

  return (
    <div 
        className='task-card'
        style={{ 
            backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black',
            border: theme.getTheme === 'Dark' ? '0.5px solid black' : '0.5px solid white'
        }}
    >
        <button
            onClick={() => onToggle?.(task.id)} 
            style={{ 
                cursor: "pointer", 
            }}
        >
            {task.done ? <MdDoneOutline 
            color= {theme.getTheme === 'Dark' ? 'green' : 'white'} 
            size={22}
            /> : <FaRegCircle 
            color={theme.getTheme === 'Dark' ? 'black' : 'white'}
            size={22}
            />}
        </button>

        <h1 style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>{task.title}</h1>

        <div>
            {task.labels?.map((label, i) => (
                <small 
                    key={i} style={{ 
                        marginRight: 6,
                        backgroundColor: label === 'Urgent' ? 'red': '' || label === 'Important' ? 'yellow' : '' || label === 'Ongoing' ? 'blue' : 'white'   
                    }}
                    >
                    {label}
                </small>
            ))}
            {task.date && <small style={{ marginLeft: 8 }}>{task.date}</small>}
            {task.category && <small style={{ marginLeft: 8 }}>{task.category}</small>}
            {task.countryName && <small style={{marginLeft: 8}}>{task.countryName}</small>}

            <img src={icon} alt={temp} width={35} height={35}/>

        </div>

        <div>
            <button 
                style={{backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}
                onClick={() => onDelete?.(task.id)}>
                 <FaRegMinusSquare color={theme.getTheme === 'Dark' ? 'black' : 'white'} /> 
            </button>
        </div>
        
    </div>
  )
}
export default observer(TaskDue);
