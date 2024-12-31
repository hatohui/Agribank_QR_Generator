import React from "react";
import { QRUserData, Sizes } from "../types";
import { getImagesPerPaper, getSeparatedIndexes } from "../Helper/calculations";
import A4Paper from "./ResultPage/A4Paper";

interface QRGalleryProps {
  datas: QRUserData[];
  ratio: Sizes;
}

const QRGallery: React.FC<QRGalleryProps> = ({ datas, ratio }) => {
  const totalRectangles = getImagesPerPaper(ratio);
  const separatedIndexes = getSeparatedIndexes(datas, totalRectangles);
  return (
    <div>
      <div>GALLERY: </div>
      {separatedIndexes.map((indexs, i) => (
        <A4Paper key={i} datas={datas} indexes={indexs} />
      ))}
    </div>
  );
};

export default QRGallery;
