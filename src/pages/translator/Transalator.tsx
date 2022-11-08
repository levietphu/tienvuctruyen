import DragStory from "../../components/home/DragStory";
import MainLayout from "../../layouts/MainLayout";
import "./translator.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Transalator = () => {
  const [dataTran, setDataTran] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);

  const navigate = useNavigate();
  const params = useParams();

  const callApi = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}translator?slug=${params.slugdichgia}`)
      .then((res) => {
        setDataTran(res.data.data.items);
        setLoader(false);
      });
  };

  useEffect(() => {
    callApi();
  }, [params.slugdichgia]);

  return (
    <MainLayout>
      <div className="translator__header center">
        <div>
          <i className="fa-solid fa-user"></i>
          <div className="translator__name">
            <h1>{params.slugdichgia}</h1>
            <p>@{params.slugdichgia}</p>
          </div>
        </div>
      </div>
      <div className="translator__story">
        <h1>
          Truyện dịch bởi <span>{params.slugdichgia}</span>
        </h1>
        {!loader && <DragStory data={dataTran} />}
      </div>
    </MainLayout>
  );
};

export default Transalator;
