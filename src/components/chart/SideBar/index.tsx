import type { ChartType } from '@/pages/chart/types';
import { Flex, Spacing, If } from '@basiln/utils';

import { Text } from '@basiln/design-system';
import { selectCss } from '../Select/styles';
import YAxisMultipleSelect from '../YAxisMultipleSelect';
import Select from '../Select';
import { parseCsvFileToJson } from '@/pages/chart/utils';
import type { SideBarProps } from './types';
import { sideBarCss } from './styles';
import { Download, Upload } from 'lucide-react';
import Separator from '../Separator';

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
  } = props;

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await parseCsvFileToJson(file);
      setChartData(data);
    }
  };

  return (
    <>
      <Flex align="start" direction="column">
        <Text>데이터 업로드</Text>
        <Spacing size={8} />
        <button css={sideBarCss.fileUploadButton}>
          <Upload css={[sideBarCss.uploadIcon, { marginBottom: 8 }]} />
          <Text>데이터 파일 업로드</Text>
          <Text size="caption-regular" color="gray_080">
            CSV 파일 지원
          </Text>

          <input
            css={sideBarCss.fileInput}
            type="file"
            accept=".csv"
            onChange={uploadFile}
          />
        </button>
        <Spacing size={6} />
        <button css={sideBarCss.sampleDownloadButton} onClick={() => {}}>
          <Download css={{ width: 14, height: 14 }} />
          <Text>샘플 데이터 다운로드</Text>
        </button>
      </Flex>

      <Spacing size={20} />

      <If condition={!!chartData}>
        <Separator
          orientation="horizontal"
          css={{ width: '100%' }}
          color="gray_050"
        />

        <Spacing size={20} />

        <Flex align="start" direction="column">
          <Text>차트 제목</Text>
          <input
            css={[selectCss.trigger, { width: '100%' }]}
            value={chartName}
            onChange={(e) => setChartName(e.target.value)}
            placeholder="차트 제목을 입력하세요."
          />
        </Flex>

        <Spacing size={20} />

        <Flex align="start" direction="column">
          <Text>차트 유형 선택</Text>
          <Select
            value={chartType}
            onValueChange={(value) => setChartType(value as ChartType)}
          >
            <Select.Trigger css={{ width: '100%' }}>{chartType}</Select.Trigger>
            <Select.Content>
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
          <Select
            value={xAxisKey}
            onValueChange={(value) => setXAxisKey(value)}
          >
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
            <Select
              value={yAxisKeys[0]}
              onValueChange={(value) => setYAxisKeys([value])}
            >
              <Select.Trigger css={{ width: '100%' }}>
                {yAxisKeys[0]}
              </Select.Trigger>
              <Select.Content>
                {chartDataKeys.map((key) => (
                  <Select.Item key={key} value={key}>
                    {key}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </Flex>
        ) : (
          <Flex align="start" direction="column">
            <Text>Y축</Text>
            <YAxisMultipleSelect
              name={yAxisKeys}
              onChange={setYAxisKeys}
              items={chartDataKeys}
            />
          </Flex>
        )}
      </If>
    </>
  );
};

export default SideBar;
