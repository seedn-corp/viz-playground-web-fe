import { Flex } from '@basiln/utils';
import { useAtom } from 'jotai';

import { keyColorAtom } from '@/atoms/dashboard';

import { colorPickerCss } from './styles';

const COLORS = ['#6F36C9', '#4646D0', '#EC7300', '#43695B'];

export const ColorPicker = () => {
  const [keyColor, setKeyColor] = useAtom(keyColorAtom);

  return (
    <Flex gap={8} align="center">
      {COLORS.map((color) => (
        <button
          key={color}
          css={colorPickerCss.colorButton(color, color === keyColor)}
          onClick={() => setKeyColor(color)}
          aria-label={`색상 ${color} 선택`}
        />
      ))}
    </Flex>
  );
};