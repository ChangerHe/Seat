const {
  whichArea,
  howManyUser,
  whichQuestion,
  WHICH_QUESTION_OPTIONS,
} = require("./questions");
const { AREA_ARR } = require("./constants");
const logger = require("./utils/logger");
const seat = require("./seat");

logger.info("empty seats had been generated.");

const main = async () => {
  const option = await whichQuestion();
  if (option === WHICH_QUESTION_OPTIONS.buyTicket) {
    const userNum = await howManyUser();
    console.log(userNum, "userNum");
  } else {
    const area = await whichArea();
    logger.info(`当前展示的区域为: ${AREA_ARR[area]} 区`);
    seat.showMap(area);
  }

  main()
};

(async () => {
  await main();
})();
