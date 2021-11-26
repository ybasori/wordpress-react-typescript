import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppContext } from "../../../_context/AppProvider";

interface Props {
  postId: number;
  onRefetch: () => void;
  isShow?: boolean;
  parentId?: number;
}

type Inputs = {
  content: string;
};

const InputComment: React.FC<Props> = ({
  postId,
  onRefetch,
  isShow = true,
  parentId = 0,
}) => {
  const {
    isLoadingPostComment,
    postComment,
    onPostComment,
    auth,
    onLogout,
    onOpenLoginModal,
  } = React.useContext(AppContext);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { reset, register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (auth) {
      setIsSubmitted(true);
      onPostComment({ ...data, post: postId, parent: parentId }, auth.token);
    }
  };
  React.useEffect(() => {
    if (!isLoadingPostComment && isSubmitted && postComment) {
      setIsSubmitted(false);
      reset();
      onRefetch();
    }
  }, [isSubmitted, isLoadingPostComment, postComment]);
  return (
    <div id={parentId != 0 ? `reply-${parentId}` : ""}>
      {isShow && (
        <>
          {auth ? (
            <>
              <p className="text-muted">
                Logged in as {auth.user_display_name}.{" "}
                <a className="" href="javscript:void(0)" onClick={onLogout}>
                  Logout
                </a>
                ?
              </p>
              <div className="row">
                <div className="col-md-12">
                  <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12">
                      <label htmlFor="inputPassword" className="form-label">
                        Comment
                      </label>
                      <textarea
                        className={`form-control`}
                        {...register("content", { required: true })}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoadingPostComment}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenLoginModal()}
                type="button"
                className="btn btn-primary"
              >
                Login
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default InputComment;
