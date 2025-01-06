import { UserData } from "../types";
import * as XLSX from "xlsx";

export const parseExcelToUserData = async (file: File): Promise<UserData[]> => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: "",
  });
  const userData: UserData[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonData.slice(1).forEach((data: any) => {
    userData.push({
      name: String(data[1]).toUpperCase().trim(),
      accountNumber: String(data[2]).trim(),
    });
  });
  return userData;
};
