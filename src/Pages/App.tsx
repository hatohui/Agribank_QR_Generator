import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Options from "../Components/UserChoices/Options";
import { useState } from "react";
import QRGallery from "../Components/ResultPage/QRGallery";
import { GlobalConfig, UserData } from "../types";
import SampleSelection from "../Components/SampleSelection/SampleSelection";
import { SampleTypes } from "../CardModels";
import Warning from "../Components/Warning";

const App: React.FC = () => {
  const [config, setConfig] = useState<GlobalConfig>({
    savePath: "",
    locationId: undefined,
    sampleType: SampleTypes.NONE,
  });
  const [data, setData] = useState<UserData[]>([]);
  const [file, setFile] = useState<string>();
  const nav = useNavigate();

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn reset lại từ đầu không?")) {
      setConfig({
        savePath: "",
        locationId: undefined,
        sampleType: SampleTypes.NONE,
      });
      setData([]);
      setFile("");
      nav("/");
    }
  };

  return (
    <>
      <Warning />
      <NavBar />
      <Routes>
        <Route
          index
          path="/"
          element={
            <Options
              file={file}
              data={data}
              config={config}
              setConfig={setConfig}
              setData={setData}
              setFile={setFile}
            />
          }
        />
        <Route
          path="/gallery"
          element={
            <QRGallery datas={data} config={config} handleReset={handleReset} />
          }
        />
        <Route
          path="/samples"
          element={<SampleSelection config={config} setConfig={setConfig} />}
        />
      </Routes>
    </>
  );
};

export default App;
