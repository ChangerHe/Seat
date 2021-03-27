class Log {
  static info(message) {
    console.log("\x1b[33m%s\x1b[0m", `[INFO]: ${message}`);
  }

  static error(message) {
    console.log("\x1b[31m", `[ERROR]: ${message}`);
  }
}

module.exports = Log;
