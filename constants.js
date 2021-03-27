// 最前排位置数量
const FRONT_SEAT_NUM = 50;
// 最后的位置数量
const BACK_SEAT_NUM = 100;
// 每排座位差异数量(只能为偶数)
const SEAT_STEP_ADD = 2;
// 总排数
const TOTAL_ROW = (BACK_SEAT_NUM - FRONT_SEAT_NUM) / SEAT_STEP_ADD + 1;
// 总区域
const AREA_ARR = ['A', 'B', 'C', 'D']
// 总区域数
const TOTAL_AREA = AREA_ARR.length;
// 单次最大购票数量
const SINGLE_MAX_TICKET_MUM = 5;

module.exports = {
  FRONT_SEAT_NUM,
  BACK_SEAT_NUM,
  SEAT_STEP_ADD,
  TOTAL_ROW,
  TOTAL_AREA,
  AREA_ARR,
  SINGLE_MAX_TICKET_MUM,
};
