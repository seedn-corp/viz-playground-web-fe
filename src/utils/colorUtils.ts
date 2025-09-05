// HEX를 HSL로 변환
export const hexToHsl = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // 무채색
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

// HSL을 HEX로 변환
export const hslToHex = (h: number, s: number, l: number): string => {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // 무채색
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// 같은 색상 계열 내에서 다양한 톤 생성 (20개 버전)
export const generateHarmoniousColors = (baseColor: string): string[] => {
  const [h, s, l] = hexToHsl(baseColor);
  const colors = [];

  // 1. 원본 키컬러
  colors.push(baseColor);

  // 2-6. 같은 색조에서 밝기 변화 (매우 어두운 → 매우 밝은)
  for (let i = 0; i < 5; i++) {
    colors.push(hslToHex(
      h,
      Math.max(s - (i * 5), 25),
      Math.max(20 + (i * 15), 15)
    ));
  }

  // 7-11. 채도 변화 (진한 → 탁한)
  for (let i = 0; i < 5; i++) {
    colors.push(hslToHex(
      h,
      Math.max(s - (i * 15), 10),
      l
    ));
  }

  // 12-15. 따뜻한 인접색 (+5도씩)
  for (let i = 1; i <= 4; i++) {
    colors.push(hslToHex(
      (h + (i * 5)) % 360,
      Math.max(s - 5, 35),
      Math.max(l - 5, 25)
    ));
  }

  // 16-19. 차가운 인접색 (-5도씩)  
  for (let i = 1; i <= 4; i++) {
    colors.push(hslToHex(
      (h - (i * 5) + 360) % 360,
      Math.max(s - 10, 30),
      Math.min(l + 5, 80)
    ));
  }

  // 20. 특별한 중간톤 (채도와 밝기 모두 조정)
  colors.push(hslToHex(
    h,
    Math.max(s - 25, 20),
    Math.min(l + 15, 75)
  ));

  return colors;
};
