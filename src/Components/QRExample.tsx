import React from "react";
import * as htmlToImage from "html-to-image";
import Card from "./QR/Card";
import { QRProps } from "./QR/Card";

const QRImage: React.FC<QRProps> = ({ data }) => {
  const handleGenerateImage = () => {
    const element = document.getElementById("qrCode");
    if (element) {
      htmlToImage.toPng(element).then((dataUrl) => {
        console.log(dataUrl);
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div>QR Example</div>
      <Card data={data} />
      <button
        className="rounded border border-blue-600 hover:bg-blue-600 w-auto p-4 mt-2"
        onClick={handleGenerateImage}
      >
        Download as Image
      </button>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="relative w-[297mm] h-[210mm] bg-white shadow-lg border overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundSize: "5mm 5mm",
              backgroundImage: `
              linear-gradient(to right, #ddd 1px, transparent 1px),
              linear-gradient(to bottom, #ddd 1px, transparent 1px)
            `,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QRImage;
