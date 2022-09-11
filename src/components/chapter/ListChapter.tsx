import { useContext, useState } from "react";
import { SettingContext } from "../../context/SettingContextProvider";

const ListChapter = () => {
  const { togglePopup }: any = useContext(SettingContext);
  const [checkSearchChapter, setCheckSearchChapter] = useState(false);

  return (
    <div
      className="popup__list__container"
      style={{ left: `${togglePopup ? "0px" : "-25%"}` }}
    >
      <div className="header__list">
        <div className="list">
          <span>Danh sách chương</span>
        </div>
        <div className="sort__search">
          <button>
            <i className="fa-solid fa-arrow-up-9-1"></i>
          </button>
          <div className="search">
            <div
              className={`search__container ${
                checkSearchChapter ? "search__chapter--active" : ""
              }`}
            >
              <div className="search__icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                className="search-input"
                type="text"
                placeholder="Tìm theo số chương, tên chương..."
                onClick={() => setCheckSearchChapter(!checkSearchChapter)}
                onBlur={() => setCheckSearchChapter(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="main__list">
        <a href="" className="main__item active">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a href="" className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a href="" className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a href="" className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
        <a className="main__item">
          <div className="item__name__number">
            <span className="number">1.</span>
            <span> Tam hoàng tử...</span>
          </div>
          <i>
            <span>Cập nhật: </span>
            <span>4 ngày trước</span>
          </i>
          <div className="money">5 xu</div>
        </a>
      </div>
      <div className="footer__list">
        <div className="next__prev">
          <button className="footer__list--prev">Trang trước</button>
          <button className="footer__list--next forbidden">Trang sau</button>
        </div>
      </div>
    </div>
  );
};

export default ListChapter;
