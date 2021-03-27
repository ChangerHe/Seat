const { randomSeat, random, randomArea, randomRow } = require("./random");
const { TOTAL_AREA, TOTAL_ROW, BACK_SEAT_NUM } = require("../constants");

describe("check random max limiting case", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.999999999);
  });
  it("max", () => {
    expect(random(0, 1)).toEqual(1);
    expect(random(5, 10)).toEqual(10);
    expect(randomArea()).toEqual(TOTAL_AREA - 1);
    expect(randomRow()).toEqual(TOTAL_ROW - 1);
    expect(randomSeat()).toEqual({ area: TOTAL_AREA - 1, seat: [ TOTAL_ROW - 1, BACK_SEAT_NUM - 1 ] });
  });
  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });
});

describe("check random min limiting case", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
  });
  it("min", () => {
    expect(random(0, 1)).toEqual(0);
    expect(random(5, 10)).toEqual(5);
    expect(randomArea()).toEqual(0);
    expect(randomRow()).toEqual(0);
    expect(randomSeat()).toEqual({ area: 0, seat: [ 0, 25 ] });
  });
  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });
});
