const {
  whichArea,
  howManyUser,
  whichQuestion,
  WHICH_QUESTION_OPTIONS,
} = require("./questions");
const { AREA_ARR } = require("./constants");
const logger = require("./utils/logger");
const { randomPeople } = require("./utils/random");
const seat = require("./seat");

let totalUser = 0;

const main = async () => {
  const option = await whichQuestion();
  if (option === WHICH_QUESTION_OPTIONS.buyTicket) {
    const userNum = await howManyUser();
    for (let i = 0; i < userNum; i++) {
      const rPeople = randomPeople();
      logger.info(
        `第${totalUser + i + 1}位用户开始购票, 本次要买${rPeople}张票`
      );
      seat.buyTicket(rPeople);
    }
    totalUser += userNum;
  } else {
    const area = await whichArea();
    logger.info(`当前展示的区域为: ${AREA_ARR[area]} 区`);
    seat.showMap(area);
  }

  main();
};

(async () => {
  await main();
})();
