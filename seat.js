const { TOTAL_AREA, TOTAL_ROW, BACK_SEAT_NUM } = require("./constants");
const logger = require("./utils/logger");
const { random } = require("./utils/random");
const { AREA_ARR } = require("./constants");

class Seat {
  static getInstance() {
    let seat;
    return () => {
      return seat || (seat = new Seat());
    };
  }

  #seatMap = [];
  #unsoldSeat = [];
  constructor() {
    logger.info("empty seats had been generated.");
    this.#seatMap = new Array(TOTAL_AREA).fill([]).map((v, i) => {
      return new Array(TOTAL_ROW).fill([]).map((v, i) => {
        return new Array(BACK_SEAT_NUM)
          .fill(0, TOTAL_ROW - i - 1, BACK_SEAT_NUM - TOTAL_ROW + i + 1)
          .fill(" ", 0, TOTAL_ROW - i - 1)
          .fill(" ", BACK_SEAT_NUM - TOTAL_ROW + i + 1, BACK_SEAT_NUM);
      });
    });
    this.#seatMap.forEach((v, i) =>
      v.forEach((w, j) =>
        w.forEach((x, k) => {
          if (x !== " ") {
            this.#unsoldSeat.push(`${i},${j},${k}`);
          } else {
            return null;
          }
        })
      )
    );
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
  outputTicket(num) {
    const randomPos = random(0, this.#unsoldSeat.length - num);
    const soldTicket = this.#unsoldSeat.splice(randomPos, num);
    soldTicket.forEach((t) => {
      const [area, row, column] = t.split(",");
      logger.info(
        `已售出: ${AREA_ARR[area]}区域的 ${row + 1}排, ${
          column + 1 - TOTAL_ROW + row
        }号座位`
      );
      this.#seatMap[area][row][column] = 1;
    });
  }
  // 买票, 单次票数量1-5张, 座位尽量安排在一起
  buyTicket(num) {
    if (this.checkAllSoldOut()) {
      logger.error("票已售完");
      return;
    }
    this.outputTicket(num);
  }

  checkAllSoldOut() {
    return this.#unsoldSeat.length === 0;
  }
}

module.exports = Seat.getInstance()();
