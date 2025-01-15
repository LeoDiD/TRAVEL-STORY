import React from 'react';
import { FaRegeye, FaRegeyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, placeholder }) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!showPassword);
    };
  return (
    <div  className='flex items-center bg-cyan-600/5 px-5 rounded mb-3'>
        <input 
        value={value}
        onChange={onChange}
        placeholder={'placeholder' || 'Password'}
        type={isshowPassword ? 'text' : 'password'}
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
        />

        {isShowPassword ? <FaRegeye
            size={22}
            className='text-primary cursor-pointer'
            onClick={toggleShowPassword}
            />: <FaRegeyeSlash
            size={22}
            className='text-primary cursor-pointer'
            onClick={() => oggleShowPassword()}
            />}

    </div>
  );
};

export default PasswordInput;