import "../styles/home.scss";
import MainLayout from "../../layout/view/MainLayout";
import GalleryCarousel from "../components/GalleryCarousel";
import Search from "../components/Search";
import DragStory from "../components/DragStory";
import NewUpdateStory from "../components/NewUpdateStory";
import FullStory from "../components/FullStory";
import { useContext, useEffect, useState } from "react";
import PopupFull from "../components/PopupFull";
import DragLoader from "../components/DragLoader";
import { Modal } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [dataHome, setDataHome] = useState<any>();
  const [loaderHome, setLoaderHome] = useState<boolean>(true);
  const [checkPopupHome, setCheckPopupHome] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  const callApi = async () => {
    await axios.get(`${process.env.REACT_APP_API}home`).then((res) => {
      setDataHome(res.data.data.items);
      setLoaderHome(false);
    });
  };

  useEffect(() => {
    callApi();
    document.title = "Truyện dịch online - Đọc truyện dịch mới nhất | Tiên Vực";
  }, []);

  // useEffect(() => {
  //   if (checkPopupHome) {
  //     showModal();
  //   } else {
  //     handleCancel();
  //   }
  // }, [checkPopupHome]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <MainLayout>
        <GalleryCarousel
          loaderHome={loaderHome}
          banners={dataHome?.banners}
          notifications={dataHome?.notifications}
        />
        <Search />
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Truyện đề cử</h1>
          {!loaderHome && dataHome.recommendedStory ? (
            <DragStory data={dataHome.recommendedStory} />
          ) : (
            <DragLoader />
          )}
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Truyện yêu thích mỗi tuần</h1>
          {!loaderHome ? (
            <DragStory data={dataHome.truyenhot_sort_week} />
          ) : (
            <DragLoader />
          )}
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Bảng xếp hạng truyện vip</h1>
          {!loaderHome ? (
            <DragStory data={dataHome.rankVip} vip={1} />
          ) : (
            <DragLoader />
          )}
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Truyện hot mới ra lò</h1>
          {!loaderHome ? (
            <DragStory data={dataHome.hotStory} />
          ) : (
            <DragLoader />
          )}
        </div>
        <div className="main__content">
          <div className="story__newupdate">
            <Link
              className="a-h1"
              to="/danh-sach/truyen-moi"
              style={{ margin: "0.67em 0" }}
            >
              Truyện mới cập nhật
            </Link>
            <NewUpdateStory data={dataHome && dataHome.newUpdateStory} />
          </div>
          <div className="story__full">
            <Link
              className="a-h1"
              to="/danh-sach/truyen-full"
              style={{ margin: "0.67em 0" }}
            >
              Truyện đã full
            </Link>
            <FullStory data={dataHome && dataHome.fullStory} />
          </div>
        </div>
      </MainLayout>{" "}
      {/* <Modal open={open} onOk={handleOk} onCancel={handleCancel}>
        <PopupFull setCheckPopupHome={setCheckPopupHome} />
      </Modal> */}
    </>
  );
};

export default HomePage;
