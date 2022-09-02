import React from "react";
import "./pagination.scss";

const Pagination = () => {
  return (
    <div className="pagination">
      <div className="pagination__left">
        <ul className="pagination__left--list">
          <li className="active">
            <a href="">1</a>
          </li>
          <li>
            <a href="">2</a>
          </li>

          <li style={{ border: "none", cursor: "default" }}>
            <a href="" style={{ cursor: "default" }}>
              ...
            </a>
          </li>
          <li>
            <a href="">12</a>
          </li>
        </ul>
      </div>
      <div className="pagination__right">
        <div className="pagination__right--prev mr-10 forbidden">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="pagination__right--next">
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
