import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex justify-center relative">
      <div
        className="absolute w-full border"
        style={{
          borderWidth: 20,
          height: 310.15,
          borderColor: "rgb(176, 26, 63)",
        }}
      ></div>
      <div
        className="z-10 h-5 bg-white w-3/6 absolute text-center"
        style={{ top: 32 }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            color: "rgb(172, 27, 60)",
            fontWeight: "bold",
          }}
        >
          AGRI
        </span>
        <span
          style={{
            fontFamily: "Times New Roman, serif",
            color: "rgb(172, 27, 60)",
            fontWeight: "bold",
          }}
        >
          BANK
        </span>{" "}
        <span
          style={{
            fontFamily: "Times New Roman, serif",
            fontWeight: "bold",
          }}
        >
          QR
        </span>
      </div>
      <div
        className="absolute w-full border-white rounded-lg"
        style={{
          marginTop: 16,
          borderWidth: 20,
          height: 277.15,
          width: "calc(100% - 38px)",
        }}
      ></div>
      <div
        className="h-5 bg-white w-3/6 absolute"
        style={{
          top: 245,
        }}
      ></div>
      <div
        className="bg-white w-4 absolute"
        style={{
          height: 149.57,
          right: 250,
          top: 75,
        }}
      ></div>
      <div
        className="bg-white w-4 absolute"
        style={{
          height: 149.57,
          left: 250,
          top: 75,
        }}
      ></div>
      <div
        className="absolute flex justify-center z-30"
        style={{
          top: 255,
        }}
      >
        <img className="h-10" src="/photos/download.png" alt="" />
      </div>
    </div>
  );
};

export default Logo;
