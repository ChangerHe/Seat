const inquirer = require("inquirer");

// 选择区域
const whichArea = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "area",
      message: "请选择所要展示的区域",
      choices: [
        { name: "A区", value: "A" },
        { name: "B区", value: "B" },
        { name: "C区", value: "C" },
        { name: "D区", value: "D" },
      ],
      default: "A",
    },
  ]);
  return answers;
};

// 让多少用户进入选票
const howManyUser = async () => {
  const answers = await inquirer.prompt([
    {
      type: "number",
      name: "userNum",
      message: "请输入要进入购票的用户数量(每位用户购买1-5张)",
      default: 10,
    },
  ]);
  return answers;
};

module.exports = {
  whichArea,
  howManyUser,
};
