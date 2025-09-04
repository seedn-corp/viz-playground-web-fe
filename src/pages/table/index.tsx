import { Button, Text } from '@basiln/design-system';
import { Grid, If, Spacing } from '@basiln/utils';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

import { Breadcrumb } from '@/components/common/Breadcrumb/Breadcrumb';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
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
import { useCreateWidget, useUpdateWidget } from '@/hooks/mutation/widgets';
import { useTableData } from '@/hooks/table/useTableData';
import { dashboardQueries } from '@/queries/dashboard';
import { widgetsQueries } from '@/queries/widgets';
import { computeNextPosition } from '@/utils/computeNextPosition';
import { LocalStorage } from '@/utils/LocalStorage';

import { widgetTableCss, widgetTablePageHeaderCss } from './styles';
import type { DataRow, Group, RouteIds } from './types';

export const TableWidgetPage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const dashboardId = params?.id;

  const [routeIds, setRouteIds] = useState<RouteIds>();

  // 위젯 전체 정보 받아오기 (position 계산용)
  const {
    data: allWidget,
    isPending: isLoadingAllWidget,
    error: widgetsError,
  } = useQuery(widgetsQueries.all(routeIds?.dashboardId ?? ''));

  // 위젯 상세 정보 받아오기 (수정 모드일 때)
  const { data: widgetDetail, isPending: isLoadingWidgetDetail } = useQuery(
    widgetsQueries.detail(routeIds?.widgetId ?? ''),
  );

  const { mutate: createWidget, isPending: isCreating } = useCreateWidget();
  const { mutate: updateWidget, isPending: isUpdating } = useUpdateWidget();

  // 대시보드 이름 표시용 상세 조회
  const { data: dashboardDetail, isPending: isLoadingDashboardDetail } = useQuery(
    dashboardQueries.detail(routeIds?.dashboardId ?? ''),
  );

  const breadcrumbItems = [
    { label: '대시보드' },
    { label: dashboardDetail?.name ?? routeIds?.dashboardId ?? '대시보드' },
  ];

  const [tableName, setTableName] = useState('새 테이블');
  const [viewMode, setViewMode] = useState<'table' | 'group'>('table');

  const {
    headers,
    rows: csvData,
    fileName,
    fileUploadLoading,
    fileUploadError,
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

    setHeaders,
    setRows,
  } = useTableData({ initialItemsPerPage: 10, viewMode });

  const handleAddWidget = () => {
    if (widgetsError) {
      toast.error('위젯 정보를 불러오지 못해 위젯을 추가할 수 없습니다.');
      return;
    }

    if (routeIds?.dashboardId == null) {
      toast.error('대시보드 정보를 불러오지 못해 위젯을 추가할 수 없습니다.');
      return;
    }

    const payload = {
      name: tableName || '새 테이블',
      type: 'table',
      processed_data: JSON.stringify({ columns: headers, rows: csvData }),
      config: JSON.stringify({ filterFields: selectedColumns, grouping: groupingColumns }),
    } as const;

    if (routeIds?.widgetId && widgetDetail) {
      updateWidget(
        { id: routeIds.widgetId, ...payload, position: widgetDetail.position },
        {
          onSuccess: () => {
            toast.success('위젯이 업데이트되었습니다.');
            navigate('/');
          },
          onError: (error: unknown) => {
            const msg = error instanceof Error ? error.message : String(error);
            toast.error(`위젯 업데이트에 실패했습니다: ${msg}`);
          },
        },
      );
      return;
    }

    const nextPosition = computeNextPosition(allWidget);

    createWidget(
      {
        ...payload,
        dashboardId: routeIds.dashboardId,
        position: nextPosition,
      },
      {
        onSuccess: () => {
          toast.success('위젯이 추가되었습니다.');
          navigate('/');
        },
        onError: (error: unknown) => {
          const msg = error instanceof Error ? error.message : String(error);
          toast.error(`위젯 추가에 실패했습니다: ${msg}`);
        },
      },
    );
  };

  useEffect(() => {
    if (groupingColumns.length === 0 && viewMode === 'group') {
      setViewMode('table');
    }
  }, [groupingColumns, viewMode]);

  useEffect(() => {
    if (dashboardId?.length === 17) {
      const id = LocalStorage.getItem(`${dashboardId}`);
      const { dashboardId: _dashboardId, widgetId } = JSON.parse(id || '{}');

      setRouteIds({ dashboardId: _dashboardId, widgetId });
    } else {
      setRouteIds({ dashboardId: dashboardId ?? '', widgetId: undefined });
    }
  }, [dashboardId]);

  useEffect(() => {
    if (!widgetDetail) {
      return;
    }

    setTableName(widgetDetail.name ?? '새 테이블');

    try {
      const pd = widgetDetail.processed_data ? JSON.parse(widgetDetail.processed_data) : null;
      if (pd) {
        const parsedHeaders = Array.isArray(pd.columns) ? pd.columns : [];
        const parsedRows = Array.isArray(pd.rows) ? pd.rows : [];

        setHeaders(parsedHeaders);
        setRows(parsedRows as DataRow[]);
      }
    } catch (err) {
      console.error('processed_data parse error', err);
    }

    try {
      const cfg = widgetDetail.config ? JSON.parse(widgetDetail.config) : null;
      if (cfg) {
        if (Array.isArray(cfg.filterFields)) setSelectedColumns(cfg.filterFields);
        if (Array.isArray(cfg.grouping)) setGroupingColumns(cfg.grouping);
      }
    } catch (err) {
      console.error('config parse error', err);
    }
  }, [widgetDetail, setHeaders, setRows, setSelectedColumns, setGroupingColumns]);

  return (
    <>
      <LoadingOverlay
        visible={
          isLoadingAllWidget ||
          (routeIds?.widgetId && isLoadingWidgetDetail) ||
          isLoadingDashboardDetail
        }
      />
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

          <Breadcrumb
            items={breadcrumbItems}
            pageTitle={routeIds?.widgetId ? '테이블 편집' : '테이블 만들기'}
          />
        </div>
        <Button
          display="inline"
          gutter="20px"
          radius="small"
          css={{ height: 36 }}
          onClick={handleAddWidget}
          isLoading={isCreating || isUpdating}
          disabled={
            headers.length === 0 ||
            csvData.length === 0 ||
            selectedColumns.length === 0 ||
            !!widgetsError
          }
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
            isLoading={fileUploadLoading}
            uploadedFileName={fileName || null}
            uploadedFileSize={fileSize}
            onRemove={() => {
              resetData();
              toast.success('파일이 제거되었습니다.');
            }}
          />
          {fileUploadError && (
            <Text
              size="caption-regular"
              color="승인오류"
              css={{ position: 'absolute', marginTop: '2px' }}
            >
              {fileUploadError}
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
                css={{ marginRight: '20px' }}
              />

              <Spacing size={10} />

              {selectedColumns.length > 0 && (
                <>
                  <div css={widgetTableCss.previewTableContainer}>
                    <div css={{ flex: 1, overflow: 'auto', paddingRight: '20px' }}>
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
                          allColumns={headers}
                        />
                      )}
                    </div>

                    {viewMode === 'table' && totalPages > 1 && (
                      <div css={{ marginTop: '12px', paddingRight: '20px' }}>
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
                css={{ marginRight: '20px', width: 'auto !important' }}
                type="full"
                onFileUpload={handleFileUpload}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                isLoading={fileUploadLoading}
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
