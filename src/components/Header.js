import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignout = () => {
      signOut(auth).then(() => {
        navigate("/");
    }).catch((error) => {
        navigate("/error");
    });
  }


  return (
    <section className='w-full'>
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10  justify-between">
        <img className="w-44" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt='logo'/>

        {user && (
          <div className='flex'>
            <img alt='user-icon' className='w-24 h-24 p-4' src={user?.photoURL}></img>
            <button onClick={handleSignout} className=''>Sign Out</button>
          </div>
        )}
        
      </div>      
    </section>
  )
}

export default Header