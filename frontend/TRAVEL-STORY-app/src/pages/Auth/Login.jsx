import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import PasswordInput from '../../components/Input/PasswordInput';

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Handle login logic here
  };

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='container h-screen flex items-center justify-center px-10 mx-auto'>
        <div className='w-1/2 h-[80vh] flex items-end bg-login-img bg-cover bg-center rounded-lg p-10 z-50'>
          <div className='flex-1'>
            <h4 className='text-5xl text-white font-semibold leading-[58px]'>
              Capture Your <br /> Journeys
            </h4>
            <p className='text-[15px] text-white leading-6 pr-7 mt-4'>
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>

          /* Adjusted the width and added margin to the login form */
          <div className='w-2/4 h-[75vh] bg-white rounded-r-lg p-16 shadow-lg shadow-cyan-200/20'>
            <form onSubmit={handleSubmit}>
              <h4 className='text-2xl font-semibold mb-7'>Login</h4>

              <input type='text' placeholder='Email' className='input-box mb-4' />

              <PasswordInput />

              <button type='submit' className='btn-primary'>
                LOGIN
              </button>

              <p className='text-xs text-slate-500 text-center my-4'>Or</p>

              <button
                type='button'
                className='btn-primary btn-light'
                onClick={() => {
                  navigate("/signup");
                }}
              >
                CREATE ACCOUNT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;