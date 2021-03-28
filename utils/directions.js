const { TOTAL_ROW, BACK_SEAT_NUM } = require("../constants");

// 方位
const DIRECTIONS = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  topLeft: "topLeft",
  topRight: "topRight",
  bottomLeft: "bottomLeft",
  bottomRight: "bottomRight",
};

const DIRECTIONS_ARR = Object.values(DIRECTIONS);

const excludeDirections = (...excludeArr) => {
  let directionArr = [...DIRECTIONS_ARR];
  excludeArr.forEach((v) => {
    directionArr = directionArr.filter((w) => w === v);
  });
  return directionArr;
};

// 判断点所在的方位并计算点位
const calcPoints = (target, anchor) => {
  let points = DIRECTIONS_ARR;
  const curPoint = [target[1], target[2]];
  const pointsMap = {
    [DIRECTIONS.left]: [curPoint[0] - 1, curPoint[1]],
    [DIRECTIONS.right]: [curPoint[0] + 1, curPoint[1]],
    [DIRECTIONS.topLeft]: [curPoint[0] - 1, curPoint[1] - 1],
    [DIRECTIONS.top]: [curPoint[0], curPoint[1] - 1],
    [DIRECTIONS.topRight]: [curPoint[0] + 1, curPoint[1] - 1],
    [DIRECTIONS.bottomLeft]: [curPoint[0] - 1, curPoint[1] + 1],
    [DIRECTIONS.bottom]: [curPoint[0], curPoint[1] + 1],
    [DIRECTIONS.bottomRight]: [curPoint[0] + 1, curPoint[1] + 1],
  };
  if (!anchor) return points.map((v) => pointsMap[v]);
  const isSameArea = target[0] === anchor[0];
  // 非同区域的, 会从最中间的那个点开始进行查找
  const curAnchor = isSameArea
    ? anchor
    : [target[0], ~~(TOTAL_ROW / 2), ~~(BACK_SEAT_NUM / 2)];
  const xPolar = target[1] - curAnchor[1];
  const yPolar = target[2] - curAnchor[2];
  if (xPolar > 0 && yPolar < 0) {
    points = excludeDirections(
      DIRECTIONS.bottom,
      DIRECTIONS.bottomRight,
      DIRECTIONS.right
    );
  } else if (xPolar < 0 && yPolar < 0) {
    points = excludeDirections(
      DIRECTIONS.top,
      DIRECTIONS.topRight,
      DIRECTIONS.right
    );
  } else if (xPolar < 0 && yPolar > 0) {
    points = excludeDirections(
      DIRECTIONS.top,
      DIRECTIONS.topLeft,
      DIRECTIONS.left
    );
  } else if (xPolar > 0 && yPolar > 0) {
    points = excludeDirections(
      DIRECTIONS.bottom,
      DIRECTIONS.bottomLeft,
      DIRECTIONS.left
    );
  } else if (xPolar > 0 && yPolar === 0) {
    points = excludeDirections(
      DIRECTIONS.topLeft,
      DIRECTIONS.bottomLeft,
      DIRECTIONS.left
    );
  } else if (xPolar < 0 && yPolar === 0) {
    points = excludeDirections(
      DIRECTIONS.topRight,
      DIRECTIONS.bottomRight,
      DIRECTIONS.right
    );
  } else if (xPolar === 0 && yPolar > 0) {
    points = excludeDirections(
      DIRECTIONS.bottomLeft,
      DIRECTIONS.bottom,
      DIRECTIONS.bottomRight
    );
  } else if (xPolar === 0 && yPolar < 0) {
    points = excludeDirections(
      DIRECTIONS.topLeft,
      DIRECTIONS.top,
      DIRECTIONS.topRight
    );
  }
  return points.map((v) => pointsMap[v]);
};

module.exports = {
  DIRECTIONS,
  DIRECTIONS_ARR,
  excludeDirections,
  calcPoints,
};
