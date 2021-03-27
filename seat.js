class Seat {
  static getInstance() {
    let seat;
    return () => {
      return seat || new Seat();
    };
  }

  #seatMap = [];
  constructor() {
    // this.#seatMap =
  }
}
console.log(Seat.getInstance(), 'Seat.getInstance()')

module.exports = Seat.getInstance();