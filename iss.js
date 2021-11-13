const request = require("request");

const fetchMyIP = (callback) => {
  let url = "https://api.ipify.org?format=json";
  request(url, (error, response, body) => {
    if (error) {
      return callback(error);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ipObj = JSON.parse(body);
    let ipAddress = ipObj.ip;
    callback(null, ipAddress);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`It didn't work! Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, {latitude, longitude});
  })
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const times = JSON.parse(body).response;
    callback(null, times); 
});
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);  
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(error, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
