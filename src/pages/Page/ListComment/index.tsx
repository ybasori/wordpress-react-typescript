import React from "react";
import InputComment from "../InputComment";
import { AppContext } from "../../../_context/AppProvider";
import moment from "moment";

interface Props {
  postId: number;
}

const ListComment: React.FC<Props> = ({ postId }) => {
  const { getComments, comments, onResetPostComment } =
    React.useContext(AppContext);
  const [isCommentsFetched, setIsCommentsFetched] = React.useState(false);
  const [isShowForms, setIsShowForms] = React.useState<number[]>([]);

  const onShowReplyForm = (id: number) => {
    if (isShowForms.findIndex((dt) => dt === id) >= 0) {
      setIsShowForms([...isShowForms.filter((it) => it != id)]);
    } else {
      setIsShowForms([...isShowForms, id]);
    }
  };

  React.useEffect(() => {
    if (!isCommentsFetched) {
      setIsCommentsFetched(true);
      getComments({
        _fields: [
          "author_avatar_urls",
          "author_name",
          "content",
          "parent",
          "id",
          "date",
        ],
        post: [postId.toString()],
      });
    }
  }, [isCommentsFetched]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {comments.map((comment, index, self) => (
              <React.Fragment key={index + 1}>
                {comment.parent === 0 && (
                  <div className="col-md-12">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <img
                          src={comment.author_avatar_urls["48"]}
                          alt={comment.author_name}
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<strong>${
                              comment.author_name
                            }</strong><br /><span class="text-muted">${moment(
                              comment.date
                            ).format("LLL")}</span>${comment.content.rendered}`,
                          }}
                        ></div>
                        <a
                          href={`#reply-${comment.id}`}
                          onClick={() => onShowReplyForm(comment.id)}
                        >
                          Reply
                        </a>

                        {self.map((reply, i) => (
                          <React.Fragment key={`reply-${i + 1}`}>
                            {reply.parent === comment.id && (
                              <div className="d-flex">
                                <div className="flex-shrink-0">
                                  <img
                                    src={reply.author_avatar_urls["48"]}
                                    alt={reply.author_name}
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: `<strong>${
                                        reply.author_name
                                      }</strong><br /><span class="text-muted">${moment(
                                        comment.date
                                      ).format("LLL")}</span>${
                                        reply.content.rendered
                                      }`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                        <InputComment
                          isShow={
                            isShowForms.findIndex((dt) => dt === comment.id) >=
                            0
                          }
                          postId={postId}
                          parentId={comment.id}
                          onRefetch={() => {
                            onResetPostComment();
                            setIsCommentsFetched(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <p className="lead">Leave a Comment</p>
      <InputComment
        postId={postId}
        onRefetch={() => {
          onResetPostComment();
          setIsCommentsFetched(false);
        }}
      />
    </>
  );
};

export default ListComment;
