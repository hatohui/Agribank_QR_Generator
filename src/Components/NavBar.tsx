import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <div className="bg-gray-800 p-2 text-white text-center flex items-center justify-between">
      <div className="flex items-center ml-3">
        <img
          src="/photos/AgribankLogo.png"
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        <span className="font-bold">Agribank QR Generator</span>
      </div>
      <div>
        <Link to="/">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2">
            Options
          </button>
        </Link>
        <Link to="/samples">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2">
            Sample
          </button>
        </Link>
        <Link to="/gallery">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2">
            Result
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
