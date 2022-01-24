"use strict";
const axios = require("axios");

const url = "https://cars24-app.vercel.app/api/cars";

module.exports.run = async (event, context) => {
  const response = await axios({
    method: "get",
    url,
  });

  const unbooked = response.data.updated;

  if (unbooked) {
    const lastAdded = response.data.lastAdded;
    const req = await axios({
      method: "post",
      url: "https://maker.ifttt.com/trigger/cars24-1/json/with/key/983C9183G6FWzYkSj2rcA",
      data: {
        car: `${lastAdded.make} ${lastAdded.model} ${lastAdded.year} ${lastAdded.appointmentId}`,
        link: `${response.data.link}`,
      },
    });
    console.log({ req });
  }

  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);
};
