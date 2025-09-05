import { Text } from '@basiln/design-system';
import { Flex, Spacing, If } from '@basiln/utils';
import { Download } from 'lucide-react';

import type { ChartType } from '@/pages/chart/types';

import FileUploader from '../FileUploader';
import Select from '../Select';
import { sideBarCss } from './styles';

import YAxisMultipleSelect from '../YAxisMultipleSelect';
import FilterMultiSelect from '../FilterMultiSelect';
import type { SideBarProps } from './types';
import Separator from '../Separator';
import { useMemo } from 'react';
import { sortDateStrings } from '@/utils/sortDateString';
import ComposedYAxisSelect from '../ComposedYAxisSelect';

const SideBar = (props: SideBarProps) => {
  const {
    chartName,
    setChartName,
    chartData,
    setChartData,
    chartDataKeys,
    xAxisKey,
    setXAxisKey,
    yAxisKeys,
    setYAxisKeys,
    chartType,
    setChartType,
    filters,
    setFilters,
    composedConfig,
    setComposedConfig,
  } = props;

  const numberValueKeys = chartDataKeys.filter((key) => !isNaN(Number(chartData?.[0][key])));

  const filterableColumns = useMemo(() => {
    if (!chartData) return [];

    const stringValueKeys = chartDataKeys.filter((key) => isNaN(Number(chartData?.[0][key])));

    const uniqueKeys = chartDataKeys.filter((key) => {
      if (!chartData[0][key]) return false;

      const uniqueValues = [...new Set(chartData.map((item) => item[key]))];

      return uniqueValues.length > 1 && uniqueValues.length <= 20;
    });

    return [...new Set([...stringValueKeys, ...uniqueKeys])];
  }, [chartData, chartDataKeys]);

  const getFilterOptions = (column: string) => {
    if (!chartData) return [];
    return [...new Set(chartData.map((item) => item[column]))];
  };

  const handleFilterChange = (column: string, selectedValues: string[]) => {
    const newFilters = {
      ...filters,
      [column]: selectedValues,
    };
    setFilters(newFilters);
  };

  return (
    <>
      <Flex align="start" direction="column">
        <Text>차트 제목</Text>
        <Spacing size={8} />
        <input
          css={[sideBarCss.nameInput, { width: '100%' }]}
          value={chartName}
          onChange={(e) => setChartName(e.target.value)}
          placeholder="차트 제목을 입력하세요."
        />
      </Flex>

      <Spacing size={20} />

      <Flex align="start" direction="column">
        <Text>데이터 업로드</Text>
        <Spacing size={8} />

        <FileUploader onChangeChartData={setChartData} />

        <Spacing size={6} />

        <a href="/excel/sample.xlsx" download="sample.xlsx" css={sideBarCss.sampleDownloadButton}>
          <Download css={{ width: 14, height: 14 }} />
          <Text>샘플 데이터 다운로드</Text>
        </a>
      </Flex>

      <Spacing size={20} />

      <If condition={!!chartData}>
        <Separator orientation="horizontal" css={{ width: '100%' }} color="gray_050" />

        <Spacing size={20} />

        <Flex align="start" direction="column">
          <Text>차트 유형 선택</Text>
          <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
            <Select.Trigger css={{ width: '100%' }}>{chartType}</Select.Trigger>
            <Select.Content>
              <Select.Item value="composed">composed</Select.Item>
              <Select.Item value="line">line</Select.Item>
              <Select.Item value="bar">bar</Select.Item>
              <Select.Item value="area">area</Select.Item>
              <Select.Item value="pie">pie</Select.Item>
            </Select.Content>
          </Select>
        </Flex>

        <Spacing size={20} />

        <Flex align="start" direction="column" css={{ width: '100%' }}>
          <Text>X축</Text>
          <Select value={xAxisKey} onValueChange={(value) => setXAxisKey(value)}>
            <Select.Trigger css={{ width: '100%' }}>{xAxisKey}</Select.Trigger>
            <Select.Content>
              {chartDataKeys.map((key) => (
                <Select.Item key={key} value={key}>
                  {key}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </Flex>

        <Spacing size={20} />

        {chartType === 'pie' ? (
          <Flex align="start" direction="column" css={{ width: '100%' }}>
            <Text>Y축</Text>
            <Select value={yAxisKeys[0]} onValueChange={(value) => setYAxisKeys([value])}>
              <Select.Trigger css={{ width: '100%' }}>{yAxisKeys[0]}</Select.Trigger>
              <Select.Content>
                {numberValueKeys.map((key) => (
                  <Select.Item key={key} value={key} disabled={key === xAxisKey}>
                    {key}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </Flex>
        ) : chartType === 'composed' ? (
          <>
            <Flex align="start" direction="column">
              <Text>Y축</Text>
              <YAxisMultipleSelect
                name={yAxisKeys}
                onChange={setYAxisKeys}
                items={numberValueKeys}
                disabledItem={xAxisKey}
              />
            </Flex>

            <Spacing size={20} />

            {yAxisKeys.length > 0 && composedConfig && setComposedConfig && (
              <ComposedYAxisSelect
                yAxisKeys={yAxisKeys}
                composedConfig={composedConfig}
                onComposedConfigChange={setComposedConfig}
                disabledItem={xAxisKey}
              />
            )}
          </>
        ) : (
          <Flex align="start" direction="column">
            <Text>Y축</Text>
            <YAxisMultipleSelect
              name={yAxisKeys}
              onChange={setYAxisKeys}
              items={numberValueKeys}
              disabledItem={xAxisKey}
            />
          </Flex>
        )}

        <Spacing size={20} />

        <Separator orientation="horizontal" css={{ width: '100%' }} color="gray_050" />

        <Spacing size={20} />

        {filterableColumns.length > 0 && (
          <Flex align="start" direction="column" css={{ width: '100%' }}>
            <Text>필터</Text>
            <Spacing size={8} />

            {filterableColumns.map((column) => (
              <div key={column} css={{ width: '100%', marginBottom: 16 }}>
                <Text size="body-small" css={{ marginBottom: 6 }}>
                  {column}
                </Text>
                <FilterMultiSelect
                  name={filters?.[column] || []}
                  onChange={(values) => handleFilterChange(column, values)}
                  items={getFilterOptions(column).sort(sortDateStrings)}
                  placeholder={`${column} 선택`}
                />
              </div>
            ))}
          </Flex>
        )}
      </If>
    </>
  );
};

export default SideBar;
