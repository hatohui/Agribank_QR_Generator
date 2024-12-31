const baseURL = "https://api.vietqr.io/image/";
const BankCode = "970405";
const templateCode = "evFHLgq";

const getQRLink = (accountNumber: string) => {
  return `${baseURL}${BankCode}-${accountNumber}-${templateCode}.jpg`;
};

export { getQRLink };
