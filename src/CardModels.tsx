import { GlobalConfig, Sizes, UserData } from "./types";
import CardV1 from "./Components/Cards/CardV1";
import CardV2 from "./Components/Cards/CardV2";
import { Sample } from "./constant/sampleData";

//add more types
export enum SampleTypes {
  "NONE" = 0,
  "DEFAULT" = 1,
  "NEW_YEAR" = 2,
}

//add size
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

//add more cards here
export const getCard = (config: GlobalConfig, data: UserData, key?: number) => {
  switch (config.sampleType) {
    case SampleTypes.DEFAULT:
      return <CardV1 key={key} data={data} config={config} />;
    case SampleTypes.NEW_YEAR:
      return <CardV2 key={key} data={data} config={config} />;
    default:
      return "CARD NOT AVAILABLE YET!";
  }
};

export const sampleList: Sample[] = [
  { name: "DEFAULT", type: SampleTypes.DEFAULT },
  {
    name: "NEW_YEAR",
    type: SampleTypes.NEW_YEAR,
  },
];
