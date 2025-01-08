import React, { useState } from "react";
import { GlobalConfig, UserData } from "../../types";
import {
  getImagesPerPaper,
  getSeparatedIndexes,
} from "../../Helper/calculations";
import A4Paper from "./A4Paper";
import * as htmlToImage from "html-to-image";
import { v4 as uuid } from "uuid";
import { SampleTypes } from "../../CardModels";

interface QRGalleryProps {
  datas: UserData[];
  config: GlobalConfig;
  handleReset: () => void;
}

const QRGallery: React.FC<QRGalleryProps> = ({
  datas,
  config,
  handleReset,
}) => {
  const totalRectangles = getImagesPerPaper(config.sampleType);
  const separatedIndexes = getSeparatedIndexes(datas, totalRectangles);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleDownload = () => {
    const papers = document.querySelectorAll(".A4papers");
    try {
      if (papers) {
        papers.forEach(async (paper) => {
          const image = await htmlToImage.toPng(paper as HTMLElement);
          await window.ipcRenderer.saveImage(
            config.savePath,
            image,
            `${uuid()}.png`
          );
        });
      } else console.error("No papers found");
      setDownloaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getInsufficientMessage = (): string => {
    return (
      (config.locationId !== 0 && !config.locationId
        ? " dữ liệu địa điểm, "
        : "") +
      (config.sampleType === SampleTypes.NONE ? " dữ liệu mẫu," : "") +
      (!config.savePath ? " địa điểm lưu trữ hình ảnh," : "") +
      (!datas.length ? " dữ liệu từ file excel" : "")
    );
  };

  if (config.sampleType === SampleTypes.NONE || !datas.length)
    return (
      <div className="flex items-center justify-center">
        <div className="text-center m-10 select-none">
          <span className="block text-xl">Không có đủ dữ liệu để tạo QR</span>
          <span className="text-l">
            Thiếu:
            <span className="text-red-500">{getInsufficientMessage()}</span>
          </span>
        </div>
      </div>
    );

  const handleOpenFileExplorer = () => {
    window.ipcRenderer
      .openFileExplorer(config.savePath)
      .then(() => {
        console.log("Opened File Explorer at ", config.savePath);
      })
      .catch((E) => console.log(E));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <div
          className={`${
            downloaded
              ? "disabled cursor-not-allowed bg-green-100 border-green-800"
              : "hover:bg-slate-500"
          } border-2 text-center rounded w-80 h-10 m-2 cursor-default`}
          onClick={handleDownload}
        >
          {downloaded ? "Đã tải" : "Tải hình ảnh về"}
        </div>

        {downloaded && (
          <div className="flex justify-center mt-4 gap-3">
            <button
              onClick={handleOpenFileExplorer}
              className="bg-green-600 hover:bg-green-700 mb-4 text-white font-bold py-2 px-4 rounded"
            >
              Mở trong FileExplorer
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 mb-4 text-white font-bold py-2 px-4 rounded"
              onClick={handleReset}
            >
              Thêm lần nữa
            </button>
          </div>
        )}
      </div>
      {separatedIndexes.map((indexs, i) => (
        <A4Paper key={i} datas={datas} indexes={indexs} config={config} />
      ))}
    </div>
  );
};

export default QRGallery;
