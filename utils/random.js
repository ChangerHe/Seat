// 获取随机数, 左闭右闭区间
const random = (start, end) => {
  return start + Math.floor(Math.random() * (end - start + 1));
};

module.exports = {
  random,
};
