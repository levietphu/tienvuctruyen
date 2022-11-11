import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import Moment from "react-moment";
import "moment/locale/vi";

const CommentStory = ({ comments }: any) => {
  const [checkComment, setCheckComment] = useState<boolean>(false);
  const [checkReply, setCheckReply] = useState<boolean>(false);
  const { user }: any = useContext(AuthContext);
  console.log(comments);

  // const hanleClick = () => {

  // }

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
        {comments.map((value: any, index: any) => {
          return (
            <div key={index} className="story__comment--item">
              <div className="comment--item">
                <p>
                  <span className="account__name">{value.user.name}</span> •
                  <span className="time__update">
                    {" "}
                    <Moment fromNow locale="vi">
                      {value.created_at}
                    </Moment>
                  </span>
                </p>
                <p className="comment">{value.content}</p>
                <a>{value.commet_childrens.length} trả lời</a>
              </div>
              {value.commet_childrens.map((item: any, index: any) => {
                return (
                  <div className="recomment--item">
                    <p>
                      <span className="account__name">{item.user.name}</span> •
                      <span className="time__update">
                        {" "}
                        <Moment fromNow locale="vi">
                          {value.created_at}
                        </Moment>
                      </span>
                    </p>
                    <p className="comment">{item.content}</p>
                  </div>
                );
              })}
              <div className="reply">
                <input
                  type="text"
                  className={checkReply ? "comment__text--active" : ""}
                  onClick={() => setCheckReply(!checkReply)}
                  onBlur={() => setCheckReply(false)}
                />
                <i
                  className="fa-solid fa-paper-plane"
                  style={{ opacity: "1" }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentStory;
