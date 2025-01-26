import React from "react";
import LOGO from '../../assets/images/logo.webp';

const Home = () => {
    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
            <img src={LOGO} alt="logo" className="h-9" />
        </div>
    );
};

export default Home;
