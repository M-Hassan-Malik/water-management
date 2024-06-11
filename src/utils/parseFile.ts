// utils/parseFile.ts
import type { ParseError } from "papaparse";
import Papa from "papaparse";
import type { WorkBook, WorkSheet } from "xlsx";
import { read, utils as xlsxUtils } from "xlsx";

interface ParseCsvResult {
  data: any[];
  errors?: ParseError[];
  meta?: Papa.ParseMeta;
}

export const parseCsvFile = (file: File | any): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (result: ParseCsvResult) => {
        // Filter out empty rows
        const nonEmptyRows = result.data.filter((row) =>
          row.some((cell: any) => cell !== "")
        );
        resolve(nonEmptyRows);
      },
      error: (error: ParseError | any) => {
        reject(error.message);
      },
    });
  });
};

export const parseExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook: WorkBook = read(data, { type: "binary" });
      const sheetName: string = workbook.SheetNames[0] as string;
      const sheet: WorkSheet = workbook.Sheets[sheetName] as WorkSheet;

      // Use xlsxUtils instead of utils
      const jsonData: any[] = xlsxUtils.sheet_to_json(sheet, { header: 1 });

      // Filter out empty rows
      const nonEmptyRows = jsonData.filter((row) =>
        row.some((cell: any) => cell !== "")
      );
      resolve(nonEmptyRows);
    };

    reader.onerror = (error: any) => {
      reject(error.message);
    };

    reader.readAsBinaryString(file);
  });
};
