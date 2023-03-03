import axios from "axios";

const TOKEN = "cfvtl5pr01qmgsjq84agcfvtl5pr01qmgsjq84b0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
