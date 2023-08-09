import "./historytran.scss";
import coin from "../../../assets/coin.svg";
import "./historytran.scss";
import PaginationCoin from "./PaginationCoin";

const HistoryTransition = () => {
  return (
    <>
      <h1>Lịch sử giao dịch</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Mã giao dịch</th>
              <th>Nội dung</th>
              <th>XU</th>
              <th>Tình trạng</th>
              <th>Cập nhật lần cuối</th>
            </tr>
          </thead>
          <tbody>
            <tr draggable={false}>
              <td>KRAJ5MVJENM0RVK7</td>
              <td>
                <span>
                  <strong>Nạp Xu</strong>
                </span>
              </td>

              <td>
                +2000 <img src={coin} alt="webtruyen" width="16" height="16" />{" "}
              </td>
              <td>
                <span>Thành công</span>
              </td>
              <td>19:39:51 06/03/2022</td>
            </tr>
            <tr>
              <td>KRAJ5MVJENM0RVK7</td>
              <td>
                <span>
                  <strong>Nạp Xu</strong>
                </span>
              </td>
              <td>
                +2000 <img src={coin} alt="webtruyen" width="16" height="16" />{" "}
              </td>
              <td>
                <span>Thành công</span>
              </td>
              <td>19:39:51 06/03/2022</td>
            </tr>
            <tr>
              <td>KRAJ5MVJENM0RVK7</td>
              <td>
                <span>
                  <strong>Nạp Xu</strong>
                </span>
              </td>
              <td>
                +2000 <img src={coin} alt="webtruyen" width="16" height="16" />{" "}
              </td>
              <td>
                <span>Thành công</span>
              </td>
              <td>19:39:51 06/03/2022</td>
            </tr>
            <tr>
              <td>KRAJ5MVJENM0RVK7</td>
              <td>
                <span>
                  <strong>Nạp Xu</strong>
                  <p>Nộp 50k mbbank</p>
                </span>
              </td>
              <td>
                +2000 <img src={coin} alt="webtruyen" width="16" height="16" />{" "}
              </td>
              <td>
                <span>Thành công</span>
              </td>
              <td>19:39:51 06/03/2022</td>
            </tr>
            <tr>
              <td>KRAJ5MVJENM0RVK7</td>
              <td>
                <strong>Nạp Xu</strong>
              </td>
              <td>
                +2000 <img src={coin} alt="webtruyen" width="16" height="16" />{" "}
              </td>
              <td>
                <span>Thành công</span>
              </td>
              <td>19:39:51 06/03/2022</td>
            </tr>
            <tr>
              <td>KRAJ5MVJENM0RVK7</td>
              <td>
                <span>
                  <strong>Nạp Xu</strong>
                  <p>Nộp 50k mbbank</p>
                </span>
              </td>
              <td>
                +2000 <img src={coin} alt="webtruyen" width="16" height="16" />{" "}
              </td>
              <td>
                <span>Thành công</span>
              </td>
              <td>19:39:51 06/03/2022</td>
            </tr>
            <tr>
              <td>KRAJ5MVJENM0RVK7</td>
              <td>
                <span>
                  <strong>Nạp Xu</strong>
                  <p>Nộp 50k mbbank</p>
                </span>
              </td>
              <td>
                +2000 <img src={coin} alt="webtruyen" width="16" height="16" />{" "}
              </td>
              <td>
                <span>Thành công</span>
              </td>
              <td>19:39:51 06/03/2022</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationCoin />
    </>
  );
};

export default HistoryTransition;
