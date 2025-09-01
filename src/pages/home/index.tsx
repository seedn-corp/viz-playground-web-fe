import { Header } from "@/components/common/Header";
import { homeCss } from "@/pages/home/styles";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { css } from "@emotion/react";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import {
  widgetsAtom,
  layoutsAtom,
  EMPTY_LAYOUTS,
  nextLayoutsAfterAdd,
  type WidgetType,
} from "@/store/dashboard";

const barCss = css({
  display: "flex",
  gap: 8,
  paddingBottom: 12,
  position: "sticky",
  top: 60,
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "saturate(180%) blur(6px)",
  zIndex: 5,
  borderBottom: "1px solid #f1f3f5",
});
const btn = css({
  border: "1px solid #dee2e6",
  padding: "6px 10px",
  borderRadius: 8,
  background: "#fff",
  fontSize: 13,
  cursor: "pointer",
  ":hover": { background: "#f8f9fa" },
});

export const Home = () => {
  const setWidgets = useSetAtom(widgetsAtom);
  const setLayouts = useSetAtom(layoutsAtom);

  const add = (type: WidgetType) => {
    const id = nanoid();
    setWidgets((prev) => [...prev, { id, type }]);
    setLayouts((prev) => nextLayoutsAfterAdd(prev, id, type));
  };
  const clear = () => {
    setWidgets([]);
    setLayouts(EMPTY_LAYOUTS);
  };

  return (
    <div>
      <Header />
      <div css={homeCss.container}>
        <div css={barCss}>
          <button css={btn} onClick={() => add("note")}>
            ➕ 메모 추가
          </button>
          <button css={btn} onClick={() => add("chart")}>
            ➕ 차트 추가
          </button>
          <button css={btn} onClick={clear}>
            전체 비우기
          </button>
        </div>
        <DashboardGrid />
      </div>
    </div>
  );
};
