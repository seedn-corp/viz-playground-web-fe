/* eslint-disable @typescript-eslint/no-explicit-any */

import { sortDateStrings } from '@/utils/sortDateString';

/**
 * 차트 데이터를 그룹핑하고 yAxisKeys의 숫자 필드를 평균으로 계산한 결과를 반환합니다.
 * 최종 결과는 xAxisKey 기준으로 문자열 오름차순 정렬됩니다.
 *
 * @param {Array<Record<string, any>>} chartData - 원본 데이터 배열 (예: CSV 파싱 결과)
 * @param {string} xAxisKey - 그룹핑 기준이 되는 key (예: "월", "카테고리")
 * @param {string[]} yAxisKeys - 평균을 낼 대상이 되는 key 목록 (예: ["매출", "이익"])
 *
 * @returns {Array<Record<string, any>>} 그룹핑 및 평균된 데이터 배열 (xAxisKey 오름차순 정렬)
 */
export const aggregateChartData = (
  chartData: Record<string, string>[],
  xAxisKey: string,
  yAxisKeys: string[],
) => {
  const aggregated = Object.values(
    chartData.reduce((acc, cur) => {
      const groupKey = cur[xAxisKey];

      if (!acc[groupKey]) {
        // 초기화
        acc[groupKey] = { [xAxisKey]: groupKey, __count: 0 };
        yAxisKeys.forEach((yKey) => {
          acc[groupKey][yKey] = Number(cur[yKey]) || 0;
        });
      } else {
        yAxisKeys.forEach((yKey) => {
          acc[groupKey][yKey] += Number(cur[yKey]) || 0;
        });
      }

      acc[groupKey].__count += 1;
      return acc;
    }, {} as Record<string, any>),
  );

  // 평균으로 변환
  aggregated.forEach((item) => {
    const count = item.__count || 1;
    yAxisKeys.forEach((yKey) => {
      item[yKey] = item[yKey] / count;
    });
    delete item.__count;
  });

  // xAxisKey 기준 문자열 오름차순 정렬
  return aggregated.sort((a, b) => sortDateStrings(a[xAxisKey], b[xAxisKey]));
};
