import MainLayout from "../../layouts/MainLayout";
import "./personal.scss";
import { newUpdateStory } from "../../store";
import imageStory from "../../store";

const PersonalPage = () => {
  return (
    <MainLayout>
      <div className="personal">
        <div className="personal__left">
          <div className="name__person">
            <h3>tieu_nam_phong</h3>
            <p>
              <span className="coin">$</span>
              <span>0 xu</span>
            </p>
          </div>
          <div className="personal__left--list">
            <a className="personal__item active__personal" href="">
              <i className="fa-regular fa-bookmark"></i>
              <span>tủ sách</span>
            </a>
            <a className="personal__item" href="">
              <i className="fa-sharp fa-solid fa-money-bill"></i>
              <span>truyện vip đã mua</span>
            </a>
            <a className="personal__item" href="">
              <i className="fa-solid fa-coins"></i>
              <span>nạp xu</span>
            </a>
          </div>
        </div>
        <div className="personal__right">
          <div className="bookcase">
            <h1>Truyện vip đã mua</h1>
          </div>
          <div className="list__bookcase">
            {newUpdateStory.map((item, index) => {
              if (index < 8) {
                return (
                  <a className="item__bookcase" href="" key={index}>
                    <div className="item">
                      <div className="height__full">
                        <div className="image__bookcase">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="title__book">
                          <p className="name__book">{item.name}</p>
                          <p className="save__chapter">
                            <i>đọc tiếp chương 5</i>{" "}
                          </p>
                        </div>
                        <i className="fa-sharp fa-solid fa-xmark close"></i>
                      </div>
                    </div>
                  </a>
                );
              }
            })}
          </div>
          {/* <div className="drag__story">
            <div className="drag__story--slider">
              {imageStory.map((item: any, index: any) => {
                if (index < 5) {
                  return (
                    <div className="story__slider--item" key={item.id}>
                      <span className="btn__vip">vip</span>
                      <a href="">
                        <div className="image__story">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="hover__story">
                          <p className="hover__story--name ml-10 mr-15">
                            {item.name}
                          </p>
                          <span className="ml-10 mr-15">huyền huyễn</span>
                          <p className="border-top"></p>
                          <p className="ml-10 mr-15 discount__story">
                            Giảm 15% khi mua tối thiếu 500c Khe hở thời không
                            thông tới dị giới, thời đại võ đạo...
                          </p>
                        </div>
                      </a>
                    </div>
                  );
                }
              })}
            </div>
          </div> */}
          {/* <div className="">Tủ sách của bạn</div> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalPage;
