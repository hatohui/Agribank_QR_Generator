import { Image } from "../types";
import { getQRLink } from "./getQRLink";

export const parseToObject = (accountNumber: string): Image => {
  return {
    src: getQRLink(accountNumber),
    width: 10,
    height: 10,
  };
};
