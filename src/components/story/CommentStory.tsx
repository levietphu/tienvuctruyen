import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

const CommentStory = () => {
  const [checkComment, setCheckComment] = useState<boolean>(false);
  const [checkReply, setCheckReply] = useState<boolean>(false);
  const { user }: any = useContext(AuthContext);

  return (
    <div className="story__comment">
      <div className="head__story__comment">
        <p>Bình luận</p>
      </div>
      <div className="comment__text">
        {user ? (
          <>
            <textarea
              name=""
              className={checkComment ? "comment__text--active" : ""}
              rows={5}
              placeholder="Hãy để lại bình luận của bạn"
              onClick={() => setCheckComment(!checkComment)}
              onBlur={() => setCheckComment(false)}
            ></textarea>
            <div className="click__comment">
              <button className="active__comment__button">Bình luận</button>
            </div>
          </>
        ) : (
          <div className="login__here">
            Hãy <Link to="/login">Đăng nhập</Link> và để lại bình luận của bạn
          </div>
        )}
      </div>
      <div className="story__comment--list">
        <div className="story__comment--item">
          <div className="comment--item">
            <p>
              <span className="account__name">catdan05</span> •
              <span className="time__update"> 3 tuần trước</span>
            </p>
            <p className="comment">free sao tính tuền thế ad</p>
            <a>0 trả lời</a>
          </div>
          <div className="recomment--item">
            <p>
              <span className="account__name">catdan05</span> •
              <span className="time__update"> 3 tuần trước</span>
            </p>
            <p className="comment">free sao tính tuền thế ad</p>
          </div>
          <div className="reply">
            <input
              type="text"
              className={checkReply ? "comment__text--active" : ""}
              onClick={() => setCheckReply(!checkReply)}
              onBlur={() => setCheckReply(false)}
            />
            <i className="fa-solid fa-paper-plane" style={{ opacity: "1" }}></i>
            <a>trả lời</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentStory;
