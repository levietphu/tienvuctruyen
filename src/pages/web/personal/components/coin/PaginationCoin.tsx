const PaginationCoin = () => {
  return (
    <div className="pagination__coin">
      <button className="not-active__coin">1</button>
      <button className="ban__coin">
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <button className="ban__coin">
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default PaginationCoin;
