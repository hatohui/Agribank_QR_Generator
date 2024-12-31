import React from "react";

const Credits: React.FC<{ address: string }> = ({ address }) => {
  return (
    <>
      <div
        className="h-20 mt-2 relative flex justify-center"
        style={{ background: "rgb(176, 26, 63)" }}
      >
        <div className="w-11/12 h-12 mt-2 bg-white border rounded absolute">
          <div className="flex justify-center items-center h-full">
            <img className="h-11 w-10/12" src="/photos/credits.png"></img>
          </div>
        </div>
        <div
          className="w-11/12 bg-white border rounded absolute"
          style={{
            marginTop: "58px",
          }}
        ></div>
        <div
          className="text-white"
          style={{
            fontSize: "0.8rem",
            marginTop: 60,
          }}
        >
          <div
            className="truncate text-center mx-auto"
            style={{ fontSize: "0.7rem" }}
          >
            {address}
          </div>
        </div>
      </div>
    </>
  );
};

export default Credits;
