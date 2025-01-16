import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Corrected icon imports

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Fixed variable name
    };

    return (
        <div className='flex items-center bg-cyan-600/5 px-5 rounded mb-3'>
            <input 
                value={value}
                onChange={onChange}
                placeholder={placeholder || 'Password'} // Use the placeholder prop
                type={showPassword ? 'text' : 'password'} // Fixed variable name
                className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
            />

            {showPassword ? (
                <FaEye
                    size={22}
                    className='text-primary cursor-pointer'
                    onClick={toggleShowPassword}
                />
            ) : (
                <FaEyeSlash
                    size={22}
                    className='text-primary cursor-pointer'
                    onClick={toggleShowPassword} // Fixed function call
                />
            )}
        </div>
    );
};

export default PasswordInput;