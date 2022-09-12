import { newUpdateStory } from "../../store";
import { Link } from "react-router-dom";

const BookCase = () => {
  return (
    <div className="list__bookcase">
      {newUpdateStory.map((item, index) => {
        if (index < 8) {
          return (
            <Link
              className="item__bookcase"
              to="/dieu-thap-lam-hoang-de"
              key={index}
            >
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
            </Link>
          );
        }
      })}
    </div>
  );
};

export default BookCase;
