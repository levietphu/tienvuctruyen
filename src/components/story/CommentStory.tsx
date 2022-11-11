import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import Moment from "react-moment";
import "moment/locale/vi";

const CommentStory = ({
  comments,
  setContent,
  callApi,
  content,
  replyContent,
  setReplyContent,
}: any) => {
  const [checkComment, setCheckComment] = useState<boolean>(false);
  const [checkReply, setCheckReply] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number>(0);

  const { user }: any = useContext(AuthContext);

  const handeleComment = (word: string, id_parent: number) => {
    if (word === "comment") {
      callApi(user.user.id, 1, id_parent);
      setContent("");
    } else {
      callApi(user.user.id, 1, id_parent);
      setReplyContent("");
    }
  };

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
              onChange={(e) => setContent(e.target.value)}
              defaultValue={content}
            ></textarea>
            <div
              className="click__comment"
              onClick={() => user && content && handeleComment("comment", 0)}
            >
              <button className={!content ? "active__comment__button" : ""}>
                Bình luận
              </button>
            </div>
          </>
        ) : (
          <div className="login__here">
            Hãy <Link to="/login">Đăng nhập</Link> và để lại bình luận của bạn
          </div>
        )}
      </div>
      <div className="story__comment--list">
        {comments.length > 0 ? (
          comments.map((value: any, index: any) => {
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
                  <a onClick={() => user && setAnswer(value.id)}>
                    {value.commet_childrens.length} trả lời
                  </a>
                </div>
                {value.commet_childrens.map((item: any, keygen: any) => {
                  return (
                    <div className="recomment--item" key={keygen}>
                      <p>
                        <span className="account__name">{item.user.name}</span>{" "}
                        •
                        <span className="time__update">
                          {" "}
                          <Moment fromNow locale="vi">
                            {item.created_at}
                          </Moment>
                        </span>
                      </p>
                      <p className="comment">{item.content}</p>
                    </div>
                  );
                })}
                {answer === value.id && (
                  <div className="reply">
                    <input
                      type="text"
                      className={checkReply ? "comment__text--active" : ""}
                      onClick={() => setCheckReply(!checkReply)}
                      onBlur={() => setCheckReply(false)}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <i
                      className="fa-solid fa-paper-plane"
                      style={{ opacity: "1" }}
                      onClick={() =>
                        user &&
                        replyContent &&
                        handeleComment("reply", value.id)
                      }
                    ></i>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="spank_story">
            <i>Truyện chưa có bình luận nào, hãy là người đầu tiên!</i>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentStory;
