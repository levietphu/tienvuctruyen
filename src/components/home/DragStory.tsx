import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const DragStory = ({ data, imageStory }: any) => {
  const [posCurrent, setPosCurrent] = useState(0);

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
  }, [posCurrent]);

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
    if (posFinal > 0) {
      setPosCurrent(0);
    } else if (posFinal < imageStory.length * -200 + 310) {
      setPosCurrent(imageStory.length * -200 + 310);
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
        {data &&
          data.map((item: any) => {
            return (
              <div className="story__slider--item" key={item.id}>
                {item.vip === 1 && <span className="btn__vip">vip</span>}
                {item.full === 1 && <span className="btn__full">full</span>}

                <Link to={`/${item.slug}`}>
                  <div className="image__story">
                    <img
                      src={`${process.env.REACT_APP_UPLOADS}${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <div className="hover__story">
                    <p className="hover__story--name ml-10 mr-15">
                      {item.name.length > 35
                        ? item.name.slice(0, 35) + "...."
                        : item.name}
                    </p>
                    <span className="ml-10 mr-15">
                      {item.nameTheloai ? item.nameTheloai : item.theloais.name}
                    </span>
                    <p className="border-top"></p>
                    <p
                      className="ml-10 mr-15 discount__story"
                      dangerouslySetInnerHTML={{
                        __html: item.discount
                          ? item.discount
                          : "Truyện chưa có giảm giá",
                      }}
                    ></p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DragStory;
