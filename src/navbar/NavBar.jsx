import React, { useContext } from 'react'
import { FaUserPlus , FaUser, FaUserTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Registration/userContext';
import LightLogo from '../images/plan.png'
import Darklogo from '../images/darklogo.png'
import theme from '../Theme/Theme';
import './navbar.css'
import { observer } from 'mobx-react';

const NavBar = observer(() => {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/login')
    }

    const logoSrc = theme.getTheme === 'Dark' ? LightLogo : Darklogo;

  return (
    <nav className='navbar'>
        <div style={theme.getTheme === 'Light' ? darkNav : lightNav} className='nav-inner'>
            <Link to="/" className='brand'>
                <img
                className='brand-logo'
                    src={logoSrc}
                    alt="PlanWise" 
                />
            </Link>

            <div className='nav-links'>
                <Link style={theme.getTheme === 'Light' ? darkBtn : lightBtn} to='/'>Home</Link>
                <Link style={theme.getTheme === 'Light' ? darkBtn : lightBtn} to='/alltasks'>All tasks</Link>
                <button onClick={() => {theme.changeTheme = theme.getTheme}}
                        style= {theme.getTheme === 'Light' ? darkBtn : lightBtn}    
                >
                    {theme.getTheme}
                </button>
            </div>

            <div className='nav-actions'>
            {!user && (
                <>
                    <Link to='/login' aria-label='Login' style={{backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}> 
                        <FaUser color={theme.getTheme === 'Dark' ? 'black' : 'white'}/> 
                    </Link>

                    <Link to='/signup' aria-label='Signup' style={{ backgroundColor: theme.getTheme === 'Dark' ? 'white' : 'black'}}> 
                        <FaUserPlus color={theme.getTheme === 'Dark' ? 'black' : 'white'}/> 
                    </Link>
                </>
            )}

            {user && (
                <>
                    <span className='welcome-text'>Welcome, {user.firstName}</span>
                    <button style={theme.getTheme === "Dark" ? lightBtn : darkBtn} className='log-out' onClick={handleLogout} aria-label="Logout" >
                        <FaUserTimes color='red'/>
                    </button>
                </>
            )}
            </div>
        </div>
    </nav>
  )
})
export default NavBar;

const darkBtn = {
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid white'
}
const lightBtn = {
    backgroundcolor: 'white',
    color: 'black',
    border: '1px solid black'
}
const darkNav = {
    backgroundColor: "black",
}
const lightNav = {
    backgroundColor: 'white'
}

