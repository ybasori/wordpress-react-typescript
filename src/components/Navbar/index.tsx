import React from "react";

import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../_context/AppProvider";

const Navbar = () => {
  const { wpJSON, menus } = React.useContext(AppContext);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            {wpJSON.name}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {menus.length > 0 &&
                menus[menus.findIndex((m) => m.slug === "main-menu")].list.map(
                  (item, index, self) => (
                    <React.Fragment key={`${index + 1}`}>
                      {item.menu_item_parent === "0" && (
                        <>
                          {self.filter(
                            (subItem) =>
                              subItem.menu_item_parent === item.id.toString()
                          ).length > 0 ? (
                            <li className={`nav-item dropdown`}>
                              <a
                                className="nav-link dropdown-toggle"
                                href="javascript:void(0)"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {item.title}
                              </a>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                              >
                                {self
                                  .filter(
                                    (subItem) =>
                                      subItem.menu_item_parent ===
                                      item.id.toString()
                                  )
                                  .map((subItem, index) => (
                                    <li key={`nav-submenu-${index + 1}`}>
                                      {subItem.type === "custom" ? (
                                        <a
                                          target="_blank"
                                          href={subItem.url}
                                          className="dropdown-item" rel="noreferrer"
                                        >
                                          {subItem.title}
                                        </a>
                                      ) : (
                                        <NavLink
                                          className="dropdown-item"
                                          to={`/${subItem.object?.slug}/`}
                                        >
                                          {subItem.title}
                                        </NavLink>
                                      )}
                                    </li>
                                  ))}
                              </ul>
                            </li>
                          ) : (
                            <li className={`nav-item`}>
                              {item.type === "custom" ? (
                                <a
                                  href={item.url}
                                  className="nav-link"
                                  target="_blank" rel="noreferrer"
                                >
                                  {item.title}
                                </a>
                              ) : (
                                <NavLink
                                  to={`/${item.object?.slug}/`}
                                  className={({ isActive }) =>
                                    `nav-link ${isActive ? " active" : ""}`
                                  }
                                  aria-current="page"
                                >
                                  {item.title}
                                </NavLink>
                              )}
                            </li>
                          )}
                        </>
                      )}
                    </React.Fragment>
                  )
                )}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
