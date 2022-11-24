import { createContext, useState, useEffect } from "react";
import { AppContextInterface } from "./SettingContextProvider";
import axios from "axios";

export const HomeContext = createContext<AppContextInterface | null>(null);

const HomeContextProvider = ({ children }: any) => {
  const [dataHome, setDataHome] = useState<any>();
  const [keyword, setKeyword] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<any>();
  const [loaderHome, setLoaderHome] = useState<boolean>(false);

  const callApi = async () => {
    await axios.get(`${process.env.REACT_APP_API}home`).then((res) => {
      setDataHome(res.data.data.items);
      setLoaderHome(true);
      window.scrollTo(0, 0);
    });
  };

  const search = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}search?keyword=${keyword}`)
      .then((res) => {
        setDataSearch(res.data.data.items);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (keyword && keyword.length > 2) {
      search();
    }
  }, [keyword]);

  const data: any = {
    dataHome,
    setKeyword,
    keyword,
    dataSearch,
    loaderHome,
  };

  return <HomeContext.Provider value={data}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
