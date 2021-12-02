import React from "react";
import {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';

const Nav = () => {

    const logout = useAuthStore(state => state.logout)

    const handleClick = () => {
        logout()
    }

    return (  
        <>
        <div className="nav">
            <ul className="nav__ul">
                <NavLink to='/profile'>
                    <li className="nav__li">
                        Profile
                    </li>
                </NavLink>
                <NavLink to='/posts'>
                    <li className="nav__li">
                        Posts
                    </li>
                </NavLink>
                <NavLink to='/create'>
                    <li className="nav__li">
                        Créer un post
                    </li>
                </NavLink>
                <li className="nav__li" onClick={handleClick}>
                    Logout
                </li>
            </ul>
        </div>
        </>
    );
}
 
export default Nav;