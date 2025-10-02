import React, { useContext, useState, useEffect } from 'react'
import {UserContext} from './userContext'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import theme from '../Theme/Theme';
import { observer } from 'mobx-react';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
        
        const finalUser = localUsers.find(
            (u) => u.username === username && u.password === password
        );
        if (finalUser){
            setUser(finalUser);
            alert("sign in successfully!");
            navigate('/');
        }

        const userExists = localUsers.find(
            (u) => u.username === username
        );

        if (userExists){
            setWrongPassAttempts(prev => prev + 1);
            setErrorMessage("Incorrect password")
        } else {
            setWrongUserAttempts(prev => prev + 1);
            setErrorMessage("Incorrect username")
        }
    };
    
  return (
    <div
     style={{ 
        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
     }}
     className='login-container'>
        <div 
        style={{ 
            backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
        }}
        className='login-box'>
            <h2 style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>Log in</h2>
            <div>
                <input
                  value={username}
                  onChange={({target}) => setUsername(target.value)}
                  placeholder='Enter username'
                  type="text"
                  style={{ 
                    color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                    backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                }} 
                />
                <input
                  value={password}
                  onChange={({target}) => setPassword(target.value)}
                  placeholder='Enter password'
                  type="password" 
                  style={{ 
                    color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                    backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                }}
                />
            </div>
            <div>
                <button 
                style={{
                    backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black',
                    border: theme.getTheme === 'Dark' ? '1px solid black' : '1px solid white',
                    color: theme.getTheme === 'Dark' ? 'black' : 'white'
                }}
                className='btn-primary' onClick={handleLogin}>
                    Login
                </button>
                <span style={{color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>Don't have an account? <Link to='/signup' style={{color: theme.getTheme === 'Dark' ? 'blue' : 'teal'}}>Register</Link></span>
            </div>
            <span className='error'>{errorMessage}</span>         
        </div>
    </div>
  )
}
export default observer(Login);

