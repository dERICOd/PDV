const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Sao_Paulo");

const currentTime = dayjs().toDate();

const afterDate = async (after) => {
  const request = await dayjs().isAfter(dayjs.unix(after));
  return request;
};

module.exports = {
  currentTime,
  afterDate,
};
