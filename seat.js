const { TOTAL_AREA, TOTAL_ROW, BACK_SEAT_NUM } = require("./constants");
const logger = require("./utils/logger");
const { randomSeat, randomPeople } = require("./utils/random");
const { AREA_ARR } = require("./constants");

class Seat {
  static getInstance() {
    let seat;
    return () => {
      return seat || (seat = new Seat());
    };
  }

  #seatMap = [];
  constructor() {
    logger.info("empty seats had been generated.");
    this.#seatMap = new Array(TOTAL_AREA).fill([]).map((v, i) => {
      return new Array(TOTAL_ROW).fill([]).map((v, i) => {
        return new Array(BACK_SEAT_NUM).fill(
          0,
          TOTAL_ROW - i - 1,
          BACK_SEAT_NUM - TOTAL_ROW + i + 1
        );
      });
    });
  }

  // 展示对应的区域图
  showMap(area) {
    console.log(this.mapToString(this.#seatMap[area]));
  }

  mapToString(map) {
    return map.reduce((p, v) => {
      return `${p}${v.join("")}\n`;
    }, "");
  }

  // 出票
  outputTicket(rSeat) {
    const curSeatSellable = this.#seatMap[rSeat[0]][rSeat[1]][rSeat[2]];
    if (!curSeatSellable) {
      logger.info(
        `已售出: ${AREA_ARR[rSeat[0]]}区域的 ${rSeat[1] + 1}排, ${
          rSeat[2] + 1
        }号座位`
      );
      this.#seatMap[rSeat[0]][rSeat[1]][rSeat[2]] = 1;
    } else {
      this.reGenSeatByBFS(rSeat);
      // TODO: toggle area
    }
  }

  // 买票, 单次票数量1-5张, 座位尽量安排在一起
  buyTicket(rPeople) {
    if (this.checkAllSoldOut()) {
      logger.info("票已售完");
      return;
    }
    const rSeat = randomSeat();
    for (let i = 0; i < rPeople; i++) {
      this.outputTicket(rSeat);
    }
  }

  // 基于广度优先遍历重新生成座位
  reGenSeatByBFS(rSeat) {
    const rArea = rSeat[0];
    const rPoint = [rSeat[1], rSeat[2]];
    const closestPoints = this.getClosestPoint(rArea, rPoint);
    let isFounded = false;
    if (closestPoints.length) {
      for (let i = 0; i < closestPoints.length; i++) {
        const point = closestPoints[i];
        if (this.forSaleCheck(rArea, point)) {
          this.#seatMap[rArea][point[0]][point[1]] = 1;
          logger.info(
            `已售出: ${AREA_ARR[rArea]}区域的 ${point[0] + 1}排, ${
              point[1] + 1
            }号座位`
          );
          isFounded = true;
          break;
        }
      }
    } else {
      // 当数组为空时, 代表当前点已经越界, 直接返回false即可
      return isFounded;
    }

    // 八次遍历都没有找到待售票, 则针对八个点再进行一次遍历
    if (!isFounded) {
      for (let i = 0; i < closestPoints.length; i++) {
        if (this.reGenSeatByBFS(rArea, closestPoints)) {
          isFounded = true;
          break;
        }
      }
    }
    return isFounded;
  }

  getClosestPoint(area, point) {
    // 如果该点已经超出范畴, 则不再进行广度优先遍历
    if (!this.boundaryCheck(area, point)) return [];
    // 该点的上下左右八个点
    const points = [
      // 左
      [point[0] - 1, point[1]],
      // 右
      [point[0] + 1, point[1]],
      // 上左
      [point[0] - 1, point[1] - 1],
      // 上中
      [point[0], point[1] - 1],
      // 上右
      [point[0] + 1, point[1] - 1],
      // 下左
      [point[0] - 1, point[1] + 1],
      // 下中
      [point[0], point[1] + 1],
      // 下右
      [point[0] + 1, point[1] + 1],
    ];
    return points.filter((v) => this.boundaryCheck(area, point));
  }

  // 边界判断: 超出边界时为false
  boundaryCheck(area, point) {
    let isInBoundary = true;
    try {
      isInBoundary = this.#seatMap[area][point[0]][point[1]] !== undefined;
    } catch (error) {
      isInBoundary = false;
    }
    return isInBoundary;
  }

  // 该票是否在售: 在售为true
  forSaleCheck(area, point) {
    let isForSale = false;
    try {
      isForSale = this.#seatMap[area][point[0]][point[1]] === 0;
    } catch (error) {}
    return isForSale;
  }

  checkAllSoldOut() {
    return this.#seatMap.every((v) => v.every((w) => w.every((x) => x)));
  }
}

module.exports = Seat.getInstance()();
