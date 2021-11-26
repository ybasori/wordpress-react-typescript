import React, { useReducer } from "react";

import {
  AppProviderProps,
  LOADING_GET_WPJSON,
  SUCCESS_GET_WPJSON,
  ERROR_GET_WPJSON,
  LOADING_GET_MENU,
  SUCCESS_GET_MENU,
  ERROR_GET_MENU,
  LOADING_GET_PAGES,
  SUCCESS_GET_PAGES,
  ERROR_GET_PAGES,
  LOADING_GET_POSTS,
  SUCCESS_GET_POSTS,
  ERROR_GET_POSTS,
  LOADING_GET_COMMENTS,
  SUCCESS_GET_COMMENTS,
  ERROR_GET_COMMENTS,
  LOADING_SIGNIN,
  SUCCESS_SIGNIN,
  ERROR_SIGNIN,
  RESET_SIGNIN,
  RESET_POST_COMMENT,
  LOADING_POST_COMMENT,
  SUCCESS_POST_COMMENT,
  ERROR_POST_COMMENT,
  ParamProps,
  PostProps,
  PageProps,
  LoginProps,
  CommentFormProps,
} from "../_config/types";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import api from "../_config/api";
import ModalLogin from "../components/ModalLogin";
import ModalLoading from "../components/ModalLoading";

const AppProvider: React.FC<AppProviderProps> = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(AppReducer, {
    isLoadingGetWPJSON: false,
    wpJSON: {
      name: "",
      description: "",
    },
    isLoadingGetMenu: false,
    menus: [],
    isLoadingGetPages: false,
    pages: [],
    isLoadingGetPosts: false,
    posts: [],
    isLoadingGetComments: false,
    comments: [],
    isLoadingSignIn: false,
    auth: null,
    isLoadingPostComment: false,
    postComment: null,
  });

  const actions = {
    getWPJSON: async (params: ParamProps) => {
      try {
        dispatch({
          type: LOADING_GET_WPJSON,
        });
        const res = await api.getWPJSON(params);

        dispatch({
          type: SUCCESS_GET_WPJSON,
          payload: res.data,
        });
      } catch (e) {
        dispatch({
          type: ERROR_GET_WPJSON,
          payload: e,
        });
      }
    },
    getMenu: async (params: ParamProps) => {
      try {
        dispatch({
          type: LOADING_GET_MENU,
        });
        const res = await api.getMenu(params);
        const listMenu = res.data;

        const menus = [...listMenu];

        for (const key in menus) {
          const resDetail = await api.getMenu({}, menus[key].term_id);
          const listMenuDetail = resDetail.data;

          const menuDetails = [...listMenuDetail];

          for (const keyDetail in menuDetails) {
            let apiFetch = null;
            if (menuDetails[keyDetail].type === "post") {
              apiFetch = api.getPosts;
            }
            if (menuDetails[keyDetail].type === "page") {
              apiFetch = api.getPages;
            }

            if (apiFetch) {
              const p = await apiFetch(
                { _fields: ["slug"] },
                menuDetails[keyDetail].object_id
              );

              menuDetails[keyDetail].object = p.data;
            }
          }

          menus[key].list = menuDetails;
        }

        dispatch({
          type: SUCCESS_GET_MENU,
          payload: menus,
        });
      } catch (e) {
        dispatch({
          type: ERROR_GET_MENU,
          payload: e,
        });
      }
    },
    getPages: async (params: ParamProps) => {
      try {
        dispatch({
          type: LOADING_GET_PAGES,
        });
        const res = await api.getPages(params);
        let data: PageProps[] = [];
        for (const key in res.data) {
          const user = await api.getUsers(
            { _fields: ["name", "slug"] },
            res.data[key].author
          );
          let featured_media = undefined;
          if (res.data[key].featured_media != 0) {
            const media = await api.getMedia(
              { _fields: ["title", "media_details", "guid"] },
              res.data[key].featured_media
            );
            featured_media = media.data;
          }
          data = [
            ...data,
            {
              ...res.data[key],
              author: { name: user.data.name, slug: user.data.slug },
              featured_media,
            },
          ];
        }
        dispatch({
          type: SUCCESS_GET_PAGES,
          payload: data,
        });
      } catch (e) {
        dispatch({
          type: ERROR_GET_PAGES,
          payload: e,
        });
      }
    },
    getPosts: async (params: ParamProps) => {
      try {
        dispatch({
          type: LOADING_GET_POSTS,
        });
        const res = await api.getPosts(params);
        let data: PostProps[] = [];
        for (const key in res.data) {
          const user = await api.getUsers(
            { _fields: ["name", "slug"] },
            res.data[key].author
          );
          let featured_media = undefined;
          if (res.data[key].featured_media != 0) {
            const media = await api.getMedia(
              { _fields: ["title", "media_details", "guid"] },
              res.data[key].featured_media
            );
            featured_media = media.data;
          }

          data = [
            ...data,
            {
              ...res.data[key],
              author: {
                name: user.data.name,
                slug: user.data.slug,
              },
              featured_media,
            },
          ];
        }
        dispatch({
          type: SUCCESS_GET_POSTS,
          payload: data,
        });
      } catch (e) {
        dispatch({
          type: ERROR_GET_POSTS,
          payload: e,
        });
      }
    },
    getComments: async (params: ParamProps) => {
      try {
        dispatch({
          type: LOADING_GET_COMMENTS,
        });
        const res = await api.getComments(params);
        dispatch({
          type: SUCCESS_GET_COMMENTS,
          payload: res.data,
        });
      } catch (e) {
        dispatch({
          type: ERROR_GET_COMMENTS,
          payload: e,
        });
      }
    },
    onOpenLoginModal: () => {
      buttonOpenLogin.current?.click();
    },
    onCloseLoginModal: () => {
      buttonCloseLogin.current?.click();
    },
    onLogin: async (form: LoginProps) => {
      try {
        dispatch({
          type: LOADING_SIGNIN,
        });
        const res = await api.signIn(form);

        dispatch({
          type: SUCCESS_SIGNIN,
          payload: res.data,
        });
      } catch (e) {
        dispatch({
          type: ERROR_SIGNIN,
          payload: e,
        });
      }
    },
    onLogout: () => {
      dispatch({
        type: RESET_SIGNIN,
      });
    },
    onPostComment: async (form: CommentFormProps, token: string) => {
      try {
        dispatch({
          type: LOADING_POST_COMMENT,
        });
        const res = await api.postComment(form, token);
        dispatch({
          type: SUCCESS_POST_COMMENT,
          payload: res.data,
        });
      } catch (e) {
        dispatch({
          type: ERROR_POST_COMMENT,
          payload: e,
        });
      }
    },
    onResetPostComment: () => {
      dispatch({
        type: RESET_POST_COMMENT,
      });
    },
    onOpenLoadingModal: () => {
      buttonOpenLoading.current?.click();
    },
    onCloseLoadingModal: () => {
      buttonCloseLoading.current?.click();
    },
  };
  const buttonOpenLogin = React.useRef<HTMLButtonElement>(null);
  const buttonCloseLogin = React.useRef<HTMLButtonElement>(null);
  const buttonOpenLoading = React.useRef<HTMLButtonElement>(null);
  const buttonCloseLoading = React.useRef<HTMLButtonElement>(null);

  return (
    <AppContext.Provider value={{ ...state, ...actions }} {...props}>
      {children}
      <ModalLogin onOpenRef={buttonOpenLogin} onCloseRef={buttonCloseLogin} />
      <ModalLoading
        onOpenRef={buttonOpenLoading}
        onCloseRef={buttonCloseLoading}
      />
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
