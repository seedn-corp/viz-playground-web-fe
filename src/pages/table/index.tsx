import { Button, Text } from '@basiln/design-system';
import { Grid, If, Spacing } from '@basiln/utils';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import {
  FileUploadArea,
  ColumnSelector,
  GroupingSelector,
  TableControls,
  DataTable,
  NestedTable,
  Pagination,
  ViewModeSelector,
} from '@/components/table';
import { useCreateWidget } from '@/hooks/mutation/widgets/useCreateWidget';
import { useTableData } from '@/hooks/table/useTableData';
import { widgetsQueries } from '@/queries/widgets';
import { computeNextPosition } from '@/utils/computeNextPosition';

import { widgetTableCss, widgetTablePageHeaderCss } from './styles';
import type { DataRow, Group } from './types';

export const TableWidgetPage = () => {
  const navigate = useNavigate();

  const [tableName, setTableName] = useState('새 테이블');
  const [viewMode, setViewMode] = useState<'table' | 'group'>('table');

  const {
    headers,
    rows: csvData,
    fileName,
    loading,
    error,
    fileSize,
    currentPage,
    itemsPerPage,
    sortConfig,
    selectedColumns,
    groupingColumns,
    expandedGroups,
    paginatedData,
    totalPages,
    nestedData,

    setItemsPerPage,
    setCurrentPage,
    setSelectedColumns,
    setGroupingColumns,

    handleFileUpload,
    handleDrop,
    handleDragOver,
    handleSort,
    resetData,
    toggleColumnSelection,
    updateGroupingLevel,
    expandAllGroups,
    collapseAllGroups,
    toggleGroupExpansion,
  } = useTableData({ initialItemsPerPage: 10, viewMode });

  const { mutate, isPending } = useCreateWidget();
  const { data, error: widgetsError } = useQuery(
    widgetsQueries.all('d3985fd6-327b-4ab6-8720-0fa6e63b916b'),
  );

  const handleAddWidget = () => {
    if (widgetsError) {
      toast.error('위젯 정보를 불러오지 못해 위젯을 추가할 수 없습니다.');
      return;
    }

    const nextPosition = computeNextPosition(data);

    console.log({
      name: tableName || '새 테이블',
      type: 'table',
      processed_data: JSON.stringify({ columns: headers, rows: csvData }),
      config: JSON.stringify({ filterFields: selectedColumns, grouping: groupingColumns }),
      position: nextPosition,
    });

    mutate(
      {
        dashboardId: 'd3985fd6-327b-4ab6-8720-0fa6e63b916b',

        name: tableName || '새 테이블',
        type: 'table',
        processed_data: JSON.stringify({ columns: headers, rows: csvData }),
        config: JSON.stringify({ filterFields: selectedColumns, grouping: groupingColumns }),
        position: nextPosition,
      },
      {
        onSuccess: () => {
          toast.success('위젯이 추가되었습니다.');
          navigate('/');
        },
        onError: (error) => {
          toast.error(`위젯 추가에 실패했습니다: ${error.message}`);
        },
      },
    );
  };

  useEffect(() => {
    if (groupingColumns.length === 0 && viewMode === 'group') {
      setViewMode('table');
    }
  }, [groupingColumns, viewMode]);

  return (
    <>
      <header css={widgetTablePageHeaderCss.self}>
        <div css={widgetTablePageHeaderCss.buttonContainer}>
          <Button
            display="inline"
            gutter="10px"
            leftAddon={<ArrowLeft size={14} />}
            radius="small"
            variant="ghost"
            onClick={() => navigate('/')}
          >
            <Text color="black" size="btn-medium">
              돌아가기
            </Text>
          </Button>

          <Text size="body-large">테이블 만들기</Text>
        </div>
        <Button
          display="inline"
          gutter="20px"
          radius="small"
          css={{ height: 36 }}
          onClick={handleAddWidget}
          isLoading={isPending}
          disabled={headers.length === 0 || csvData.length === 0 || selectedColumns.length === 0}
        >
          <Text color="white">저장하기</Text>
        </Button>
      </header>

      <Grid columns="260px 1fr" css={widgetTableCss.container}>
        <Grid.Item css={widgetTableCss.left}>
          <label htmlFor="file-name" css={widgetTableCss.tableNameContainer}>
            <Text css={widgetTableCss.fieldTitle}>테이블 제목</Text>

            <input
              id="file-name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              css={widgetTableCss.tableNameInput}
              placeholder="새 테이블"
            />
          </label>

          <Spacing size={20} />

          <Text as="p" css={widgetTableCss.fieldTitle}>
            데이터 업로드
          </Text>

          <FileUploadArea
            type="compact"
            onFileUpload={handleFileUpload}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            isLoading={loading}
            uploadedFileName={fileName || null}
            uploadedFileSize={fileSize}
            onRemove={() => {
              resetData();
              toast.success('파일이 제거되었습니다.');
            }}
          />
          {error && (
            <Text
              size="caption-regular"
              color="승인오류"
              css={{ position: 'absolute', marginTop: '2px' }}
            >
              {error}
            </Text>
          )}

          <Spacing size={20} />

          <div css={widgetTableCss.separator} />

          <Spacing size={20} />

          <Text as="p" css={widgetTableCss.fieldTitle}>
            테이블 정보
          </Text>

          <TableControls
            fileName={fileName}
            rowCount={csvData.length}
            colCount={selectedColumns.length}
            groupingColumns={groupingColumns}
          />

          <Spacing size={8} />

          <ColumnSelector
            headers={headers}
            selectedColumns={selectedColumns}
            onToggleColumn={toggleColumnSelection}
            onSelectAll={() => setSelectedColumns([...headers])}
            onClearAll={() => setSelectedColumns([])}
          />

          <Spacing size={20} />

          {selectedColumns.length > 0 && (
            <GroupingSelector
              selectedColumns={selectedColumns}
              groupingColumns={groupingColumns}
              onUpdateGrouping={updateGroupingLevel}
              onClearGrouping={() => setGroupingColumns([])}
            />
          )}
        </Grid.Item>

        <Grid.Item css={widgetTableCss.right}>
          <div css={widgetTableCss.previewContainer}>
            <If condition={csvData.length > 0}>
              <ViewModeSelector
                type={viewMode}
                groupingColumns={groupingColumns}
                onTypeChange={setViewMode}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                onCurrentPageChange={setCurrentPage}
                onExpandAllGroups={expandAllGroups}
                onCollapseAllGroups={collapseAllGroups}
              />

              <Spacing size={10} />

              {selectedColumns.length > 0 && (
                <>
                  <div css={widgetTableCss.previewTableContainer}>
                    <div css={{ flex: 1, overflow: 'auto' }}>
                      {viewMode === 'table' ? (
                        <DataTable
                          selectedColumns={selectedColumns}
                          paginatedData={paginatedData as DataRow[]}
                          sortConfig={sortConfig}
                          onSort={handleSort}
                        />
                      ) : (
                        <NestedTable
                          data={nestedData as Group[]}
                          selectedColumns={selectedColumns}
                          expandedGroups={expandedGroups}
                          onToggleGroup={toggleGroupExpansion}
                        />
                      )}
                    </div>

                    {viewMode === 'table' && totalPages > 1 && (
                      <div css={{ marginTop: '12px' }}>
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={setCurrentPage}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </If>

            <If condition={csvData.length === 0}>
              <FileUploadArea
                type="full"
                onFileUpload={handleFileUpload}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                isLoading={loading}
                uploadedFileName={fileName || null}
                uploadedFileSize={fileSize}
                onRemove={() => {
                  resetData();
                  toast.success('파일이 제거되었습니다.');
                }}
              />
            </If>
          </div>
        </Grid.Item>
      </Grid>
    </>
  );
};
