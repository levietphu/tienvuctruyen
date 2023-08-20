import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";

const ViewDashboard = () => {
  const [data, setData] = useState<any>();

  const { user }: any = useContext(AuthContext);

  const getApiDashboard = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API}cms/dashboard`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setData(res.data.dashboard);
    });
  };

  useEffect(() => {
    getApiDashboard();
  }, []);

  return (
    <div>
      {data &&
        data.transaction.map((item: any, index: number) => {
          if (item.bank_info.id_user === user.user.id) {
            return <p>{item.transaction_code}</p>;
          }
        })}
    </div>
  );
};

export default ViewDashboard;
