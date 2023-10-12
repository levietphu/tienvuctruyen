import axios from "axios";

const callApi = async (method: string, data: any, endpoint: string) => {
  return await axios({
    method: method,
    headers: { accept: "application/json" },
    url: `${process.env.REACT_APP_API}${endpoint}`,
    data: data,
  }).catch((err) => console.log(err));
};

export default callApi;
