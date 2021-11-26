import { createContext } from "react";
import { Props } from "../_config/types";

const stateObj: Props = {
  getWPJSON: () => {
    return;
  },
  isLoadingGetWPJSON: false,
  wpJSON: {
    name: "",
    description: "",
  },

  getMenu: () => {
    return;
  },
  isLoadingGetMenu: false,
  menus: [],

  getPages: () => {
    return;
  },
  isLoadingGetPages: false,
  pages: [],

  getPosts: () => {
    return;
  },
  isLoadingGetPosts: false,
  posts: [],

  getComments: () => {
    return;
  },
  isLoadingGetComments: false,
  comments: [],

  onOpenLoginModal: () => {
    return;
  },
  onCloseLoginModal: () => {
    return;
  },

  onLogin: () => {
    return;
  },
  onLogout: () => {
    return;
  },
  isLoadingSignIn: false,
  auth: null,

  isLoadingPostComment: false,
  postComment: null,
  onPostComment: () => {
    return;
  },
  onResetPostComment: () => {
    return;
  },

  onOpenLoadingModal: () => {
    return;
  },
  onCloseLoadingModal: () => {
    return;
  },
};

const InventoryFilterContext = createContext(stateObj);

export default InventoryFilterContext;
