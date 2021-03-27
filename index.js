const { whichArea, howManyUser } = require("./questions");
const logger = require("./utils/logger");
const seat = require('./seat')

logger.info("empty seats had been generated.");

const main = async () => {
  console.log(seat.showMap(0), 'seat')
  // const area = await whichArea();
  // console.log(area, "area");
  // const userNum = await howManyUser();
  // console.log(userNum, "userNum");
};

(async () => {
  await main();
})();
