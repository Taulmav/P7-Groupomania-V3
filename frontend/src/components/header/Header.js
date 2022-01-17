import React from "react";
import {useEffect} from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';
import icon from '../../imgs/logo/icon.png';


const Header = () => {

    const logout = useAuthStore(state => state.logout)
    const data = useUserStore(state => state.currentUser);
    const fetchCurrentUser = useUserStore(state => state.fetchCurrentUser);
    const token = useAuthStore(state => state.token)

    useEffect(() => {
      if (token) {
        fetchCurrentUser();
        console.log(data);
      }
    },[]);


    const handleClick = () => {
        logout();
        window.location.reload();
    }

    return ( 
        <>
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-no-shrink text-white mr-6">
              <img className="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" src={icon} alt='groupomania'/>
              <span className="font-semibold text-xl tracking-tight">Groupomania</span>
            </div>
            <div className="w-full block flex-grow md:flex md:items-center md:w-auto">
              <div className="text-sm lg:flex-grow">
                <NavLink className="block mt-4 ml-4 md:inline-block md:mt-0 text-teal-lighter hover:text-purple-800" to={`/MyProfile`}>Profile</NavLink>
                <NavLink className="block mt-4 ml-4 md:inline-block md:mt-0 text-teal-lighter hover:text-purple-800" to='/'>Posts</NavLink>
                <NavLink className="block mt-4 ml-4 md:inline-block md:mt-0 text-teal-lighter hover:text-purple-800" to='/create'>Créer un post</NavLink>
                {token && <NavLink className="block mt-4 ml-4 md:inline-block md:mt-0 text-teal-lighter hover:text-purple-800" to='#' onClick={handleClick}>logout</NavLink>}
                {data?.isAdmin ? <NavLink className="block mt-4 ml-4 md:inline-block md:mt-0 text-teal-lighter hover:text-purple-800" to='/AdminBoard'>Admin</NavLink> : ''}
              </div>
            </div>
        </nav>
        </>
     );
}
 
export default Header;