import React from "react";

const LayoutBlog: React.FC = ({ children }) => {
  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-9">{children}</div>
      </div>
    </div>
  );
};

export default LayoutBlog;
