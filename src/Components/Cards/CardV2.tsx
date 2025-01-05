import React, { useEffect, useRef } from "react";
import { GlobalConfig, UserData } from "../../types";
import { _8x11, _8x12, _8x13, _8x15 } from "../../constant/imageRatios";
import * as htmlToImage from "html-to-image";
import { v4 as uuid } from "uuid";
import { getQRLink } from "../../Helper/getQRLink";
import { locations } from "../../constant/locationData";

export interface QRProps {
  data: UserData;
  config: GlobalConfig;
}

const CardV1: React.FC<QRProps> = ({ data, config }) => {
  const srcImage = getQRLink(data.accountNumber);
  const elementRef = useRef<HTMLDivElement>(null);
  const id = uuid();
  const location = locations.find((l) => l.id === config.locationId);

  if (!location) return <div>Không tìm thấy địa điểm</div>;

  // useEffect(() => {
  //   const handleImageLoad = () => {
  //     if (elementRef.current) {
  //       htmlToImage
  //         .toPng(elementRef.current)
  //         .then((dataUrl) => {
  //           const img = new Image();
  //           img.src = dataUrl;
  //           const div = document.getElementById(id);
  //           if (div) {
  //             div.innerHTML = "";
  //             div.appendChild(img);
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error generating image:", error);
  //         });
  //     }
  //   };

  //   const images = elementRef.current?.getElementsByTagName("img");
  //   if (images) {
  //     let loadedImagesCount = 0;
  //     for (let i = 0; i < images.length; i++) {
  //       images[i].onload = () => {
  //         loadedImagesCount++;
  //         if (loadedImagesCount === images.length) {
  //           handleImageLoad();
  //         }
  //       };
  //     }
  //   }
  // }, [elementRef]);

  return (
    <div id={id}>
      <div id="qrCode" style={_8x12} ref={elementRef}>
        <div className="relative flex justify-center items-center">
          <img
            className="absolute top-52 mb-1 border border-black"
            style={{ width: 88 }}
            src={srcImage}
            alt="QRCode"
          />
          <img src="/public/photos/mau2.png.jpg" />
        </div>
      </div>
    </div>
  );
};

export default CardV1;
