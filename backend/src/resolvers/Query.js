const CAKES_BASE_URL = require("../constants");
const axios = require("axios");

const Query = {
  cake(parent, { id }, ctx, info) {
    return axios({
      method: "GET",
      url: `${CAKES_BASE_URL}/${id}`,
      json: true
    })
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          return "Engine error", res.status;
        }
      })
      .catch(err => {
        console.error("catch error", err);
      });
  },
  getCakes(parent, { skip, first }, ctx, info) {
    console.log("Get cakes");
    return axios({
      method: "GET",
      url: `${CAKES_BASE_URL}`,
      json: true
    })
      .then(res => {
        if (res.status === 200) {
          return {
            cakes: first ? res.data.slice(skip, skip + first) : res.data,
            count: res.data.length
          };
        } else {
          return "Engine error", res.status;
        }
      })
      .catch(err => {
        console.error("catch error", err);
      });
  }
};

module.exports = { Query };
