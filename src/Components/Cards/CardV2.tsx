import React from "react";
import { GlobalConfig, UserData } from "../../types";
import { _8x12 } from "../../constant/imageRatios";
import { v4 as uuid } from "uuid";
import { getQRLink } from "../../Helper/getQRLink";
import { locations } from "../../constant/locationData";

export interface QRProps {
  data: UserData;
  config: GlobalConfig;
}

const CardV1: React.FC<QRProps> = ({ data, config }) => {
  const srcImage = getQRLink(data.accountNumber);
  const id = uuid();
  const location = locations.find((l) => l.id === config.locationId);
  if (!location) return <div>Không tìm thấy địa điểm</div>;

  return (
    <div id={id}>
      <div id="qrCode" style={_8x12}>
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
