import { useState } from "react";
import { css } from "@emotion/react";
import { WidgetShell } from "../WidgetShell";

const styles = {
  ta: css({
    width: "100%",
    height: "100%",
    minHeight: 160,
    resize: "none",
    outline: "none",
    border: "1px solid #e9ecef",
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
  }),
};

export const NoteWidget = ({ onRemove }: { onRemove: () => void }) => {
  const [text, setText] = useState("메모를 입력하세요…");
  return (
    <WidgetShell title="📝 메모" onRemove={onRemove}>
      <textarea
        css={styles.ta}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </WidgetShell>
  );
};
