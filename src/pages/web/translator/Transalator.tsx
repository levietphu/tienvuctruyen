import DragStory from "../../../components/home/DragStory";
import MainLayout from "../../../layouts/MainLayout";
import "./translator.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Transalator = () => {
  const [dataTran, setDataTran] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);

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

  useEffect(() => {
    if (!loader && params.slugdichgia) {
      document.title = `Truyện dịch bởi ${params.slugdichgia}`;
    }
  }, [loader]);

  return (
    <MainLayout>
      <div className="center">
        <div className="translator__header center">
          <div>
            <div className="center">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="translator__name">
              <h1>{params.slugdichgia}</h1>
              <p>@{params.slugdichgia}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="translator__story">
        <h1>
          Truyện dịch bởi <span>{params.slugdichgia}</span>
        </h1>
        <div className="drag__story">
          <div className="drag__story--slider">
            {dataTran &&
              dataTran.map((item: any) => {
                return (
                  <div className="story__slider--item" key={item.id}>
                    <Link to={`/${item.slug}`}>
                      <div className="pin">
                        {item.vip === 1 && (
                          <span className="btn__vip">vip</span>
                        )}
                        {item.full === 1 && (
                          <span className="btn__full">full</span>
                        )}
                      </div>
                      <div className="image__story">
                        <img
                          src={`${process.env.REACT_APP_UPLOADS}${item.image}`}
                          alt={item.name}
                        />
                      </div>
                      <div className="hover__story">
                        <p className="hover__story--name ml-10 mr-15">
                          {item.name.length > 35
                            ? item.name.slice(0, 35) + "...."
                            : item.name}
                        </p>
                        <span className="ml-10 mr-15">
                          {item.nameTheloai
                            ? item.nameTheloai
                            : item.theloais.name}
                        </span>
                        <p className="border-top"></p>
                        <p
                          className="ml-10 mr-15 discount__story"
                          dangerouslySetInnerHTML={{
                            __html: item.discount
                              ? item.discount
                              : "Truyện chưa có giảm giá",
                          }}
                        ></p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transalator;
