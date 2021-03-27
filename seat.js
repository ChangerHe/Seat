const { TOTAL_AREA, TOTAL_ROW, BACK_SEAT_NUM } = require("./constants");

class Seat {
  static getInstance() {
    let seat;
    return () => {
      return seat || new Seat();
    };
  }

  #seatMap = [];
  constructor() {
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

  showMap(area) {
    return this.mapToString(this.#seatMap[area]);
  }

  mapToString(map) {
    return map.reduce((p, v) => {
      return `${p}${v.join('')}\n`
    }, '')
  }
}

module.exports = Seat.getInstance()();
