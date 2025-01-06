import React from "react";
import { GlobalConfig, UserData } from "../../types";
import { MARGIN } from "../../constant/paperSize";
import { getCard } from "../../CardModels";

interface PaperProps {
  datas: UserData[];
  indexes: number[];
  config: GlobalConfig;
}

const A4Paper: React.FC<PaperProps> = ({ datas, indexes, config }) => {
  console.log(config);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div
        className="A4papers relative w-[210mm] h-[297mm] m-4 bg-white shadow-lg border flex flex-wrap justify-center items-center"
        style={{ gap: `${MARGIN}cm` }}
      >
        {indexes.map((index, i) => getCard(config, datas[index], i))}
      </div>
    </div>
  );
};

export default A4Paper;
