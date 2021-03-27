// 最前排位置数量
const FRONT_SEAT_NUM = 50;
// 最后的位置数量
const BACK_SEAT_NUM = 100;
// 每排座位差异数量(只能为偶数)
const SEAT_STEP_ADD = 2;
// 总排数
const TOTAL_ROW = (BACK_SEAT_NUM - FRONT_SEAT_NUM) / SEAT_STEP_ADD + 1;
// 总区域
const AREA_MAP = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
};
// 总区域数
const TOTAL_AREA = Object.keys(AREA_MAP).length;

module.exports = {
  FRONT_SEAT_NUM,
  BACK_SEAT_NUM,
  SEAT_STEP_ADD,
  TOTAL_ROW,
  TOTAL_AREA,
  AREA_MAP,
};
