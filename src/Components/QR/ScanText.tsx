import React from "react";

const ScanText: React.FC = () => {
  return (
    <div
      className="h-6 pt-1"
      style={{
        marginTop: 0,
        background: "rgb(176, 26, 63)",
      }}
    >
      <div
        className="relative text-center"
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: "0.9rem",
        }}
      >
        <div
          className="absolute w-full text-center"
          style={{
            top: -8,
          }}
        >
          Quét Mã QRCODE để chuyển khoản
        </div>
      </div>
    </div>
  );
};

export default ScanText;
