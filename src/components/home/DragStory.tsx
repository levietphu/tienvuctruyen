import { useEffect, useState, useRef } from "react";
import imageStory from "../../store";

const DragStory = () => {
  const [countSlider, setCountSlider] = useState(0);
  const [posCurrent, setPosCurrent] = useState(0);
  const [postion, setPostion] = useState(0);

  const dragRef = useRef<HTMLDivElement>(null);

  let posX1: any;
  let posX2: any;
  let posInitial: any;
  let posFinal: any;

  useEffect(() => {
    if (dragRef) {
      dragRef.current?.addEventListener("transitionend", () =>
        dragRef.current?.classList.remove("active")
      );
      return () =>
        dragRef.current?.removeEventListener("transitionend", () =>
          dragRef.current?.classList.remove("active")
        );
    }
  }, [countSlider]);

  const moveStory = (params: any) => {
    dragRef.current?.classList.add("active");
    if (params === "next") {
      setCountSlider(countSlider + 1);
      setPosCurrent((countSlider + 1) * posX1);
      setPostion((countSlider + 1) * posX1);
    } else {
      setCountSlider(countSlider - 1);
      setPosCurrent((countSlider - 1) * posX1);
      setPostion((countSlider - 1) * posX1);
    }
  };

  const dragStart = (e: any) => {
    e.preventDefault();
    dragRef.current?.classList.add("active");
    posX1 = e.clientX;
    posInitial = dragRef.current?.offsetLeft;
    document.onmousemove = dragMove;
    document.onmouseup = dragEnd;
  };

  const dragMove = (e: any) => {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
    let posInitial: any = dragRef.current?.offsetLeft;
    setPosCurrent(posInitial - posX2);
  };

  const dragEnd = () => {
    posFinal = dragRef.current?.offsetLeft;
    if (posFinal - postion < -200) {
      moveStory("next");
    } else if (posFinal - postion > 200) {
      moveStory("prev");
    } else {
      setPosCurrent(postion);
    }
    document.onmousemove = null;
    document.onmouseup = null;
  };

  return (
    <div className="drag__story">
      <div
        className="drag__story--slider"
        style={{ left: `${posCurrent}px` }}
        ref={dragRef}
        onMouseDown={dragStart}
      >
        {imageStory.map((item, index) => {
          return (
            <div className="story__slider--item" key={item.id}>
              <span className="btn__vip">vip</span>
              <a href="">
                <div className="image__story">
                  <img src={item.image} alt="" />
                </div>
                <div className="hover__story">
                  <p className="hover__story--name ml-10 mr-15">{item.name}</p>
                  <span className="ml-10 mr-15">huyền huyễn</span>
                  <p className="border-top"></p>
                  <p className="ml-10 mr-15 discount__story">
                    Giảm 15% khi mua tối thiếu 500c Khe hở thời không thông tới
                    dị giới, thời đại võ đạo...
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DragStory;
