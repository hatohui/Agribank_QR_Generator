import React from "react";
import QRHeader from "./QRHeader";
import Logo from "./Logo";
import QRCode from "./QRCode";
import ScanText from "./ScanText";
import NameTag from "./NameTag";
import Credits from "./Credits";
import { getQRLink } from "../../Helper/getQRLink";
import { QRUserData, Sizes } from "../../types";
import { _8x11, _8x15 } from "../../constant/imageRatios";

export interface QRProps {
  data: QRUserData;
}

const Card: React.FC<QRProps> = ({ data }) => {
  const srcImage = getQRLink(data.accountNumber);
  return data.sizeRatio === Sizes._8x15 ? (
    <div id="qrCode" style={_8x15}>
      <QRHeader />
      <Logo />
      <QRCode srcImage={srcImage} />
      <ScanText />
      <NameTag data={data} />
      <Credits address={data.location.address} />
    </div>
  ) : data.sizeRatio === Sizes._8x11 ? (
    <div id="qrCode" style={_8x11}>
      <QRHeader />
      <Logo />
      <QRCode srcImage={srcImage} />
      <NameTag data={data} />
    </div>
  ) : (
    <div>Ratio not supported.</div>
  );
};

export default Card;
