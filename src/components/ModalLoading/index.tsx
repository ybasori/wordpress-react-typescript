import React from "react";

interface Props {
  onCloseRef: React.Ref<HTMLButtonElement>;
  onOpenRef: React.Ref<HTMLButtonElement>;
}

const ModalLoading: React.FC<Props> = ({ onCloseRef, onOpenRef }) => {
  return (
    <>
      <button
        ref={onOpenRef}
        style={{ display: "none" }}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#modalLoading"
      ></button>
      <div
        className="modal fade"
        id="modalLoading"
        tabIndex={-1}
        aria-labelledby="modalLoadingLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ display: "none" }}>
              <h5 className="modal-title" id="modalLoadingLabel"></h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={onCloseRef}
              ></button>
            </div>
            <div className="modal-body">Loading</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLoading;
