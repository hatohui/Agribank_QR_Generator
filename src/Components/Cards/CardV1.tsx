import React from "react";
import QRHeader from "../QR/QRHeader";
import Logo from "../QR/Logo";
import QRCode from "../QR/QRCode";
import ScanText from "../QR/ScanText";
import NameTag from "../QR/NameTag";
import Credits from "../QR/Credits";
import { GlobalConfig, UserData } from "../../types";
import { _8x15 } from "../../constant/imageRatios";
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
      <div id="qrCode" style={_8x15}>
        <QRHeader />
        <Logo />
        <QRCode srcImage={srcImage} />
        <ScanText />
        <NameTag data={data} config={config} branch={location.branch} />
        <Credits address={location.address} />
      </div>
    </div>
  );
};

export default CardV1;
