import dayjs from 'dayjs';

// 허용할 날짜/시간 포맷 정의
const DATE_FORMATS = [
  'M/D/YY',
  'MM/DD/YY',
  'YYYY-MM-DD',
  'YYYY-MM-DD HH:mm:ss',
  'YYYY-MM-DD H:mm:ss',
  'HH:mm:ss',
  'H:mm:ss',
];

// 문자열을 날짜/시간으로 파싱 시도, 실패하면 null 반환
function parseDateOrTime(str: string) {
  for (const format of DATE_FORMATS) {
    const d = dayjs(str, format, true);
    if (d.isValid()) return d;
  }
  return null;
}

export function sortDateStrings(a: string, b: string): number {
  const dateA = parseDateOrTime(a);
  const dateB = parseDateOrTime(b);

  // 둘 다 날짜/시간이면 비교
  if (dateA && dateB) {
    return dateA.valueOf() - dateB.valueOf();
  }

  // 하나만 날짜/시간이면 문자열보다 뒤로
  if (dateA && !dateB) return 1;
  if (!dateA && dateB) return -1;

  // 둘 다 날짜/시간 아님 → 일반 문자열 비교
  return a.localeCompare(b);
}
