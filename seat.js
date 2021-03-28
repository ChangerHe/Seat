const { TOTAL_AREA, TOTAL_ROW, BACK_SEAT_NUM } = require("./constants");
const logger = require("./utils/logger");
const { randomSeat, randomPeople } = require("./utils/random");
const {
  DIRECTIONS,
  DIRECTIONS_ARR,
  excludeDirections,
  calcPoints,
} = require("./utils/directions");
const { AREA_ARR } = require("./constants");

class Seat {
  static getInstance() {
    let seat;
    return () => {
      return seat || (seat = new Seat());
    };
  }

  #seatMap = [];
  #sellingArea = [0, 1, 2, 3];
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
  outputTicket(rSeat, num) {
    let lastNum = num;
    const curSeatSellable = this.#seatMap[rSeat[0]][rSeat[1]][rSeat[2]];
    if (!curSeatSellable) {
      logger.info(
        `已售出: ${AREA_ARR[rSeat[0]]}区域的 ${rSeat[1] + 1}排, ${
          rSeat[2] + 1
        }号座位`
      );
      this.#seatMap[rSeat[0]][rSeat[1]][rSeat[2]] = 1;
      lastNum--;
    }
    if (lastNum > 0) {
      if (!this.reGenSeatByBFS(rSeat, rSeat, lastNum)) {
        this.#sellingArea = this.#sellingArea.filter((v) => v !== rSeat[0]);
        if (this.#sellingArea.length) {
          this.outputTicket([
            this.#sellingArea[0],
            ~~(TOTAL_ROW / 2),
            ~~(BACK_SEAT_NUM / 2),
          ]);
        } else {
          logger.info("票已售完");
        }
      }
    }
  }
  // 买票, 单次票数量1-5张, 座位尽量安排在一起
  buyTicket(rPeople) {
    if (this.checkAllSoldOut()) {
      logger.info("票已售完");
      return;
    }
    const rSeat = randomSeat();
    this.outputTicket(rSeat, rPeople);
  }

  // 基于广度优先遍历重新生成座位
  reGenSeatByBFS(seat, anchor, num) {
    let lastNum = num;
    const area = seat[0];
    const point = [seat[1], seat[2]];
    // 获取当前点位最邻近的待售票
    const closestPoints = this.getClosestPoint(seat, anchor);
    // 是否最终找到待售票
    let isFounded = false;
    if (closestPoints.length) {
      // 遍历周边点位
      loop: for (let i = 0; i < closestPoints.length; i++) {
        const p = closestPoints[i];
        // 查看该点位是否处于待售状态
        if (this.forSaleCheck(area, p)) {
          // 如果是, 则出售该点位的票
          this.#seatMap[area][p[0]][p[1]] = 1;
          lastNum--;
          logger.info(
            `已售出: ${AREA_ARR[area]}区域的 ${p[0] + 1}排, ${
              p[1] + 1 - TOTAL_ROW + p[0]
            }号座位`
          );
          if (lastNum === 0) {
            // 将当前轮次是否已经出票的状态置为true, 终止循环
            isFounded = true;
            break loop;
          }
        }
      }
    } else {
      // 当数组为空时, 代表当前点已经越界, 直接返回false即可
      return isFounded;
    }
    // N次遍历都没有找到待售票, 则针对八个点再进行一次遍历
    if (!isFounded) {
      loop: for (let i = 0; i < closestPoints.length; i++) {
        const p = closestPoints[i];
        if (this.reGenSeatByBFS([area, p[0], p[1]], [area, p[0], p[1]], lastNum)) {
          isFounded = true;
          break loop;
        }
      }
    }
    return isFounded;
  }

  getClosestPoint(seat, anchor) {
    const area = seat[0];
    const point = [seat[1], seat[2]];
    // 如果该点已经超出范畴, 则不再进行广度优先遍历
    if (!this.boundaryCheck(seat)) return [];
    const points = calcPoints(seat, anchor);
    return points.filter((v) => this.boundaryCheck([area, v[0], v[1]]));
  }

  // getClosestPoint(seat, anchor) {
  //   // 如果该点已经超出范畴, 则不再进行广度优先遍历
  //   if (!this.boundaryCheck(seat)) return [];
  //   const area = seat[0];
  //   const point = [seat[1], seat[2]];
  //   // 该点的上下左右八个点
  //   const points = [
  //     // 左
  //     [point[0] - 1, point[1]],
  //     // 右
  //     [point[0] + 1, point[1]],
  //     // 上左
  //     [point[0] - 1, point[1] - 1],
  //     // 上中
  //     [point[0], point[1] - 1],
  //     // 上右
  //     [point[0] + 1, point[1] - 1],
  //     // 下左
  //     [point[0] - 1, point[1] + 1],
  //     // 下中
  //     [point[0], point[1] + 1],
  //     // 下右
  //     [point[0] + 1, point[1] + 1],
  //   ];
  //   return points.filter((v) => this.boundaryCheck([area, v[0], v[1]]));
  // }

  // 边界判断: 超出边界时为false
  boundaryCheck(seat) {
    let isInBoundary = true;
    try {
      isInBoundary = this.#seatMap[seat[0]][seat[1]][seat[2]] !== undefined;
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
    // return this.#seatMap.every((v) => v.every((w) => w.every((x) => x)));
    return this.#sellingArea.length === 0;
  }
}

module.exports = Seat.getInstance()();
