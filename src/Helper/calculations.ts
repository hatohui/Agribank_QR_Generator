import { A4_HEIGHT, A4_WIDTH } from "../constant/paperSize";
import { getSizeFromType, SampleTypes } from "../constant/sampleData";
import { Sizes } from "../types";

export const getImagesPerPaper = (type: SampleTypes): number => {
  let rectWidth;
  let rectHeight;

  switch (getSizeFromType(type)) {
    case Sizes._8x11:
      rectWidth = 8;
      rectHeight = 11;
      break;
    case Sizes._8x15:
      rectWidth = 8;
      rectHeight = 15;
      break;
    default:
      rectWidth = 8;
      rectHeight = 15;
  }

  const margin = 0.5;
  const cols = Math.floor(A4_WIDTH / (rectWidth + margin));
  const rows = Math.floor(A4_HEIGHT / (rectHeight + margin));
  return cols * rows;
};

export const getSeparatedIndexes = (datas: object[], indexPerSplit: number) => {
  const separatedIndexes = [];
  let tempIndex = [];
  let count = 1;
  for (let i = 0; i < datas.length; i++) {
    if (count === indexPerSplit) {
      tempIndex.push(i);
      count = 1;
      separatedIndexes.push(tempIndex);
      tempIndex = [];
    } else {
      tempIndex.push(i);
      count++;
    }
  }

  if (tempIndex.length !== 0) separatedIndexes.push(tempIndex);
  return separatedIndexes;
};
