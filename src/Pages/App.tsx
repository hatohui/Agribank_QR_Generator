import { Route, Routes } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Options from "../Components/UserChoices/Options";
// import { useState } from "react";
import QRGallery from "../Components/QRGallery";
import { data } from "../temp/data";
import { Sizes } from "../types";

const App: React.FC = () => {
  // const [datas, setDatas] = useState({});

  return (
    <>
      <NavBar />
      <Routes>
        <Route index path="/" element={<Options />} />
        <Route
          path="/gallery"
          element={<QRGallery datas={data} ratio={Sizes._8x15} />}
        />
      </Routes>
    </>
  );
};

export default App;
