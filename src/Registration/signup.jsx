import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import theme from '../Theme/Theme';
import { observer } from 'mobx-react';
import countries from '../countries/countries.json'

function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [country, setCountry] = useState('');
    const [birthdate, setBirthdate] = useState('')
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        setError('');

        if(!terms){
            setError("You must agree to our terms and conditions!");
            return;
        }
        if(password !== conPassword){
            setError("Passwords do not match.")
            return;
        }
        if (!birthdate) {
            setError('Please select your birthdate.');
            return;
        }
        if (!country){
            setError('Please select your country.');
            return
        }
            

        const minAge = 12;
        const birth = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        let m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())){
            age--;
        }

        if (age < minAge) {
            setError("You must be at least 12 years old to signup.")
            return;
        }

        const newUser = { firstName, lastName, username, email, password, country, birthdate, tasks: [] };
        let users = JSON.parse(localStorage.getItem("localUsers")) || [];

        const usernameTaken = users.find(u => u.username === username);
        if (usernameTaken){
            setError("Username already exists!")
            return;
        }

        const emailTaken = users.find(u => u.email === email);
        if (emailTaken){
            setError("Email is already registered!");
        }

        users.push(newUser);
        localStorage.setItem("localUsers", JSON.stringify(users));
        alert("Signup successful!");
        navigate("/login")
    }

  return (
    <div 
        style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}
        className='signup-container'
    >
        <div 
            style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white': 'black' }}
            className='box-container'>
            <h2 style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
                Sign up
            </h2>
            <div>
                <input 
                    value={firstName}
                    onChange={({target}) => setFirstName(target.value)}
                    type="text" 
                    placeholder='Enter your first name...'
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                    }}
                />
                <input 
                    value={lastName}
                    onChange={({target}) => setLastName(target.value)}
                    type="text" 
                    placeholder='Enter your last name...'
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                    }}
                />
                <input
                    value={username} 
                    onChange={({target}) => setUserName(target.value)}
                    type="text" 
                    placeholder='Enter your username...'
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                    }}
                />
                <input 
                    value={email}
                    onChange={({target}) => setEmail(target.value)}
                    type="email" 
                    placeholder='Enter your email...'
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                    }}
                />
                <input 
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    type="password" 
                    placeholder='Enter your password'
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                    }}
                />
                <input 
                    value={conPassword}
                    onChange={({target}) => setConPassword(target.value)}
                    type="password" 
                    placeholder='Confirm your password'
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                    }}
                />
                <label style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}} htmlFor="country">Where are you from?</label>
                <select
                    value={country}
                    onChange={({target}) => setCountry(target.value)}
                    name="country"
                    id="country"
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                    }}
                >
                    <option value="" disabled>Choose a country...</option>
                    {countries.map((country) => (
                        <option value={country.name.common} key={country.name.common}>{country.name.common}</option>
                    ))}
                </select>

                <label htmlFor="bd" style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
                    Enter your birthdate
                </label>
                <input 
                    type="date" 
                    name='bd' 
                    id='bd' 
                    value={birthdate}
                    onChange={({target}) => setBirthdate(target.value)} 
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'teal',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'
                    }}   
                />
                <div className='terms-row'>
                    <input 
                        type="checkbox" 
                        name='terms' 
                        id='terms'
                        checked={terms}
                        onChange={({target}) => setTerms(target.checked)}    
                /> 
                <label htmlFor="terms" style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>
                    Agree with our <span style={{color:theme.getTheme === 'Dark' ? 'blue' : 'white'}}>terms</span> & <span style={{color: theme.getTheme === 'Dark' ? 'blue' : 'white'}}>Conditions</span>
                </label>
                </div>
            </div>

            <div className='box-actions'>
                <button 
                    style={{
                        color: theme.getTheme === 'Dark' ? 'black' : 'white',
                        backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black',
                        border: theme.getTheme === 'Dark' ? '1px solid black' : '1px solid white'
                    }}
                    className='btn-primary' onClick={handleSignUp}
                >
                    Sign up
                </button>
                <span style={{ color: theme.getTheme === 'Dark' ? 'black' : 'teal'}}>Already have an account? <Link to='/login' style={{ color: theme.getTheme === 'Dark' ? 'blue' : 'teal'}}>Sign in</Link></span>
            </div>
            <span className='error'>{error}</span>
        </div>
      
    </div>
  )
}
export default observer(Signup);
