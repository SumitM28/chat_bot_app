import axios from "axios";

const BASE_URL = "https://chat-bot-api-2zoh.onrender.com/palm"; //Replace with System PC IP address

const getBardApi = (userMsg) => axios.get(BASE_URL + "?ques=" + userMsg);

export default {
  getBardApi,
};
