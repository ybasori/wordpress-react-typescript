import React from "react";
import { AppContext } from "../../_context/AppProvider";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Layout: React.FC = ({ children }) => {
  const {
    getWPJSON,
    getMenu,
    isLoadingGetWPJSON,
    isLoadingGetMenu,
    onOpenLoadingModal,
    onCloseLoadingModal,
  } = React.useContext(AppContext);

  const [oneTimeEffect, setOneTimeEffect] = React.useState(true);

  React.useEffect(() => {
    if (oneTimeEffect) {
      setOneTimeEffect(false);
      getWPJSON({ _fields: ["name", "description"] });
      getMenu({ slug: ["main-menu"] });
      onOpenLoadingModal();
    }
  }, [oneTimeEffect]);

  React.useEffect(() => {
    if (!(isLoadingGetWPJSON || isLoadingGetMenu)) {
      console.log(true);
      onCloseLoadingModal();
    }
  }, [isLoadingGetWPJSON, isLoadingGetMenu]);

  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
