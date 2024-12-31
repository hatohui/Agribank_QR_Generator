import React from "react";

const QRHeader: React.FC = () => {
  return (
    <>
      <div className="h-3"></div>
      <div
        className="flex items-center justify-center pt-4"
        style={{ background: "rgb(176, 26, 63)" }}
      >
        <img
          style={{ maxHeight: 25 }}
          src="/photos/logo-agribank-dongphucvina.vn2_.png"
          alt=""
        />
      </div>
    </>
  );
};

export default QRHeader;
