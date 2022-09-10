import { newUpdateStory } from "../../store";

const BookCase = () => {
  return (
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
  );
};

export default BookCase;
