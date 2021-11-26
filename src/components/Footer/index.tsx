import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../_context/AppProvider";

const Footer = () => {
  const { wpJSON } = React.useContext(AppContext);
  const { menus } = React.useContext(AppContext);

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}
    >
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">
          &copy; {new Date().getFullYear()} Company, Inc
        </p>

        <Link
          to="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          {wpJSON.name}
        </Link>

        <ul className="nav col-md-4 justify-content-end">
          {menus.length > 0 &&
            menus[menus.findIndex((m) => m.slug === "main-menu")].list.map(
              (item, index) => (
                <React.Fragment key={`${index + 1}`}>
                  {item.menu_item_parent === "0" && (
                    <li className="nav-item" key={`link-${index + 1}`}>
                      {item.type === "custom" ? (
                        <a
                          target="_blank"
                          href={item.url}
                          className="nav-link px-2 text-muted" rel="noreferrer"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          to={`/${item.object?.slug}`}
                          className="nav-link px-2 text-muted"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  )}
                </React.Fragment>
              )
            )}
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
