import imageStory from "../../store";

const VipBuy = () => {
  return (
    <div className="drag__story">
      <div className="drag__story--slider">
        {imageStory.map((item: any, index: any) => {
          if (index < 6) {
            return (
              <div className="story__slider--item center" key={item.id}>
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
                      Giảm 15% khi mua tối thiếu 500c Khe hở ...
                    </p>
                  </div>
                </a>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default VipBuy;
