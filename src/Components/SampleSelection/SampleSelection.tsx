import React from "react";
import { UserData, GlobalConfig } from "../../types";
import { Sample, SampleTypes, sampleList } from "../../constant/sampleData";
import CardV1 from "../Cards/CardV1";
import { Link } from "react-router-dom";
import CardV2 from "../Cards/CardV2";

type SampleSelectionProps = {
  setConfig: React.Dispatch<React.SetStateAction<GlobalConfig>>;
  config: GlobalConfig;
};

const SampleSelection: React.FC<SampleSelectionProps> = ({
  setConfig,
  config,
}) => {
  const tempData: UserData = {
    name: "NGUYEN VAN A",
    accountNumber: "1234567890123",
  };
  const tempConfig: GlobalConfig = {
    locationId: 0,
    savePath: "",
    sampleType: SampleTypes.NONE,
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setConfig({ ...config, sampleType: Number(event.currentTarget.value) });
  };

  const getCardForSample = (sample: Sample) => {
    switch (sample.type) {
      case SampleTypes.DEFAULT:
        return (
          <CardV1
            data={tempData}
            config={{ ...tempConfig, sampleType: sample.type }}
          />
        );
      case SampleTypes.NEW_YEAR:
        return (
          <CardV2
            data={tempData}
            config={{ ...tempConfig, sampleType: sample.type }}
          />
        );
      default:
        return "CARD NOT AVAILABLE YET!";
    }
  };

  return (
    <>
      <div
        className={`w-2/4 mx-auto border ${
          config.sampleType !== SampleTypes.NONE
            ? "border-green-900"
            : "border-blue-900"
        } rounded-md flex items-center justify-between overflow-hidden m-5 p-3`}
      >
        <div className="text-center font-medium text-gray-900">
          Hãy chọn một trong các mẫu sau
        </div>
        <Link to="/gallery">
          <button
            className={`${
              config.sampleType !== SampleTypes.NONE
                ? "bg-green-700 hover:bg-green-800 cursor-pointer"
                : "bg-red-700 cursor-not-allowed"
            } text-white font-bold py-2 px-4 rounded`}
            disabled={config.sampleType === SampleTypes.NONE}
          >
            Tiếp
          </button>
        </Link>
      </div>

      <div className="grid m-5 lg:grid-cols-3 gap-2 grid-cols-2 grid-rows-2">
        {sampleList.map((sample) => (
          <button
            value={sample.type}
            className={`${
              config.sampleType === sample.type ? "border-emerald-950 " : ""
            } border-2 select-none hover:border-2 hover:border-blue-500 rounded`}
            onClick={handleOnClick}
          >
            <div className="select-none text-lg font-semibold text-center my-2">
              {sample.name}
            </div>
            <div className="flex justify-center m-5">
              {getCardForSample(sample)}
            </div>
          </button>
        ))}
        <button className="border-2 select-none rounded cursor-default">
          <div className="select-none text-lg font-semibold text-center my-2">
            Sẽ còn cập nhật thêm...
          </div>
          <div className="flex justify-center m-5"></div>
        </button>
      </div>
    </>
  );
};

export default SampleSelection;
