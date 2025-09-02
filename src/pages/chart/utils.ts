/**
 * CSV 파일을 JSON으로 파싱하는 함수
 */
export async function parseCsvFileToJson(
  file: File
): Promise<Record<string, string>[]> {
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
