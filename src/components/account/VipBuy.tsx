import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { useContext } from "react";
import image from "../../assets/mascot-02.235fd60.png";

const VipBuy = () => {
  const { user }: any = useContext(AuthContext);
  return (
    <div className="drag__story">
      <div className="drag__story--slider">
        {user.vipbuy.length !== 0 ? (
          user.vipbuy.map((item: any, index: any) => {
            return (
              <div className="story__slider--item center" key={item.id}>
                <div className="ghim">
                  {item.truyen.vip === 1 && (
                    <span className="btn__vip">vip</span>
                  )}
                  {item.truyen.full === 1 && (
                    <span className="btn__full">full</span>
                  )}
                </div>

                <Link to={`/${item.truyen.slug}`}>
                  <div className="image__story">
                    <img
                      src={`${process.env.REACT_APP_UPLOADS}${item.truyen.image}`}
                      alt=""
                    />
                  </div>
                  <div className="hover__story">
                    <p className="hover__story--name ml-10 mr-15">
                      {item.truyen.name}
                    </p>
                    <span className="ml-10 mr-15">
                      {item.truyen.nameTheloai}
                    </span>
                    <p className="border-top"></p>
                    <p
                      className="ml-10 mr-15 discount__story"
                      dangerouslySetInnerHTML={{
                        __html: item.truyen.discount
                          ? item.truyen.discount
                          : "Truyện chưa có giảm giá",
                      }}
                    ></p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="no-view">
            <div>
              <img src={image} alt="" />
              <h4 className="center">Hiện chưa có truyện nào</h4>
              <p className="center">Bạn hãy quay lại sau nhé!</p>
              <span className="center">
                <Link to="/">Về trang chủ</Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VipBuy;
