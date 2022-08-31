import React from "react";
import { fullStory } from "../../store";

const FullStory = () => {
  return (
    <div className="full-story">
      <div className="full__story--list">
        {fullStory.map((item, index) => {
          return (
            <a href="" className="full__story--item" key={index}>
              <h3 className="name__story">{item.name}</h3>
              <div className="cate__story">
                <p className="cate btn__vip">vip</p>
                <p className="cate btn__full">full</p>
                {item.cate.map((item, index) => {
                  return (
                    <p className="cate" key={index}>
                      {item}
                    </p>
                  );
                })}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FullStory;
