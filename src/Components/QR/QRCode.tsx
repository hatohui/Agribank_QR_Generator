import React from "react";

interface QRCodeProps {
  srcImage: string;
}

const QRCode: React.FC<QRCodeProps> = ({ srcImage }) => {
  return (
    <>
      <div
        className="rounded-2xl p-5 m-10"
        style={{ borderColor: "rgb(176, 26, 63)", borderWidth: "7px" }}
      >
        <div
          className="border-2 rounded-sm"
          style={{ borderColor: "rgb(176, 26, 63)", height: 167.95 }}
        >
          <img className="p-2" src={srcImage} alt="QRCode" />
        </div>
      </div>
    </>
  );
};

export default QRCode;
