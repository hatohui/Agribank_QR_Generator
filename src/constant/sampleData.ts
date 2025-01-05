import { Sizes } from "../types";

export enum SampleTypes {
  "NONE" = 0,
  "DEFAULT" = 1,
  "NEW_YEAR" = 2,
}

export const getSizeFromType = (type: SampleTypes): Sizes => {
  switch (type) {
    case SampleTypes.DEFAULT:
      return Sizes._8x15;
    case SampleTypes.NEW_YEAR:
      return Sizes._8x11;
    case SampleTypes.NONE:
      return Sizes.ERROR;
  }
};

export type Sample = {
  name: string;
  type: SampleTypes;
};

export const sampleList: Sample[] = [
  { name: "DEFAULT", type: SampleTypes.DEFAULT },
  {
    name: "NEW_YEAR",
    type: SampleTypes.NEW_YEAR,
  },
];
