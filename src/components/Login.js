import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);  
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const nameValue = name.current ? name.current.value : " "; 
    const message = checkValidData(isSignInForm, nameValue, email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
        // Sign up logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {

          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/69348205?v=4"
          }).then(() => {
            
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(
                addUser(
                    {
                        uid: uid, 
                        email: email, 
                        displayName: displayName,
                        photoURL: photoURL
                    }
                )
            )

            navigate("/browse");
          }).catch((error) => {
            setErrorMessage(error.message);
          });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" +  errorMessage);
          
        });

    } else {
        // Sign In Logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("browse")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  const toggleSignInForm = () => {
     setIsSignInForm(!isSignInForm);
     setErrorMessage(null);     
  }

  return (
    <div>
        <Header/>
        <div className='absolute w-full'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt='movie-banner' className='w-full'/>
        </div>
        <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-70' onSubmit={(e) => e.preventDefault() }>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (
                <input ref={name} type='text' placeholder="Full Name"  className='p-2 mt-2 mb-2 h-12 text-black rounded-lg w-full'/>
            )}
            <input ref={email} type="text" placeholder="Email Address" className="p-2 mt-2 mb-2 h-12 text-black rounded-lg w-full" />
            <input ref={password} type="password" placeholder="Password" className="p-2 my-2 h-12 text-black rounded-lg w-full" />
            <button className='p-4 my-2 mb-8 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

            <p className='text-red-500 font-bold text-lg pb-2'>{errorMessage}</p>

            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
               {isSignInForm ? "New to Streamflix? Sign Up Now" : "Already Registered? Sign In Now"} 
            </p>
        </form>
    </div>
  )
}

export default Login