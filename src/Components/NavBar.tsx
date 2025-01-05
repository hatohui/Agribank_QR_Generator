import React from "react";
import { Link, useLocation } from "react-router-dom";

type ButtonText = {
  to: string;
  label: string;
};

const NavBar: React.FC = () => {
  const pathName = useLocation().pathname;
  const buttons: ButtonText[] = [
    {
      to: "",
      label: "Options",
    },
    {
      to: "samples",
      label: "Samples",
    },
    {
      to: "gallery",
      label: "Gallery",
    },
  ];

  return (
    <div className="bg-gray-800 p-2 text-white text-center flex items-center justify-between">
      <div className="flex items-center ml-3 select-none">
        <img
          src="/photos/AgribankLogo.png"
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        <span className="font-bold">Agribank QR Generator</span>
        <div className="ml-3 font-thin">v1.0</div>
      </div>
      <div>
        {buttons.map(({ to, label }) => (
          <Link key={to} to={`/${to}`}>
            <button
              className={`${
                pathName === `/${to}`
                  ? "border-white border bg-stone-500"
                  : "bg-gray-700 hover:bg-gray-600"
              } text-white font-bold py-2 px-4 rounded m-2 select-none`}
            >
              {label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
