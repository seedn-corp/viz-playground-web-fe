/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 차트 데이터를 그룹핑하고 yAxisKeys의 숫자 필드를 합산한 결과를 반환합니다.
 *
 * @param {Array<Record<string, any>>} chartData - 원본 데이터 배열 (예: CSV 파싱 결과)
 * @param {string} xAxisKey - 그룹핑 기준이 되는 key (예: "월", "카테고리")
 * @param {string[]} yAxisKeys - 합산할 대상이 되는 key 목록 (예: ["매출", "이익"])
 *
 * @returns {Array<Record<string, any>>} 그룹핑 및 합산된 데이터 배열
 *
 * @example
 * const data = [
 *   { 월: "1월", 매출: "4000", 이익: "2400", 카테고리: "A" },
 *   { 월: "2월", 매출: "3000", 이익: "1398", 카테고리: "B" },
 *   { 월: "3월", 매출: "2000", 이익: "9800", 카테고리: "A" },
 * ];
 *
 * const result = aggregateChartData(data, "카테고리", ["매출", "이익"]);
 * // [
 * //   { 카테고리: "A", 매출: 6000, 이익: 12200 },
 * //   { 카테고리: "B", 매출: 3000, 이익: 1398 }
 * // ]
 */
export const aggregateChartData = (
  chartData: Record<string, string>[],
  xAxisKey: string,
  yAxisKeys: string[],
) => {
  return Object.values(
    chartData.reduce((acc, cur) => {
      const groupKey = cur[xAxisKey];

      if (!acc[groupKey] || typeof acc[groupKey] !== 'number') {
        // xAxisKey와 yAxisKeys만 남겨서 초기화
        acc[groupKey] = { [xAxisKey]: groupKey };
        yAxisKeys.forEach((yKey) => {
          acc[groupKey][yKey] = Number(cur[yKey]) || cur[yKey];
        });
      } else {
        yAxisKeys.forEach((yKey) => {
          acc[groupKey][yKey] += Number(cur[yKey]) || 0;
        });
      }

      return acc;
    }, {} as Record<string, any>),
  );
};
