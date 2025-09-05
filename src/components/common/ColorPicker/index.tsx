import { Flex } from '@basiln/utils';
import { useAtom } from 'jotai';
import { Palette, X } from 'lucide-react';
import { useState } from 'react';
import { SketchPicker, type ColorResult } from 'react-color';

import { keyColorAtom, colorHistoryAtom } from '@/atoms/dashboard';

import { colorPickerCss } from './styles';

const PRESET_COLORS = [
  '#6F36C9', // seedn 기본
];

export const ColorPicker = () => {
  const [keyColor, setKeyColor] = useAtom(keyColorAtom);
  const [colorHistory, setColorHistory] = useAtom(colorHistoryAtom);
  const [showPicker, setShowPicker] = useState(false);
  const [tempColor, setTempColor] = useState(keyColor);

  const addToHistory = (color: string) => {
    if (!colorHistory.includes(color)) {
      const newHistory = [color, ...colorHistory];
      setColorHistory(newHistory);
    }
  };

  const removeFromHistory = (colorToRemove: string) => {
    const newHistory = colorHistory.filter((color) => color !== colorToRemove);
    setColorHistory(newHistory);
  };

  const handleColorChange = (color: ColorResult) => {
    setTempColor(color.hex);
  };

  const handleColorConfirm = () => {
    setKeyColor(tempColor);
    addToHistory(tempColor);
    setShowPicker(false);
  };

  const handleColorCancel = () => {
    setTempColor(keyColor);
    setShowPicker(false);
  };

  return (
    <div css={colorPickerCss.container}>
      <Flex gap={8} align="center">
        <button
          css={colorPickerCss.customButton(keyColor)}
          onClick={() => setShowPicker(!showPicker)}
          aria-label="커스텀 색상 선택"
        >
          <Palette size={14} />
        </button>
      </Flex>

      {showPicker && (
        <div css={colorPickerCss.pickerContainer}>
          <div css={colorPickerCss.overlay} onClick={handleColorCancel} />
          <div css={colorPickerCss.pickerWrapper}>
            <SketchPicker
              color={tempColor}
              onChange={handleColorChange}
              presetColors={[]}
              disableAlpha
            />
            <div css={colorPickerCss.colorSection}>
              {/* 프리셋 색상 */}
              <div css={colorPickerCss.presetSection}>
                <div css={colorPickerCss.historyLabel}>추천 색상</div>
                <div css={colorPickerCss.historyGrid}>
                  {PRESET_COLORS.map((color) => (
                    <div
                      key={color}
                      css={colorPickerCss.historyItemContainer}
                      className="history-item"
                    >
                      <button
                        css={colorPickerCss.historyButton(color, color === tempColor)}
                        onClick={() => setTempColor(color)}
                        aria-label={`추천 색상 ${color} 선택`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 히스토리 색상 */}
              {colorHistory.length > 0 && (
                <div css={colorPickerCss.historySection}>
                  <div css={colorPickerCss.historyLabel}>최근 사용한 색상</div>
                  <div css={colorPickerCss.historyGrid}>
                    {colorHistory.map((color) => (
                      <div
                        key={color}
                        css={colorPickerCss.historyItemContainer}
                        className="history-item"
                      >
                        <button
                          css={colorPickerCss.historyButton(color, color === tempColor)}
                          onClick={() => setTempColor(color)}
                          aria-label={`색상 ${color} 선택`}
                        />
                        <button
                          css={colorPickerCss.historyDeleteButton}
                          onClick={() => removeFromHistory(color)}
                          aria-label={`색상 ${color} 삭제`}
                        >
                          <X size={6} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Flex gap={8} css={colorPickerCss.pickerButtons}>
              <button css={colorPickerCss.cancelButton} onClick={handleColorCancel}>
                취소
              </button>
              <button css={colorPickerCss.confirmButton} onClick={handleColorConfirm}>
                적용
              </button>
            </Flex>
          </div>
        </div>
      )}
    </div>
  );
};
