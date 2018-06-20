interface RGB {
  red: number;
  green: number;
  blue: number;
}
interface HSL {
  hue: number;
  saturation: number;
  lightness: number;
}

class Color {
  value: string;
  rgb: RGB;
  hsl: HSL;
  constructor(value) {
    value = value.toUpperCase();
    if (value.length < 3 || value.length > 7) {
      throw new Error('颜色输入有误');
    }
    if (value.length % 3 === 0) {
      value = '#' + value;
    }
    if (value.length === 4) {
      value = '#' + value.substr(1, 1) + value.substr(1, 1) +
        value.substr(2, 1) + value.sbstr(2, 1) +
        value.substr(3, 1) + value.substr(3, 1);
    }
    this.value = value;
    this.toRgb();
    this.toHsl();
  }
  getName() {
    const {red, green, blue} = this.rgb;
    const {hue, saturation, lightness} = this.hsl;
    let ndf1 = 0, ndf2 = 0, ndf = 0;
    let cl = -1, df = -1;
    let colorName;
    let i = 0;

    for (i; i < CnColors.length; i++) {
      const c = CnColors[i];
      if (this.value === c.value) {
        colorName = c.name;
        break;
      }
      ndf1 = Math.pow(red - c.rgb.red, 2) + Math.pow(green - c.rgb.green, 2) + Math.pow(blue - c.rgb.blue, 2);
      ndf2 = Math.pow(hue - c.hsl.hue, 2) + Math.pow(saturation - c.hsl.saturation, 2) + Math.pow(lightness - c.hsl.lightness, 2);
      ndf = ndf1 + ndf2 * 2;
      if (df < 0 || df > ndf) {
        df = ndf;
        cl = i;
      }
    }
    if (!colorName && cl >= 0) {
      colorName = CnColors[cl].name;
    }
    return colorName;
  }
  private toRgb() {
    this.rgb = {
      red: parseInt(this.value.substring(1, 3), 16),
      green: parseInt(this.value.substring(3, 5), 16),
      blue: parseInt(this.value.substring(5, 6), 16)
    };
  }
  private toHsl() {
    let {red, green, blue} = this.rgb;
    let min, max, delta, h, s, l;

    red = red / 255;
    green = green / 255;
    blue = blue / 255;
    min = Math.min(red, green, blue);
    max = Math.max(red, green, blue);
    delta = max - min;
    l = (min + max) / 2;  // 计算明度

    // 计算饱和度
    s = 0;
    if (l > 0 && l < 1) {
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
    }

    // 计算色调
    h = 0;
    if (delta > 0) {
      if (max === red && max !== green) {
        h = (green - blue) / delta;
      } else if (max === green && max !== blue) {
        h = (2 + (blue - red) / delta);
      } else if (max === blue && max !== red) {
        h = (4 + (red - green) / delta);
      }
      h /= 6;
    }
    this.hsl = {
      hue: h * 255,
      saturation: s * 255,
      lightness: l * 255
    };
  }
}
class CnColor extends Color {
  name: string;
  constructor(value, name) {
    super(value);
    this.name = name;
  }
}
const CnColors = [
  new CnColor('#ffffff', '精白'),
  new CnColor('#fffdf0', '象牙白'),
  new CnColor('#fffdf0', '樱草色'),
  new CnColor('#fdeee7', '鱼肚白'),
  new CnColor('#f3f8f2', '荼白'),
  new CnColor('#f3eddd', '缟'),
  new CnColor('#f2fefc', '雪白'),
  new CnColor('#e9f0f6', '霜色'),
  new CnColor('#dfeee7', '鸭卵青'),
  new CnColor('#d9eef1', '月白'),
  new CnColor('#d4f2e8', '水绿'),
  new CnColor('#c1ecd9', '青白'),
  new CnColor('#a3e2c5', '艾绿'),
  new CnColor('#fff244', '鹅黄'),
  new CnColor('#bbe672', '松花色'),
  new CnColor('#c9dd23', '柳黄'),
  new CnColor('#bede25', '嫩绿'),
  new CnColor('#b0dd22', '柳绿'),
  new CnColor('#9fdb01', '葱绿'),
  new CnColor('#9ed148', '豆绿'),
  new CnColor('#00e179', '青翠'),
  new CnColor('#43de5c', '草绿'),
  new CnColor('#00e500', '绿色'),
  new CnColor('#00bb14', '油绿'),
  new CnColor('#0eb83b', '葱青'),
  new CnColor('#09a343', '青葱'),
  new CnColor('#0e8819', '绿沈'),
  new CnColor('#08784a', '松花绿'),
  new CnColor('#7acfa6', '石青'),
  new CnColor('#70f2ff', '蔚蓝'),
  new CnColor('#30dff4', '湖蓝'),
  new CnColor('#3eecea', '碧蓝'),
  new CnColor('#26f9cc', '湖绿'),
  new CnColor('#01e2a0', '青色'),
  new CnColor('#1dd2a7', '碧色'),
  new CnColor('#01e2a0', '青色'),
  new CnColor('#49c0a4', '青碧'),
  new CnColor('#22a675', '松柏绿'),
  new CnColor('#789262', '竹青'),
  new CnColor('#89aca6', '水色'),
  new CnColor('#549688', '铜绿'),
  new CnColor('#436566', '黛绿'),
  new CnColor('#42565f', '黯'),
  new CnColor('#faff71', '鸭黄'),
  new CnColor('#ffc774', '薑黄'),
  new CnColor('#f0c239', '缃色'),
  new CnColor('#f2be46', '赤金'),
  new CnColor('#e39b46', '黄櫨'),
  new CnColor('#ffa630', '杏黄'),
  new CnColor('#ffa401', '橙黄'),
  new CnColor('#ff8c31', '杏红'),
  new CnColor('#fb8b35', '橙色'),
  new CnColor('#ff7701', '橘红'),
  new CnColor('#fe7733', '橘黄'),
  new CnColor('#fe4d21', '丹'),
  new CnColor('#f45336', '彤'),
  new CnColor('#ff4c02', '朱红'),
  new CnColor('#ff3300', '炎'),
  new CnColor('#ff2021', '大红'),
  new CnColor('#f20c00', '石榴红'),
  new CnColor('#dd3022', '酡红'),
  new CnColor('#ffb4a7', '粉红'),
  new CnColor('#ef7a82', '嫣红'),
  new CnColor('#db5a6e', '海棠红'),
  new CnColor('#aa8278', '绾'),
  new CnColor('#b36d63', '檀'),
  new CnColor('#b35d44', '茶色'),
  new CnColor('#9c5235', '赭'),
  new CnColor('#cc3b58', '茜色'),
  new CnColor('#8c4357', '绛紫'),
  new CnColor('#ed5736', '妃色'),
  new CnColor('#f15654', '银红'),
  new CnColor('#fe2c51', '火红'),
  new CnColor('#c32136', '枣红'),
  new CnColor('#c3272b', '赤'),
  new CnColor('#c3272b', '绯红'),
  new CnColor('#be002e', '殷红'),
  new CnColor('#9e2932', '胭脂'),
  new CnColor('#61281f', '栗色'),
  new CnColor('#4e211b', '紫檀'),
  new CnColor('#f99070', '酡颜'),
  new CnColor('#f00057', '品红'),
  new CnColor('#fe0097', '洋红'),
  new CnColor('#f3d3e8', '水红'),
  new CnColor('#ecd1d8', '藕色'),
  new CnColor('#b1a5e3', '雪青'),
  new CnColor('#cca4e3', '丁香'),
  new CnColor('#805463', '紫酱'),
  new CnColor('#805463', '酱紫'),
  new CnColor('#8e4bbc', '紫色'),
  new CnColor('#811eaf', '青莲'),
  new CnColor('#590050', '紫棠'),
  new CnColor('#6b6883', '黝'),
  new CnColor('#735d83', '乌色'),
  new CnColor('#574165', '黛紫'),
  new CnColor('#494168', '黛'),
  new CnColor('#3a2e42', '乌黑'),
  new CnColor('#415065', '黛蓝'),
  new CnColor('#424b50', '鸭青'),
  new CnColor('#76888c', '苍色'),
  new CnColor('#bdccc5', '蟹壳青'),
  new CnColor('#70f2ff', '蔚蓝'),
  new CnColor('#3eecea', '碧蓝'),
  new CnColor('#30dff4', '湖蓝'),
  new CnColor('#44cef5', '蓝'),
  new CnColor('#4d8db0', '群青'),
  new CnColor('#187db1', '靛青'),
  new CnColor('#4b5cc4', '宝蓝'),
  new CnColor('#07527a', '靛蓝'),
  new CnColor('#2e4e7d', '藏青'),
  new CnColor('#3b2e7e', '藏蓝'),
  new CnColor('#003372', '绀青'),
  new CnColor('#748a98', '墨灰'),
  new CnColor('#a1afc9', '蓝灰'),
  new CnColor('#f0deb0', '牙色'),
  new CnColor('#d2b17c', '枯黄'),
  new CnColor('#d9b614', '秋香色'),
  new CnColor('#c89a42', '昏黄'),
  new CnColor('#a88464', '驼色'),
  new CnColor('#ae7001', '棕黄'),
  new CnColor('#ca6924', '琥珀'),
  new CnColor('#b35c26', '棕色'),
  new CnColor('#9b4400', '棕红'),
  new CnColor('#76664d', '黎'),
  new CnColor('#8a6c3a', '秋色'),
  new CnColor('#837101', '棕绿'),
  new CnColor('#7c4b00', '棕黑'),
  new CnColor('#6f511f', '褐色'),
  new CnColor('#5d503d', '黧'),
  new CnColor('#4a3031', '淄色'),
  new CnColor('#808080', '灰色'),
  new CnColor('#50606d', '墨色'),
  new CnColor('#3d3b50', '玄青'),
  new CnColor('#171925', '漆黑'),
  new CnColor('#000000', '黑色')
];
