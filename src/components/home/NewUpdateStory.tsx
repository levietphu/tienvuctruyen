import React from "react";
import image1 from "../../assets/dtl-hoang-de.jpeg";
import { newUpdateStory } from "../../store";

const NewUpdateStory = () => {
  return (
    <div className="list__story--newupdate">
      {newUpdateStory.map((item, index) => {
        return (
          <div className="item__story--newupdate" key={index}>
            <div className="image__story mr-10">
              <img src={item.image} alt="" />
            </div>
            <div className="story__newupdate--right">
              <div className="name__story mr-10">
                <a className="mr-5" href="">
                  <span>{item.name}</span>
                </a>
                <span className="cate btn__vip">vip</span>
                <p>{item.author}</p>
              </div>
              <div className="cate__story mr-10">
                {item.cate.map((item, index) => {
                  return (
                    <a href="" key={index}>
                      {item}
                    </a>
                  );
                })}
              </div>
              <div className="chapter__story">
                <a>
                  <strong>{item.number_chapter}</strong>.{" "}
                  <span>{item.name_chapter}</span>
                </a>
                <p>{item.time_update}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewUpdateStory;
