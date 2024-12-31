import React from "react";
import { QRProps } from "./Card";

const NameTag: React.FC<QRProps> = ({ data }) => {
  const nameToShow = data.name.toUpperCase().trim();
  const accountToShow = `${data.accountNumber.substring(
    0,
    4
  )} ${data.accountNumber.substring(4, 7)} ${data.accountNumber.substring(
    7,
    10
  )} ${data.accountNumber.substring(10, 13)}`;

  return (
    <div className="flex relative justify-center items-center mt-2 text-center text-green-900">
      <div
        className="border rounded-md h-20 w-11/12 overflow-hidden"
        style={{
          borderColor: "rgb(176, 26, 63)",
        }}
      >
        <div
          style={{
            fontSize: "1.1rem",
            marginBottom: "-0.25rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {nameToShow}
        </div>
        <div
          style={{
            fontSize: "1.25rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: 2,
          }}
        >
          <strong>{accountToShow}</strong>
        </div>
        <div
          style={{
            fontSize: "0.5rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: 7,
          }}
        >
          {data.location.branch}
        </div>
      </div>
    </div>
  );
};

export default NameTag;
