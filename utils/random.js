const { TOTAL_AREA, BACK_SEAT_NUM, TOTAL_ROW, SINGLE_MAX_TICKET_MUM } = require("../constants");

// 获取随机数, 左闭右闭区间
const random = (start, end) => {
  return start + Math.floor(Math.random() * (end - start + 1));
};

const randomPeople = () => random(1, SINGLE_MAX_TICKET_MUM);

module.exports = {
  random,
  randomPeople,
};
