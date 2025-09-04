import * as XLSX from 'xlsx';

/**
 * CSV 파일을 JSON으로 파싱하는 함수
 */
export async function parseCsvFileToJson(file: File): Promise<Record<string, string>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');

        // 첫 번째 줄을 헤더로 사용
        const headers = lines[0].split(',').map((h) => h.trim());
        const data = lines.slice(1).map((line) => {
          const values = line.split(',').map((v) => v.trim());
          return headers.reduce((acc, header, index) => {
            acc[header] = values[index] ?? '';
            return acc;
          }, {} as Record<string, string>);
        });

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

export async function parseXlsxFileToJson(file: File): Promise<Record<string, string>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // 첫 번째 시트 가져오기
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // 시트를 JSON으로 변환
        const jsonData: Record<string, string>[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: '', // 값이 없을 때 빈 문자열로 처리
          raw: false, // 날짜/시간 값 string으로 변환
        });

        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file); // 엑셀은 ArrayBuffer로 읽어야 함
  });
}

export const isCSV = (file: File) => {
  return file.name.toLocaleLowerCase().endsWith('.csv');
};

export const isExcel = (file: File) => {
  return (
    file.name.toLocaleLowerCase().endsWith('.xlsx') ||
    file.name.toLocaleLowerCase().endsWith('.xls')
  );
};

type Difference<T> = {
  [K in keyof T]?: T[K];
};

function areArraysEqual(arr1: (string | number)[], arr2: (string | number)[]) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}

export function getDifferentKeys<T extends Record<string, unknown>>(
  data: T,
  form: T,
): Difference<T> {
  const result: Partial<T> = {};

  for (const key in data) {
    const val1 = data[key];
    const val2 = form[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (!areArraysEqual(val1, val2)) {
        result[key] = val2;
      }
    } else if (val1 !== val2) {
      result[key] = val2;
    }
  }

  return Object.values(result).filter((i) => i).length ? result : {};
}
