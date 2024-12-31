import { LocationData } from "./constant/locationData";

export type Image = {
  src: string;
  width: number;
  height: number;
};

export type GalleryImages = Image[];

export enum Sizes {
  NONE = "NONE",
  _8x11 = "8x11",
  _8x15 = "8x15",
}

export interface QRUserData {
  name: string;
  accountNumber: string;
  location: LocationData;
  sizeRatio: Sizes;
}
