
const { whichArea, howManyUser } = require( "./questions" );
const logger = require("./utils/logger");

logger.info("empty seats had been generated.");

const main = async () => {
  const area = await whichArea();
  console.log(area, 'area')
  const userNum = await howManyUser();
  console.log(userNum, 'userNum')
}

(async () => {await main()})();
