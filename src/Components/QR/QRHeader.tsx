import React, { useEffect, useState } from "react";

const QRHeader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const fetchImagePath = async () => {
      const path = await window.ipcRenderer.invoke(
        "get-image-file-path",
        "logo-agribank-dongphucvina.vn2_.png"
      );
      setImageSrc(path as string);
    };
    fetchImagePath();
  }, []);

  return (
    <>
      <div className="h-3"></div>
      <div
        className="flex items-center justify-center pt-4"
        style={{ background: "rgb(176, 26, 63)" }}
      >
        <img style={{ maxHeight: 25 }} src={imageSrc} alt="Agribank Logo" />
      </div>
    </>
  );
};

export default QRHeader;
