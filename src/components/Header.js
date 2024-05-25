import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

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

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))  
  }

  return (
    <section className='w-full'>
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row sm:justify-center md:justify-between">
        <img className="w-44 mx-auto md:mx-0" src={LOGO} alt='logo'/>
        
        {user && (
          <div className='flex justify-between'>
          
            {showGptSearch && (
              <select className='h-16 p-4 mt-4 mr-4 bg-gray-900 text-white rounded-lg' onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                ))}
              </select>
            )}

            <button className="h-16 mt-4 px-6 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" : "GPT Search"}</button>

            <img alt='user-icon' className='hidden md:block w-24 h-24 p-4' src={user?.photoURL}></img>
            <button onClick={handleSignout} className='text-white'>Sign Out</button>
          </div>
        )}
        
      </div>      
    </section>
  )
}

export default Header