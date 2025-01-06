import { FormEvent, useEffect, useState } from "react";
import { GlobalConfig, UserData } from "../../types";
import { locations } from "../../constant/locationData";
import { Link } from "react-router-dom";
import DataBoard from "./DataBoard";
import { parseExcelToUserData } from "../../Helper/parseExcelToJson";
import HowToUse from "../HowToUse";

interface OptionsProps {
  config: GlobalConfig;
  setConfig: React.Dispatch<React.SetStateAction<GlobalConfig>>;
  setData: React.Dispatch<React.SetStateAction<UserData[]>>;
  setFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  file: string | undefined;
  data: UserData[];
}

const Options: React.FC<OptionsProps> = ({
  config,
  setConfig,
  setData,
  setFile,
  file,
  data,
}) => {
  const [location, setLocation] = useState<number | undefined>(
    config.locationId
  );
  const [folderPath, setFolderPath] = useState<string>(config.savePath);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [canContinue, setCanContinue] = useState<boolean>(false);

  useEffect(() => {
    if (
      data.length &&
      (config.locationId || config.locationId === 0) &&
      config.savePath
    ) {
      setCanContinue(true);
    } else setCanContinue(false);
  }, [config, data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!folderPath) {
      setError("No folder selected. Please select a folder");
      return;
    }

    if (!location && location !== 0) {
      setError("Please fill up all fields");
      return;
    }

    const newConfig: GlobalConfig = {
      savePath: folderPath,
      locationId: location,
      sampleType: config.sampleType,
    };

    setConfig(newConfig);
    setSuccess("Data saved successfuly, please proceed");
  };

  const setSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const setError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const handleSetDir = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedPath = await window.ipcRenderer.selectDirectory();
    if (!selectedPath) return;
    setFolderPath(selectedPath);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setError("No file selected. Please select a file.");
      return;
    }
    const file = e.target.files[0];
    try {
      const fileType = file.type;
      if (
        fileType !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        fileType !== "application/vnd.ms-excel"
      ) {
        setError("Invalid file type. Please select an Excel file.");
        return;
      }
      const userData = await parseExcelToUserData(file);
      setFile(file.name);
      setData(userData);
    } catch (error) {
      setError(String(error));
    }
  };
  return (
    <>
      <HowToUse />
      <form
        className="w-2/4 mx-auto border border-blue-900 rounded-md overflow-hidden m-5"
        onSubmit={handleSubmit}
      >
        <div className="px-5 mt-5">
          <label
            className="block mb-2 m-3 text-sm font-medium text-gray-900"
            htmlFor="location"
          >
            Chọn chi nhánh
          </label>
          <select
            id="sizes"
            required
            className="bg-white border m-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            style={{ width: "calc(100% - 2rem)" }}
            value={location}
            onChange={(e) => setLocation(Number(e.target.value))}
          >
            <option value="">select location...</option>
            {locations.map((location, i) => (
              <option key={i} value={location.id}>
                {location.branch}
              </option>
            ))}
          </select>
        </div>
        <div className="px-5">
          <label
            className="block mb-2 m-3 text-sm font-medium text-gray-900"
            htmlFor="location"
          >
            Chọn địa chỉ lưu hình
          </label>
          <div className="flex m-4 gap-3 items-center h-10">
            <button
              className="block mb-2 px-4 border-gray-400 border p-1 rounded hover:bg-slate-300"
              onClick={handleSetDir}
            >
              Chọn
            </button>
            <div className="truncate mb-2">
              {folderPath ? `${folderPath}` : "No directory selected"}
            </div>
          </div>
        </div>
        <div className="px-5">
          {errorMessage && (
            <div className="text-red-600 text-center">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-center">{successMessage}</div>
          )}
        </div>
        <div className="flex justify-center mt-4 gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
          >
            Lưu
          </button>
          {canContinue && (
            <Link
              to="/samples"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mb-3"
            >
              Tiếp
            </Link>
          )}
        </div>
      </form>
      <div className="w-2/4 mx-auto border border-blue-900 rounded-md overflow-hidden m-5">
        <div className="px-5 mt-5">
          <label
            className="block mb-2 m-3 text-sm font-medium text-gray-900"
            htmlFor="location"
          >
            Chọn file excel để đọc
          </label>

          {file ? (
            <div className="flex items-center justify-between m-4">
              <div className="text-md text-gray-700">
                Đã chọn: <span className="truncate">{file}</span>
              </div>
              <button
                className="rounded p-2 border border-blue-600"
                onClick={() => {
                  setFile(undefined);
                  setData([]);
                }}
              >
                Chọn file khác
              </button>
            </div>
          ) : (
            <input type="file" className="m-4" onChange={handleFileUpload} />
          )}
        </div>
      </div>
      {file && <DataBoard fileData={data} setData={setData} />}
    </>
  );
};

export default Options;
