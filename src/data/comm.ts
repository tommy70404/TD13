// select options
export const venderOptions = [
  { label: '光和', value: 'A' },
  { label: '友和', value: 'B' },
  { label: '三和', value: 'C' },
  { label: '東京', value: 'D' },
];


// radio options
export const materialOptions = [{ label: '正常' }, { label: '破碎' }, { label: '倒塌' }, { label: '熔蝕' }];

export const repairReasonOptions = [{ label: '正常下線' }, { label: '崩落' }, { label: '熔損' }];

export const repairTypeOptions = [
  { label: '小修' },
  { label: '中修' },
  { label: '大修' },
  { label: '全修' },
  { label: '其他' },
];

export const paintOptions = [{ label: '塗附' }, { label: '半噴' }, { label: '全噴' }];

export const userOptions = [
  { label: '王大明', value: '王大明' },
  { label: '孫小美', value: '孫小美' },
  { label: '李大正', value: '李大正' },
  { label: '陳小春', value: '陳小春' },
];

export const spoutOptions = [{ label: '單片式' }, { label: '砌磚式' }];

export const newOldOptions = [{ label: '新品' }, { label: '回收品' }];

export const TdOptions = itemCreator(1, 41);

function itemCreator(from: number, to: number) {
  // if (to && from) {
  const rangeCount = to - from + 1;
  return Array(rangeCount)
    .fill('')
    .map((e, i) => {
      const order = from + i > 9 ? `${from + i}` : `0${from + i}`;
      return { label: order, value: order };
    });
}
