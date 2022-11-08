import React from "react";

const ChapterVip = ({ coin }: any) => {
  return (
    <div className="box__vip">
      <div className="chapter-vip">
        <div className="content__check">
          <h1>Chương Vip</h1>
          <p>
            Đây là chương VIP - Bạn cần mua bằng XU để có thể tiếp tục đọc
            truyện!
          </p>
          <p style={{ fontSize: "1.5rem" }}>
            Giá: <span style={{ textTransform: "uppercase" }}>{coin} xu</span>
          </p>
        </div>
        <div className="buy__chapter center">
          <button className="btn-chapter">Mua Chương này</button>
          <button className="btn-coin">Nạp xu</button>
        </div>
        <div className="qa-buy center">
          <button>Bạn muốn mua hết các chương VIP?</button>
        </div>
      </div>
    </div>
  );
};

export default ChapterVip;
