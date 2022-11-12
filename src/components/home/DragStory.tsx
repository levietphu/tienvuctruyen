import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

const DragStory = ({ data }: any) => {
  const [posCurrent, setPosCurrent] = useState(0);
  const params = useParams();

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
    e = e || window.event;
    e.type !== "touchstart" && e.preventDefault();
    dragRef.current?.classList.add("active");
    if (e.type === "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmousemove = dragMove;
      document.onmouseup = dragEnd;
    }
    posInitial = dragRef.current?.offsetLeft;
  };

  const dragMove = (e: any) => {
    if (e.type === "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    let posInitial: any = dragRef.current?.offsetLeft;
    setPosCurrent(posInitial - posX2);
  };

  const dragEnd = (e: any) => {
    posFinal = dragRef.current?.offsetLeft;
    if (posFinal > 0) {
      setPosCurrent(0);
    } else if (posFinal < data.length * -200 + 310) {
      setPosCurrent(data.length * -200 + 310);
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
        onMouseDown={(e) => !params.slugdichgia && dragStart(e)}
        onTouchStart={(e) => !params.slugdichgia && dragStart(e)}
        onTouchMove={(e) => !params.slugdichgia && dragMove(e)}
        onTouchEnd={(e) => !params.slugdichgia && dragEnd(e)}
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
