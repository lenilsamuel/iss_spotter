const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned ip:", ip);
// });

// fetchCoordsByIP('68.150.74.62', (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(data);
// });

// const myCoords = {latitude: '53.5185', longitude: '-113.6579'};

// fetchISSFlyOverTimes(myCoords, (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(data);

// })

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log("It didn't work!,", error);
  }
  printPassTimes(passTimes);
});
