import React from "react";
import Card from "../QR/Card";
import { QRUserData } from "../../types";
import { MARGIN } from "../../constant/paperSize";

interface PaperProps {
  datas: QRUserData[];
  indexes: number[];
}

const A4Paper: React.FC<PaperProps> = ({ datas, indexes }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div
        id="paper"
        className="relative w-[210mm] h-[297mm] m-4 bg-white shadow-lg border flex flex-wrap justify-center items-center"
        style={{ gap: `${MARGIN}cm` }}
      >
        {indexes.map((index) => (
          <Card key={index} data={datas[index]} />
        ))}
      </div>
    </div>
  );
};

export default A4Paper;
