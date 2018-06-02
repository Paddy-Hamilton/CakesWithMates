const CAKES_BASE_URL = require("../constants");
const axios = require("axios");
const goodRespons = status =>
  status === 200 || status === 201 || status === 202 || status === 204;
const Mutation = {
  addCake(parent, args, ctx, info) {
    console.log({ args });
    return axios({
      method: "POST",
      url: `${CAKES_BASE_URL}`,
      data: {
        ...args
      }
    })
      .then(res => {
        console.log(res.status);
        console.log(res.data);
        if (goodRespons(res.status)) {
          return res.data;
        } else {
          return "Engine error", res.status;
        }
      })
      .catch(err => {
        console.error("catch error", err);
        return err;
      });
  },
  editCake(parent, { id, ...data }, ctx, info) {
    return axios({
      method: "PUT",
      url: `${CAKES_BASE_URL}/${id}`,
      data: {
        ...data
      }
    })
      .then(res => {
        console.log(res.status);
        console.log(res.data);
        if (goodRespons(res.status)) {
          return res.data;
        } else {
          return "Engine error", res.status;
        }
      })
      .catch(err => {
        console.error("catch error", err);
      });
  },

  deleteCake(parent, { id }, ctx, info) {
    return axios({
      method: "DELETE",
      url: `${CAKES_BASE_URL}/${id}`
    })
      .then(res => {
        console.log(res.status);
        console.log(res.data);
        if (goodRespons(res.status)) {
          return "Successfully deleted";
        } else {
          return "Engine error", res.status;
        }
      })
      .catch(err => {
        console.error("catch error", err);
      });
  }
};

module.exports = { Mutation };
