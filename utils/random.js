const { TOTAL_AREA, BACK_SEAT_NUM, TOTAL_ROW, SINGLE_MAX_TICKET_MUM } = require("../constants");

// 获取随机数, 左闭右闭区间
const random = (start, end) => {
  return start + Math.floor(Math.random() * (end - start + 1));
};

const randomArea = () => random(0, TOTAL_AREA - 1);

const randomRow = () => random(0, TOTAL_ROW - 1);

const randomSeat = () => {
  const rdmRow = randomRow();
  const emptyNum = TOTAL_ROW - rdmRow;
  return [randomArea(), rdmRow, random(emptyNum, BACK_SEAT_NUM - emptyNum)]
};

const randomPeople = () => random(1, SINGLE_MAX_TICKET_MUM);

module.exports = {
  randomSeat,
  random,
  randomArea,
  randomRow,
  randomPeople,
};
