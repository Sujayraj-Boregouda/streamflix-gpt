import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { Logo } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignout = () => {
      signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
    });
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser(
            {
                uid: uid, 
                email: email, 
                displayName: displayName,
                photoURL: photoURL
            }
          ));
          navigate("/browse");
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
        }
      });

      return () => unsubscribe();
  }, [])

  return (
    <section className='w-full'>
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44" src={Logo} alt='logo'/>

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