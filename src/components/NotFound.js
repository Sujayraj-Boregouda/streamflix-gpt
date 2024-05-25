// src/NotFound.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className='bg-black h-screen w-full text-white mx-auto text-center pt-[20%]'>
      <h1 className='mt-4 text-4xl pb-4'>404 - Page Not Found</h1>
      <div>
      <p className='text-1xl'>Sorry, the page you are looking for does not exist. Redirecting to Browse page...</p>
      </div>
    </div>
  );
};

export default NotFound;
