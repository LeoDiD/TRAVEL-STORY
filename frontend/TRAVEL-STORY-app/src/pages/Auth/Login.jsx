import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Handle login logic here
  };

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
        <div className='w-2/4 h-[90vh] flex items-end bg-login-img bg-cover bg-center rounded-lg p-10 z-50'>
          <div>
            <h4 className=''>
              Capture Your <br /> Journeys
            </h4>
            <p className='text-[15px] text-white leading-6 pr-7 mt-4'>
              Record your travel experiences and memories in your personal
              travel journal.
            </p>
          </div>

          <div className='w-2/4 h-[75h] bg-white rounded-r-lg p-16 shadow-lg shadow-cyan-200/20'>
            <form onSubmit={handleSubmit}> {/* Corrected onSubmit */}
              <h4 className='text-2xl font-semibold mb-7'>Login</h4>

              <input type='text' placeholder='Email' className='input-box' />

              <button type='submit' className=''>
                LOGIN {/* Changed button text to "LOGIN" */}
              </button>

              <p className='text-xs text-slate-500 text-center my-4'>Or</p>

              <button
                type='button' // Changed to type="button"
                className=''
                onClick={() => {
                  navigate("/signup"); // Redirect to the SignUp page
                }}
              >
                CREATE ACCOUNT
              </button>
            </form> {/* Properly closed form tag */}
          </div>
        </div>
      </div>
    </div>
  );
  console.log("Login component loadeded");
};

export default Login;