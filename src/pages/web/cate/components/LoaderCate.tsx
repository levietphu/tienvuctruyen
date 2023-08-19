import React from "react";
import { Skeleton } from "antd";

const LoaderCate = () => {
  return (
    // <ul
    //   className="o-vertical-spacing o-vertical-spacing--l"
    //   style={{ width: "100%" }}
    // >
    //   <li className="blog-post o-media">
    //     <div className="o-media__figure">
    //       <span
    //         className="skeleton-box"
    //         style={{ width: "100px", height: "80px" }}
    //       ></span>
    //     </div>
    //     <div className="o-media__body">
    //       <div className="o-vertical-spacing">
    //         <h3 className="blog-post__headline">
    //           <span className="skeleton-box" style={{ width: "55%" }}></span>
    //         </h3>
    //         <p>
    //           <span className="skeleton-box" style={{ width: "80%" }}></span>
    //           <span className="skeleton-box" style={{ width: "90%" }}></span>
    //           <span className="skeleton-box" style={{ width: "83%" }}></span>
    //           <span className="skeleton-box" style={{ width: "80%" }}></span>
    //         </p>
    //         <div className="blog-post__meta">
    //           <span className="skeleton-box" style={{ width: "70px" }}></span>
    //         </div>
    //       </div>
    //     </div>
    //   </li>
    //   <li className="blog-post o-media">
    //     <div className="o-media__figure">
    //       <span
    //         className="skeleton-box"
    //         style={{ width: "100px", height: "80px" }}
    //       ></span>
    //     </div>
    //     <div className="o-media__body">
    //       <div className="o-vertical-spacing">
    //         <h3 className="blog-post__headline">
    //           <span className="skeleton-box" style={{ width: "55%" }}></span>
    //         </h3>
    //         <p>
    //           <span className="skeleton-box" style={{ width: "80%" }}></span>
    //           <span className="skeleton-box" style={{ width: "90%" }}></span>
    //           <span className="skeleton-box" style={{ width: "83%" }}></span>
    //           <span className="skeleton-box" style={{ width: "80%" }}></span>
    //         </p>
    //         <div className="blog-post__meta">
    //           <span className="skeleton-box" style={{ width: "70px" }}></span>
    //         </div>
    //       </div>
    //     </div>
    //   </li>
    //   <li className="blog-post o-media">
    //     <div className="o-media__figure">
    //       <span
    //         className="skeleton-box"
    //         style={{ width: "100px", height: "80px" }}
    //       ></span>
    //     </div>
    //     <div className="o-media__body">
    //       <div className="o-vertical-spacing">
    //         <h3 className="blog-post__headline">
    //           <span className="skeleton-box" style={{ width: "55%" }}></span>
    //         </h3>
    //         <p>
    //           <span className="skeleton-box" style={{ width: "80%" }}></span>
    //           <span className="skeleton-box" style={{ width: "90%" }}></span>
    //           <span className="skeleton-box" style={{ width: "83%" }}></span>
    //           <span className="skeleton-box" style={{ width: "80%" }}></span>
    //         </p>
    //         <div className="blog-post__meta">
    //           <span className="skeleton-box" style={{ width: "70px" }}></span>
    //         </div>
    //       </div>
    //     </div>
    //   </li>
    // </ul>
    <>
      <Skeleton
        className="mb-20"
        avatar={{
          shape: "square",
          style: { width: 80, height: 120, borderRadius: "5px" },
        }}
        paragraph={{ rows: 3 }}
        loading={true}
        active
        style={{ borderBottom: "1px solid #dbd7d7" }}
      />
      <Skeleton
        className="mb-20"
        avatar={{
          shape: "square",
          style: { width: 80, height: 120, borderRadius: "5px" },
        }}
        paragraph={{ rows: 3 }}
        loading={true}
        active
        style={{ borderBottom: "1px solid #dbd7d7" }}
      />
      <Skeleton
        className="mb-20"
        avatar={{
          shape: "square",
          style: { width: 80, height: 120, borderRadius: "5px" },
        }}
        paragraph={{ rows: 3 }}
        loading={true}
        active
        style={{ borderBottom: "1px solid #dbd7d7" }}
      />
      <Skeleton
        className="mb-20"
        avatar={{
          shape: "square",
          style: { width: 80, height: 120, borderRadius: "5px" },
        }}
        paragraph={{ rows: 3 }}
        loading={true}
        active
        style={{ borderBottom: "1px solid #dbd7d7" }}
      />
    </>
  );
};

export default LoaderCate;
