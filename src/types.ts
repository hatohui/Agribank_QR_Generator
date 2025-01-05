import { SampleTypes } from "./constant/sampleData";

export type Image = {
  src: string;
  width: number;
  height: number;
};

export type GalleryImages = Image[];

export enum Sizes {
  ERROR = "",
  _8x11 = "8x11",
  _8x15 = "8x15",
}

export interface GlobalConfig {
  savePath: string;
  locationId: number | undefined;
  sampleType: SampleTypes;
}

export interface UserData {
  name: string;
  accountNumber: string;
}
