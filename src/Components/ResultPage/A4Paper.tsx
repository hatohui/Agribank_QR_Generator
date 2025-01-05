import React from "react";
import CardV1 from "../Cards/CardV1";
import { GlobalConfig, UserData } from "../../types";
import { MARGIN } from "../../constant/paperSize";

interface PaperProps {
  datas: UserData[];
  indexes: number[];
  config: GlobalConfig;
}

const A4Paper: React.FC<PaperProps> = ({ datas, indexes, config }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div
        className="A4papers relative w-[210mm] h-[297mm] m-4 bg-white shadow-lg border flex flex-wrap justify-center items-center"
        style={{ gap: `${MARGIN}cm` }}
      >
        {indexes.map((index) => (
          <CardV1 key={index} data={datas[index]} config={config} />
        ))}
      </div>
    </div>
  );
};

export default A4Paper;
