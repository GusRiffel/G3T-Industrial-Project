const { createLogger, format, transports } = require("winston");
const dayjs = require("dayjs");

const logger = createLogger({
  transports: new transports.File({
    filename: `src/logs/zones-${dayjs().format("MMM-DD-YYYY")}.log`,
  }),

  format: format.combine(
    format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    format.json(),
    format.prettyPrint()
  ),
});

module.exports = logger;
