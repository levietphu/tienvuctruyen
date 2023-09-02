import axios from "axios";

export const getUser = async (token: string | undefined) => {
  return await axios.get(`${process.env.REACT_APP_API}getUser?token=${token}`);
};
