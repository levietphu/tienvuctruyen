import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import Moment from "react-moment";
import "moment/locale/vi";
import axios from "axios";

const CommentStory = ({ story, slug }: any) => {
  const [comment, setComment] = useState<any>();
  const [commentChidren, setCommentChidren] = useState<any>();
  const [checkComment, setCheckComment] = useState<boolean>(false);
  const [checkReply, setCheckReply] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [replyContent, setReplyContent] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>();

  const { user }: any = useContext(AuthContext);

  const callApiComment = async (page = 1) => {
    await axios
      .get(`${process.env.REACT_APP_API}get_comment?slug=${slug}&page=${page}`)
      .then((res) => {
        if (comment && !content && !replyContent) {
          setComment({
            ...comment,
            data: comment.data.concat(res.data.comments_story.data),
          });
          callApiCommentChidren();
        } else if (!comment) {
          setComment(res.data.comments_story);
        } else if (content || replyContent) {
          setComment({
            ...comment,
            data: res.data.comments_story.data.concat(comment.data),
          });
          callApiCommentChidren();
        }
        if (res.data.comments_story.last_page >= currentPage) {
          setCurrentPage(currentPage + 1);
        }
        setLastPage(res.data.comments_story.last_page);
      })
      .catch((err) => console.log(err));
  };

  const callApiCommentChidren = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}get_chidren_comment?slug=${slug}`)
      .then((res) => {
        setCommentChidren(res.data.children_comments);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callApiComment();
    callApiCommentChidren();
  }, []);

  const postComment = async (id_parent: number) => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API}post_comment`,
      headers: { accept: "application/json" },
      data: {
        content: content,
        reply_content: replyContent,
        slug: slug,
        id_user: user.user.id,
        id_parent: id_parent,
      },
    })
      .then((res) => {
        if (!id_parent) {
          callApiComment();
        } else {
          callApiCommentChidren();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleComment = (word: string, id_parent: number) => {
    if (word === "comment") {
      postComment(id_parent);
      setContent("");
    } else {
      postComment(id_parent);
      setReplyContent("");
    }
  };

  const commentNameRole = (value: any) => {
    let name;
    if (value.user.id === story.id_user) {
      name = "Dịch giả";
    }
    value.user.roles.forEach((item: any) => {
      if (item.name === "admin") {
        name = "Admin";
      }
    });
    return name;
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
              value={content}
            ></textarea>
            <div
              className="click__comment"
              onClick={() => user && content && handleComment("comment", 0)}
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
        {comment && comment.data && comment.data.length > 0 ? (
          comment.data.map((value: any, index: any) => {
            return (
              <div key={index} className="story__comment--item">
                <div className="comment--item">
                  <p>
                    <span className="account__name">{value.user.name}</span>{" "}
                    {value.user.id === story.id_user && (
                      <span className="role_name">
                        {commentNameRole(value)}
                      </span>
                    )}{" "}
                    •
                    <span className="time__update">
                      {" "}
                      <Moment fromNow locale="vi">
                        {value.created_at}
                      </Moment>
                    </span>
                  </p>
                  <p className="comment">{value.content}</p>
                  <span
                    className="show-input"
                    onClick={() => user && setAnswer(value.id)}
                  >
                    {commentChidren &&
                      commentChidren.filter(
                        (item: any, key: any) => item.id_parent === value.id
                      ).length}{" "}
                    trả lời
                  </span>
                </div>
                {commentChidren &&
                  commentChidren.map((item: any, keygen: any) => {
                    if (item.id_parent === value.id) {
                      return (
                        <div className="recomment--item" key={keygen}>
                          <p>
                            <span className="account__name">
                              {item.user.name}
                            </span>
                            {item.user.id === story.id_user && (
                              <span className="role_name">
                                {commentNameRole(item)}
                              </span>
                            )}{" "}
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
                    }
                  })}
                {answer === value.id && (
                  <div className="reply">
                    <input
                      autoFocus
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
                        user && replyContent && handleComment("reply", value.id)
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
        {comment &&
          comment.data &&
          comment.data.length >= 1 &&
          lastPage &&
          lastPage >= currentPage && (
            <div className="center">
              <span
                className="view-more-comment"
                onClick={() => callApiComment(currentPage)}
              >
                Xem thêm bình luận
              </span>
            </div>
          )}
      </div>
    </div>
  );
};

export default CommentStory;
