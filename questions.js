const inquirer = require("inquirer");

// 选择区域
const WHICH_AREA_OPTIONS = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
};
const whichArea = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "area",
      message: "请选择所要展示的区域",
      choices: [
        { name: "A区", value: WHICH_AREA_OPTIONS.A },
        { name: "B区", value: WHICH_AREA_OPTIONS.B },
        { name: "C区", value: WHICH_AREA_OPTIONS.C },
        { name: "D区", value: WHICH_AREA_OPTIONS.D },
      ],
      default: 0,
    },
  ]);
  return answer.area;
};

// 让多少用户进入选票
const howManyUser = async () => {
  const answer = await inquirer.prompt([
    {
      type: "number",
      name: "userNum",
      message: "请输入要进入购票的用户数量(每位用户购买1-5张)",
      default: 10,
    },
  ]);
  return answer.userNum;
};

// 选择问题
const WHICH_QUESTION_OPTIONS = {
  showSeat: 0,
  buyTicket: 1,
};
const whichQuestion = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "question",
      message: "接下来您需要做什么?",
      choices: [
        {
          name: "选择区域显示该区域的座位情况",
          value: WHICH_QUESTION_OPTIONS.showSeat,
        },
        { name: "让用户进来购票", value: WHICH_QUESTION_OPTIONS.buyTicket },
      ],
      default: 0,
    },
  ]);
  return answer.question;
};

module.exports = {
  whichArea,
  howManyUser,
  whichQuestion,
  WHICH_AREA_OPTIONS,
  WHICH_QUESTION_OPTIONS,
};
