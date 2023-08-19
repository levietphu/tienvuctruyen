import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { useContext } from "react";
import image from "../../../../assets/mascot-02.235fd60.png";
import axios from "axios";

const BookCase = () => {
  const { user, getUser }: any = useContext(AuthContext);

  const deleteBookMark = async (id_story: number) => {
    await axios
      .post(`${process.env.REACT_APP_API}remove_bookmark`, {
        id_story: id_story,
      })
      .then((res) => {
        getUser();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="list__bookcase">
      {Object.entries(user.bookcase).length !== 0 ? (
        Object.entries(user.bookcase).map((item: any, index: any) => {
          return (
            <div className="item__bookcase" key={index}>
              <div className="item">
                <div className="height__full">
                  <div className="image__bookcase">
                    <Link to={`/${item[1].truyen.slug}`}>
                      <img
                        src={`${process.env.REACT_APP_UPLOADS}${item[1].truyen.image}`}
                        alt="webtruyen"
                      />
                    </Link>
                  </div>
                  <div className="title__book">
                    <Link to={`/${item[1].truyen.slug}`} className="name__book">
                      {item[1].truyen.name}
                    </Link>
                    <Link
                      to={`/${item[1].truyen.slug}/${item[1].chuong.slug}`}
                      className="save__chapter"
                    >
                      <i>đọc tiếp {item[1].chuong.chapter_number}</i>{" "}
                    </Link>
                  </div>
                  <i
                    className="fa-sharp fa-solid fa-xmark close"
                    onClick={() => deleteBookMark(item[1].truyen.id)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-view">
          <div>
            <img src={image} alt="webtruyen" />
            <h4 className="center">Hiện chưa có truyện nào</h4>
            <p className="center">Bạn hãy quay lại sau nhé!</p>
            <span className="center">
              <Link to="/">Về trang chủ</Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCase;
