import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import  axiosInstance  from '../../utils/axiosInstance'; 

const SignUp = () => {
  const [name, setName] = React.useState(''); 
  const [email, setEmail] = React.useState(''); 
  const [password, setPassword] = React.useState(''); 
  const [error, setError] = React.useState(null); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    setError("");
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='login-ui-box right-10 -top-40' />
      <div className='login-ui-box bg-cyan-200 -bottom-40 right-1/2' />

      <div className='container h-screen flex items-center justify-center px-10 mx-auto'>
        <div className='w-1/2 h-[80vh] flex items-end bg-signup-img bg-cover bg-center rounded-lg p-10 z-50'>
          <div className='flex-1'>
            <h4 className='text-5xl text-white font-semibold leading-[58px]'>
              Capture Your <br /> Journeys
            </h4>
            <p className='text-[15px] text-white leading-6 pr-7 mt-4'>
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>

          <div className='w-2/4 h-[75vh] bg-white rounded-r-lg p-16 shadow-lg shadow-cyan-200/20'>
            <form onSubmit={handleLogin}>
              <h4 className='text-2xl font-semibold mb-7'>Sign Up</h4>

              <input 
                type='text' 
                placeholder='Full Name' 
                className='input-box mb-4' 
                value={name}
                onChange={(e) => setName(e.target.value)} // Removed the semicolon
              />

              <input 
                type='text' 
                placeholder='Email' 
                className='input-box mb-4' 
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Removed the semicolon
              />

              <PasswordInput 
                value={password} // Use password state here
                onChange={(e) => setPassword(e.target.value)} // Removed the semicolon
              />

              {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}

              <button type='submit' className='btn-primary'>
                CREATE ACCOUNT
              </button>

              <p className='text-xs text-slate-500 text-center my-4'>Or</p>

              <button
                type='button'
                className='btn-primary btn-light'
                onClick={() => {
                  navigate("/login");
                }}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;