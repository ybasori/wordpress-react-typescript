import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppContext } from "../../_context/AppProvider";

interface Props {
  onCloseRef: React.Ref<HTMLButtonElement>;
  onOpenRef: React.Ref<HTMLButtonElement>;
}
type Inputs = {
  username: string;
  password: string;
};
const LoginModal: React.FC<Props> = ({ onCloseRef, onOpenRef }) => {
  const { onLogin, isLoadingSignIn, auth, onCloseLoginModal } =
    React.useContext(AppContext);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsSubmitted(true);
    onLogin(data);
  };
  React.useEffect(() => {
    if (!isLoadingSignIn && isSubmitted && auth) {
      setIsSubmitted(false);
      onCloseLoginModal();
      reset();
    }
  }, [isSubmitted, isLoadingSignIn, auth]);
  return (
    <>
      <button
        ref={onOpenRef}
        style={{ display: "none" }}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      ></button>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex={-1}
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Sign in
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={onCloseRef}
                disabled={isLoadingSignIn}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="inputEmail" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.username && "is-invalid"
                    }`}
                    id="inputEmail"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">
                      This field is required
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="inputPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password && "is-invalid"
                    }`}
                    id="inputPassword"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      This field is required
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoadingSignIn}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
