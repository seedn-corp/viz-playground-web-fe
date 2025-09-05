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

        // 시간 데이터 변환 처리
        const processedData = processTimeColumns(data);

        resolve(processedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/**
 * 시간 문자열(HH:MM:SS)을 시간 단위 숫자로 변환하는 함수
 * 예: "1:30:00" -> 1.5, "0:30:00" -> 0.5
 */
function convertTimeStringToHours(timeString: string): string {
  if (!timeString || timeString.trim() === '') return '';
  
  // HH:MM:SS 형식 체크
  const timePattern = /^\d{1,2}:\d{2}:\d{2}$/;
  if (!timePattern.test(timeString)) return timeString;
  
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const totalHours = hours + minutes / 60 + seconds / 3600;
  
  // 소수점 3자리까지 반올림
  return totalHours.toFixed(3);
}

/**
 * 시간 데이터가 포함된 컬럼을 감지하고 변환하는 함수
 */
function processTimeColumns(data: Record<string, string>[]): Record<string, string>[] {
  if (!data || data.length === 0) return data;
  
  // 시간 컬럼 후보를 찾기 위한 키워드 (한국어/영어)
  const timeKeywords = ['제어', 'control', '시간', 'time', '운영', 'operation'];
  
  return data.map((row) => {
    const processedRow = { ...row };
    
    Object.keys(row).forEach((key) => {
      const value = row[key];
      
      // 키워드가 포함되어 있고, HH:MM:SS 형식인지 확인
      const containsTimeKeyword = timeKeywords.some(keyword => 
        key.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (containsTimeKeyword && value) {
        const convertedValue = convertTimeStringToHours(value);
        if (convertedValue !== value) {
          processedRow[key] = convertedValue;
        }
      }
    });
    
    return processedRow;
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

        // 시간 데이터 변환 처리
        const processedData = processTimeColumns(jsonData);

        resolve(processedData);
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
